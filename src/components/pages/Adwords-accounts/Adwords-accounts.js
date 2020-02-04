import React from 'react';
import { Row, Col, Table, Input, Button, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Adwords-accounts-style.scss';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import { BasePage } from '../base-page';
import LimitWebsiteEditingModal from './limit-website-editing-modal';

export class AdwordAccounts extends BasePage {
  cookies;
  token;

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);

    this.state = {
      searchText: '',
      accounts: [],
      totalItems: 0,
      page: 1,
      limit: 10
    };
  }

  componentDidMount() {
    this.getAccounts({
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

    if (selectedKeys[0]) this.getAccounts({ [dataIndex]: selectedKeys[0] });

    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onChangePage(currentPage) {
    if (this.state.totalItems > this.state.limit) {
      this.getAccounts({
        page: currentPage,
        limit: this.state.limit
      });
    } else {
      if (!this.state.searchText)
        this.getAccounts({
          page: currentPage,
          limit: this.state.limit
        });
    }

    this.setState({ page: currentPage });
  }

  isEmptyObj = obj => Object.keys(obj).length === 0;

  refreshAccounts = () => {
    this.getAccounts({
      page: this.state.page,
      limit: this.state.limit
    });
  };

  getAccounts = param => {
    let url = API.getAccounts;

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
        let accounts = (json.data.entries || []).map(item => {
          return {
            id: item._id,
            adsId: this.formatAdsId(item.adsId),
            isConnected: item.isConnected,
            isDeleted: item.isDeleted,
            email: item.userInfo.email,
            domain: item.websiteInfo
              ? item.websiteInfo.map(website => website.domain)
              : [],
            createdAt: item.createdAt,
            limitWebsite: item.setting.limitWebsite,
            licenceType: item.licence.packageId.type
          };
        });

        this.setState({
          accounts,
          totalItems: accounts.length > 0 ? json.data.totalItems : 0
        });

        setTimeout(() => {
          this.props.setAppLoading(false);
        }, 500);
      });
  };

  formatAdsId(adsId) {
    let arr = adsId.split('');
    return (
      arr.splice(0, 3).join('') +
      '-' +
      arr.splice(0, 3).join('') +
      '-' +
      arr.splice(0, 4).join('')
    );
  }

  render() {
    const accountColumns = [
      {
        title: 'Google Ads ID',
        dataIndex: 'adsId',
        key: 'adsId',
        render: (text, record) => {
          return (
            <span
              style={{
                color: record.isConnected ? 'green' : 'crimson',
                fontWeight: 'bold'
              }}
            >
              {text}
            </span>
          );
        }
      },
      {
        title: 'Quyền quản lý',
        dataIndex: 'isConnected',
        key: 'isConnected',
        render: isAccepted => {
          if (isAccepted === true) {
            return (
              <span className="account-status--success">Đã chấp nhận</span>
            );
          }

          return (
            <span className="account-status--danger">Chưa chấp nhận</span>
          );
        }
      },
      {
        title: 'Trạng thái',
        dataIndex: 'isDeleted',
        key: 'isDeleted',
        render: isDeleted => {
          if (isDeleted === false) {
            return (
              <span className="account-status--success">Đang hoạt động</span>
            );
          }

          return (
            <span className="account-status--unactive">Đã ngắt kết nối</span>
          );
        }
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email')
      },
      {
        title: 'Tên miền',
        dataIndex: 'domain',
        key: 'domain',
        render: text => {
          return text.map((item, index) => (
            <div key={index}>
              <a href={item} target=' _blank'>
                {item}
              </a>
            </div>
          ));
        }
      },
      {
        title: 'Limit webiste',
        dataIndex: 'limitWebsite',
        key: 'limitWebsite',
        render: (text, record) => {
          if (record.licenceType === 'FREE')
            return <span>{text}</span>;
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '50px' }}>{text}</div>
              <LimitWebsiteEditingModal
                accessToken={this.token}
                accountId={record.id}
                adsId={record.adsId}
                currentLimitWebsite={record.limitWebsite}
                onAccountLimitWebsiteEdited={this.refreshAccounts}
              />
            </div>
          );
        }
      },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => {
          return <span>{moment(text).format('HH:mm DD/MM/YYYY')}</span>;
        }
      }
    ];

    return (
      <div className='container'>
        <Row>
          <Col span={24}>
            <Table
              pagination={{
                position: 'bottom',
                total: this.state.totalItems,
                pageSize: this.state.limit,
                current: this.state.page,
                onChange: currentPage => this.onChangePage(currentPage)
              }}
              dataSource={this.state.accounts}
              columns={accountColumns}
              rowKey={record => record.adsId}
              className='accounts-table'
              rowClassName={record => {
                if (record.isConnected === true) return 'isConnected';
                return 'isNotConnected';
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withCookies(AdwordAccounts));
