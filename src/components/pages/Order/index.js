import React from 'react';
import { Row, Col, Table, Input, Button, Icon, message } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './order.style.scss';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import { BasePage } from '../base-page';
import { OrderStatus } from '../../../constants/order-status';
import * as _ from 'lodash';

export class Orders extends BasePage {
  cookies;
  token;

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);

    this.state = {
      searchText: '...',
      orders: [],
      totalItems: 0,
      page: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.getOrders({
      page: this.state.page,
      limit: this.state.limit
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, dataIndex, confirm)
            }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            autoFocus
          />
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, dataIndex, confirm)}
            icon='search'
            size='small'
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type='search' style={{ color: filtered ? '#f2f2f2' : undefined }} />
    )
  });

  handleSearch = (selectedKeys, dataIndex, confirm) => {
    confirm(); // hide panel search

    let searchText = selectedKeys[0];

    if (searchText) {
      if (dataIndex === 'status') {
        searchText = searchText.toUpperCase();
        searchText = _.findKey(OrderStatus, status => status === searchText);

        if (searchText) {
          this.getOrders({ [dataIndex]: searchText });
        }
      }
      else {
        this.getOrders({ [dataIndex]: searchText });
      }
    }

    this.setState({ searchText: searchText });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onChangePage(currentPage) {
    if (this.state.totalItems > this.state.limit) {
      this.getOrders({
        page: currentPage,
        limit: this.state.limit
      });
    } else {
      if (!this.state.searchText)
        this.getOrders({
          page: currentPage,
          limit: this.state.limit
        });
    }

    this.setState({ page: currentPage });
  }

  isEmptyObj = obj => Object.keys(obj).length === 0;

  getOrders = param => {
    let url = API.getOrders;
    if (!this.isEmptyObj(param)) {
      url += '?' + Object.keys(param)
        .map(key => {
          return `${key}=${param[key]}`;
        })
        .join('&');
    }

    this.props.setAppLoading(true);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accessToken: this.token
      },
      signal: this.abortController.signal
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const orders = (json.data.entries || []).map(order => {
          return {
            createdAt: order.createdAt,
            user: {
              avatar: order.userId.avatar,
              email: order.userId.email
            },
            packageName: order.packageId.name,
            packageType: order.packageId.type,
            packageNumOfMonths: order.packageId.numOfMonths,
            code: order.code,
            status: order.status
          }
        });

        this.setState({
          orders: _.orderBy(orders, ['createdAt'], ['desc']),
          totalItems: json.data.totalItems
        })

        setTimeout(() => {
          this.props.setAppLoading(false);
        }, 500);
      });
  };

  confirmOrder = (code) => {
    const url = API.confirmOrder.replace('{code}', code);
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "accessToken": this.token
      }
    })
      .then(res => {
        if (res.status === 200)
          return Promise.resolve(res.json());
        return Promise.reject(res.json());
      })
      .then(
        resolve => {
          this.getOrders({
            page: this.state.page,
            limit: this.state.limit
          });
          setTimeout(() => {
            message.success(resolve.messages[0]);
          }, 500);
        },
        reject => reject.then(res => {
          message.error(res.messages[0]);
        })
      );
  }

  render() {
    const paginationConfig = {
      position: 'bottom',
      total: this.state.totalItems,
      pageSize: this.state.limit,
      current: this.state.page,
      onChange: (currentPage) => this.onChangePage(currentPage)
    };

    const orderColumns = [
      {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => moment(text).format('HH:mm DD/MM/YYYY')
      },
      {
        title: 'Người dùng',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <img className="user-avatar" alt=""
                src={user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
              <span className="user-email">{user.email}</span>
            </div>
          );
        }
      },
      {
        title: 'Tên gói',
        dataIndex: 'packageName',
        key: 'packageName',
        render: (text, record) => {
          const type = record.packageType;
          if (type === 'FREE')
            return (<span className="package-type free-type">{text}</span>);
          if (type === 'VIP1')
            return (<span className="package-type vip-type">{text}</span>);
          if (type === 'CUSTOM')
            return (<span className="package-type custom-type">{text}</span>);
        }
      },
      {
        title: 'Số tháng',
        dataIndex: 'packageNumOfMonths',
        key: 'packageNumOfMonths',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        ...this.getColumnSearchProps('code'),
        render: text => (<span className="order-code">{text}</span>)
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        ...this.getColumnSearchProps('status'),
        render: statusIndex => {
          if (statusIndex === 1)
            return <span className="order-status order-new">{OrderStatus[statusIndex]}</span>
          if (statusIndex === 2)
            return <span className="order-status order-paying">{OrderStatus[statusIndex]}</span>
          if (statusIndex === 3)
            return <span className="order-status order-not-enough-money">{OrderStatus[statusIndex]}</span>
          if (statusIndex === 4)
            return <span className="order-status order-success">{OrderStatus[statusIndex]}</span>
        }
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => {
          if (record.status)
            return (
              <Button type="primary" onClick={() => this.confirmOrder(record.code)}>Chấp nhận</Button>
            )
        }
      }
    ];

    return (
      <div className='container'>
        <Row>
          <Col span={24}>
            <Table
              pagination={paginationConfig}
              dataSource={this.state.orders}
              columns={orderColumns}
              rowKey={(record, index) => index}
              className="orders-table" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withCookies(Orders));
