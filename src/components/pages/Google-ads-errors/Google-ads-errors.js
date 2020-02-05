import React from 'react';
import { Row, Col, Table, Popover, Button } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Google-ads-errors-style.scss';
import JSONPretty from 'react-json-pretty';
import axios from 'axios';
import ReactHighChart from 'react-highcharts';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import { BasePage } from '../base-page';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const pieChartConfig = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: 'Báo cáo & Thống kê lỗi Google Ads'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: []
    }
  ]
};

export class GoogleAdsErrors extends BasePage {
  cookies;
  token;

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);

    this.state = {
      ggAdsErrors: [],
      totalItems: 0,
      page: 1,
      limit: 10,
      statistic: []
    };
  }

  componentDidMount() {
    this.getGoogleAdsErrors({
      page: this.state.page,
      limit: this.state.limit
    });

    this.getStatistic();
  }

  getStatistic() {
    axios
      .get(API.getGoogleAdsErrorsStatistic, {
        headers: {
          accessToken: this.token
        },
        signal: this.abortController.signal
      })
      .then(res => {
        this.setState({
          statistic: res.data.data
        });
      });
  }

  getGoogleAdsErrors(param) {
    let url = API.getGoogleAdsErrors;

    if (param.page !== undefined) url += `?page=${param.page}`;

    if (param.limit !== undefined) url += `&limit=${param.limit}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accessToken: this.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const data = json.data.entries;
        this.setState({
          ggAdsErrors: data,
          totalItems: data.length > 0 ? json.data.totalItems : 0
        });
        this.props.setAppLoading(false);
      });
  }

  onChangePage(currentPage) {
    this.getGoogleAdsErrors({
      page: currentPage,
      limit: this.state.limit
    });
    this.setState({ page: currentPage });
  }

  render() {
    const ggAdsErrorColumns = [];
    const errorTemplate = {
      createdAt: {},
      reason: {},
      authConfig: {},
      params: {},
      error: {},
      functionName: '',
      serviceVersion: '',
      serviceName: '',
      moduleName: ''
    };

    Object.keys(errorTemplate).forEach(key => {
      if (['authConfig', 'error', 'params'].indexOf(key) === -1) {
        ggAdsErrorColumns.push({
          title: key,
          dataIndex: key,
          key,
          render: text => {
            if (key === 'createdAt')
              return moment(text).format('HH:mm DD/MM/YYY');
            return text;
          }
        });
      } else {
        ggAdsErrorColumns.push({
          title: key,
          dataIndex: key,
          key,
          render: text => {
            const content = (
              <JSONPretty style={{ fontSize: '10px' }} data={text}></JSONPretty>
            );

            return (
              <Popover
                content={content}
                title='Nội dung'
                placement='bottom'
                trigger='click'
                overlayStyle={{
                  width: '45vw',
                  maxHeight: '50vh'
                }}
              >
                <Button>Xem nội dung</Button>
              </Popover>
            );
          }
        });
      }
    });

    pieChartConfig.series[0].data = [];
    this.state.statistic.forEach(item => {
      pieChartConfig.series[0].data.push({
        name: item._id,
        y: item.count
      });
    });

    const paginationConfig = {
      position: 'bottom',
      total: this.state.totalItems,
      pageSize: this.state.limit,
      current: this.state.page,
      onChange: currentPage => this.onChangePage(currentPage)
    };

    return (
      <div>
        <div className='container' style={{ overflow: 'auto' }}>
          <Row>
            <Col span={24}>
              <ReactHighChart config={pieChartConfig} />
            </Col>
          </Row>
        </div>
        <div className='container'>
          <Row>
            <Col span={24}>
              <Table
                pagination={paginationConfig}
                dataSource={this.state.ggAdsErrors}
                columns={ggAdsErrorColumns}
                rowKey={record => record._id}
                className='gg-ads-errors-table'
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(withCookies(GoogleAdsErrors));
