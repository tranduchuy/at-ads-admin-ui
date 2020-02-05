import React from 'react';
import { Tabs, Form, InputNumber, Row, Col, List, Input, Button, Empty, notification } from 'antd';
import { BasePage } from '../base-page';
import './Packages.style.scss';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import { PACKAGE_TYPE } from '../../../constants/package-type';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import * as _ from 'lodash';

const { TabPane } = Tabs;

class Packages extends BasePage {
  cookies;
  token;

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);

    this.state = {
      packages: [],
      interestInputValue: '',
      price: null,
      interests: []
    };
  }

  componentWillMount() {
    this.loadPackages();
  }

  loadPackages() {
    fetch(API.getPackages, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accessToken': this.token
      },
      signal: this.abortController.signal
    }).then(res => {
      return res.json();
    }).then(json => {
      const list = json.data.packages.reverse();

      this.setState({
        packages: list,
        price: list[0].price,
        interests: list[0].interests
      });
    });
  }

  openNotificationWithIcon(type, message, description) {
    notification[type]({
      message,
      description,
      placement: 'bottomRight'
    });
  };

  addInterest(packageIndex, interest) {
    const list = this.state.packages;
    list[packageIndex].interests.push(interest);

    this.setState({ packages: list, interestInputValue: '' });
  }

  removeInterest(packageIndex, interestIndex) {
    const list = this.state.packages;
    list[packageIndex].interests = list[packageIndex].interests.filter((item, index) => index !== interestIndex);
    this.setState({ packages: list });
  }

  onChangeInterestInput(e) {
    this.setState({ interestInputValue: e.target.value });
  }

  onChangePriceInput(value) {
    this.setState({
      price: value < 0 ? null : value
    });
  }

  generateUpdatePackageParams(id, type, packages) {
    const { price } = this.state;
    const interests = _.find(packages, item => item.type === type).interests;

    if (type === PACKAGE_TYPE.FREE)
      return { packageId: id, interests };

    return { packageId: id, price, interests };
  }

  updatePackage(id, type, packages) {
    const params = this.generateUpdatePackageParams(id, type, packages);

    if (!params.price && params.price !== 0 && type !== PACKAGE_TYPE.FREE) {
      this.openNotificationWithIcon('error', 'Đã có lỗi xảy ra', 'Giá gói không hợp lệ, vui lòng kiểm tra lại.');
      return;
    }

    this.props.setAppLoading(true);
    const url = API.updatePackage.replace('{packageId}', id);
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(params),
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
        () => {
          this.props.setAppLoading(false);
          this.openNotificationWithIcon('success', 'Cập nhật gói thành công');
        },
        reject => reject.then(res => {
          this.props.setAppLoading(false);
          this.openNotificationWithIcon('error', 'Cập nhật gói thất bại', res.messages[0]);
        })
      );
  }

  onChangePackageTabs(tabIndex) {
    const { price, interests } = this.state.packages[tabIndex];
    this.setState({ price, interests });
  }

  render() {
    const { packages, price, interestInputValue } = this.state;
    const isBtnAddInterestDisabled = this.state.interestInputValue ? false : true;

    return (
      <div className="packages__container">
        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          style={{ height: 550 }}
          onChange={tabIndex => this.onChangePackageTabs(tabIndex)}>
          {
            packages.map((item, packageIndex) => (
              <TabPane
                tab={<span>{item.name}</span>}
                key={packageIndex}
              >

                <h1 className={`package__type ${'package__type--' + item.type}`}>{item.name}</h1>

                <Form className="form">
                  <Row>
                    <Col span={2} style={{ textAlign: 'left' }}>
                      <label className="form__field-label">
                        <span style={{ color: 'crimson' }}>*</span> Giá gói</label>
                    </Col>

                    <Col span={8}>
                      <Row gutter={15}>
                        <Col span={20}>
                          {
                            item.type !== PACKAGE_TYPE.FREE ? (
                              <Form.Item>
                                <InputNumber
                                  placeholder="Mệnh giá theo VNĐ"
                                  value={price}
                                  type="number"
                                  onChange={value => this.onChangePriceInput(value)}
                                />
                              </Form.Item>
                            ) : (
                                <span className="form__currency-label">miễn phí</span>
                              )
                          }
                        </Col>
                        {
                          item.type !== PACKAGE_TYPE.FREE ? (
                            <Col span={4}><span className="form__currency-label">VNĐ/Tháng</span></Col>
                          ) : (
                              <span></span>
                            )
                        }
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={2} style={{ textAlign: 'left' }}>
                      <label className="form__field-label">Quyền lợi</label>
                    </Col>
                    <Col span={8}>
                      <Form.Item className="form__interest-input">
                        <Row gutter={5}>
                          <Col span={20}>
                            <Input
                              placeholder='Nhập nội dung tại đây'
                              value={interestInputValue}
                              onKeyUp={e => {
                                if (e.keyCode === 13)
                                  this.addInterest(packageIndex, this.state.interestInputValue);
                              }}
                              onChange={e => this.onChangeInterestInput(e)} />
                          </Col>
                          <Col span={4}>
                            <Button
                              icon="plus-circle"
                              disabled={isBtnAddInterestDisabled}
                              onClick={() => this.addInterest(packageIndex, this.state.interestInputValue)}>
                              Thêm
                          </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={11}>
                      <div className="list-interests__wrapper">

                        {
                          item.interests.length === 0 ? (
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              imageStyle={{
                                height: 60,
                              }}
                              description={
                                <span>
                                  Chưa có quyền lợi nào.
                              </span>
                              }
                            >
                            </Empty>
                          ) : (
                              <List
                                itemLayout="horizontal"
                                dataSource={item.interests}
                                renderItem={(interest, interestIndex) => (
                                  <List.Item>
                                    <div className="list-interests__order-label">{interestIndex + 1}</div>
                                    <List.Item.Meta
                                      title={<span>{interest}</span>}
                                    />
                                    <Button
                                      icon="close-circle"
                                      type="link"
                                      onClick={() => this.removeInterest(packageIndex, interestIndex)} />
                                  </List.Item>
                                )}
                              />
                            )
                        }
                      </div>

                    </Col>
                  </Row>

                  <Button
                    className="form__btn-update-package"
                    onClick={() => this.updatePackage(item._id, item.type, packages)}>Cập nhật gói</Button>

                </Form>
              </TabPane>
            ))}
        </Tabs>
      </div>
    )
  }
}

const UpdatePackageForm = Form.create({ name: 'update_package' })(Packages);
export default connect(null, actions)(withCookies(UpdatePackageForm));
