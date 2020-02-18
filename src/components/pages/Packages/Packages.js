import React from 'react';
import { Tabs, Form, InputNumber, Row, Col, List, Input, Button, Empty, notification, Radio, Icon } from 'antd';
import { BasePage } from '../base-page';
import './Packages.style.scss';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import { PACKAGE_TYPE } from '../../../constants/package-type';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import NumberFormat from 'react-number-format';

const { TabPane } = Tabs;
const { TextArea } = Input;

class Packages extends BasePage {
  cookies;
  token;

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);

    this.state = {
      packages: [],
      displayedPackageNames: [],
      name: '',
      interestInputValue: '',
      contactInfo: '',
      price: null,
      interests: [],
      priceOption: 1,  // 1. Normal price, 2. Contact for price 
      discountOption: 2, // 1. Dont activate discount, 2. Activate discount
      discountMonths: [
        {
          name: '1 tháng',
          numOfMonths: 1,
          discount: 0
        },
        {
          name: '3 tháng',
          numOfMonths: 3,
          discount: 0
        },
        {
          name: '6 tháng',
          numOfMonths: 6,
          discount: 0
        },
        {
          name: '12 tháng',
          numOfMonths: 12,
          discount: 0
        }
      ]
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
      const listPackages = json.data.packages;
      let listNames = (listPackages || []).map(p => ({
        _id: p._id,
        name: p.name
      }));

      this.setState({
        packages: listPackages,
        displayedPackageNames: listNames
      });

      this.mapPackageStates(listPackages[0]);
    });
  }

  mapPackageStates(packageData) {
    this.setState({
      name: packageData.name,
      price: packageData.price,
      interests: packageData.interests,
      priceOption: packageData.isContactPrice ? 2 : 1,
      contactInfo: packageData.contact,
      discountOption: packageData.isDiscount ? 2 : 1
    });

    let discountMonths = packageData.discountMonths;
    if (!discountMonths)
      discountMonths = [];

    const listMonths = this.state.discountMonths;
    for (let i = 0; i < discountMonths.length; i++)
      listMonths[i].discount = discountMonths[i] * 100;

    this.setState({ discountMonths: listMonths });
  }

  onChangePriceOption(e) {
    const value = e.target.value;
    this.setState({ priceOption: value });
  }

  onChangeDiscountOption(e) {
    const value = e.target.value;
    this.setState({ discountOption: value });
  }

  openNotificationWithIcon(type, message, description) {
    notification[type]({
      message,
      description,
      placement: 'bottomRight'
    });
  };

  addInterest(interest) {
    const list = this.state.interests;
    list.push(interest);
    this.setState({ interests: list, interestInputValue: '' });
  }

  removeInterest(interestIndex) {
    const list = this.state.interests.filter((item, index) => index !== interestIndex);
    this.setState({ interests: list });
  }

  onChangeInterestInput(e) {
    this.setState({ interestInputValue: e.target.value });
  }

  onChangePackageNameInput(e, packageId) {
    const listNames = this.state.displayedPackageNames.map(p => {
      if (p._id === packageId) {
        p.name = e.target.value;
      }

      return p;
    });

    this.setState({ displayedPackageNames: listNames, name: e.target.value });
  }

  onChangeContactInfoTextArea(e) {
    this.setState({ contactInfo: e.target.value });
  }

  onChangePriceInput(value) {
    this.setState({
      price: value < 0 ? 0 : value
    });
  }

  onChangeDiscountInput(index, discount) {
    const list = this.state.discountMonths;
    list[index].discount = discount < 0 ? 0 : (discount > 100 ? 100 : discount);
    this.setState({
      discountMonths: list
    });
  }

  generateUpdatePackageParams(packageId, type) {
    const {
      price,
      priceOption,
      discountOption,
      discountMonths,
      contactInfo, displayedPackageNames,
      interests
    } = this.state;

    if (type === PACKAGE_TYPE.FREE)
      return {
        packageId,
        interests,
        name: displayedPackageNames.find(p => p._id === packageId).name
      };

    return {
      packageId,
      name: displayedPackageNames.find(p => p._id === packageId).name,
      price,
      interests,
      isContactPrice: priceOption === 1 ? false : true,
      contact: contactInfo,
      isDiscount: discountOption === 1 ? false : true,
      discountMonths: (discountMonths || []).map(m => m.discount / 100)
    };
  }

  updatePackage(id, type, packages) {
    const params = this.generateUpdatePackageParams(id, type, packages);

    if (!params.name) {
      this.openNotificationWithIcon('error', 'Đã có lỗi xảy ra', 'Vui lòng đặt tên cho gói.');
      return;
    }

    if (!params.contact && params.isContactPrice) {
      this.openNotificationWithIcon('error', 'Đã có lỗi xảy ra', 'Vui lòng cung cấp thông tin liên hệ.');
      return;
    }

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
        res => {
          const newPackage = JSON.parse(JSON.stringify(res.data.package));
          this.mapPackageStates(newPackage);

          // update list of packages
          const listPackages = this.state.packages.map(p => {
            if (p._id === newPackage._id)
              Object.assign(p, newPackage);

            return p;
          });

          this.setState({ packages: listPackages });

          this.props.setAppLoading(false);
          this.openNotificationWithIcon('success', 'Cập nhật gói thành công');
        },
        reject => reject.then(res => {
          this.props.setAppLoading(false);
          this.openNotificationWithIcon('error', 'Cập nhật gói thất bại', res.messages[0]);
        })
      );
  }

  onChangePackageTab(packageId) {
    const tabPackage = this.state.packages.find(p => p._id === packageId);
    this.mapPackageStates(tabPackage);
  }

  mapDisplayedPackageName(packageId) {
    return this.state.displayedPackageNames.find(p => p._id === packageId).name;
  }

  render() {
    const { packages, price, interestInputValue, contactInfo, name, interests } = this.state;
    const isBtnAddInterestDisabled = this.state.interestInputValue ? false : true;
    const isPriceInputShown = this.state.priceOption === 1 ? true : false;
    const isDiscountOptionShown = this.state.discountOption === 1 ? false : true;

    return (
      <div className="packages__container">
        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          style={{ minHeight: 500 }}
          onChange={tabKey => this.onChangePackageTab(tabKey)}>
          {
            packages.map((item, packageIndex) => (
              <TabPane
                tab={<span>{item.name}</span>}
                key={item._id}
              >

                <Form className="form">
                  <div className="form__section">
                    <Row>
                      <Col span={12}>
                        <Row>
                          <Col span={4} style={{ textAlign: 'left' }}>
                            <label className={`form__label form__label--field`}>Tên gói</label>
                          </Col>

                          <Col span={16}>
                            <div className="form__package-name-input">
                              <Input
                                placeholder='Nhập tên gói'
                                value={name}
                                onChange={e => this.onChangePackageNameInput(e, item._id)} />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={4} style={{ textAlign: 'left' }}>
                            <label className={`form__label form__label--field`}>Giá gói</label>
                          </Col>

                          <Col span={20}>
                            <Row>
                              {
                                item.type !== PACKAGE_TYPE.FREE ? (
                                  <div className="form__price-options">
                                    <Radio.Group onChange={e => this.onChangePriceOption(e)} value={this.state.priceOption}>
                                      <Radio value={1}>Điều chỉnh</Radio>
                                      <Radio value={2}>Liên hệ</Radio>
                                    </Radio.Group>
                                  </div>
                                ) : (<></>)
                              }
                            </Row>

                            <Row>
                              <Col span={20}>
                                {
                                  item.type !== PACKAGE_TYPE.FREE ? (
                                    <Form.Item>
                                      {
                                        isPriceInputShown ? (
                                          <div>
                                            <div className="form__price-input">
                                              <InputNumber
                                                min={0}
                                                value={price}
                                                type="number"
                                                placeholder="Mệnh giá theo VNĐ"
                                                onChange={value => this.onChangePriceInput(value)}
                                              />
                                              <span className={`form__label form__label--currency`}>VNĐ/Tháng</span>
                                            </div>

                                            <div className="form__discount-selection">
                                              <Row>
                                                <Col className={`form__label form__label--field2`} span={5}>
                                                  Ưu đãi <Icon type="arrow-down" />
                                                </Col>
                                                <Col span={17}>
                                                  <Radio.Group onChange={e => this.onChangeDiscountOption(e)} value={this.state.discountOption}>
                                                    <Radio value={1}>Không kích hoạt</Radio>
                                                    <Radio value={2}>Kích hoạt</Radio>
                                                  </Radio.Group>
                                                </Col>
                                              </Row>
                                            </div>

                                            {
                                              isDiscountOptionShown ? (
                                                <div className="form__package-discount">
                                                  {
                                                    this.state.discountMonths.map((m, index) => (
                                                      <div className="form__discount-month-input" key={index}>
                                                        <Row>
                                                          <Col span={5}>
                                                            <span className={`form__label form__label--discount-month`}>{m.name}</span>
                                                          </Col>
                                                          <Col span={10}>
                                                            <Row gutter={15}>
                                                              <Col span={8}><span className={`form__label form__label--extra`}>Giảm</span></Col>
                                                              <Col span={16}>
                                                                <InputNumber
                                                                  value={m.discount}
                                                                  min={0}
                                                                  max={100}
                                                                  type="number"
                                                                  onChange={discount => this.onChangeDiscountInput(index, discount)}
                                                                />
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                          <Col span={9}><span className={`form__label form__label--percentage`}>%</span></Col>
                                                        </Row>

                                                        <div className="form__discount-price">
                                                          <Row>
                                                            <Col span={5}></Col>
                                                            <Col span={19}>
                                                              <span className={`form__label form__label--extra`}>Giá ưu đãi</span>
                                                              <span className={`form__label form__label--discount-price`}>
                                                                <NumberFormat
                                                                  value={(price * m.numOfMonths) - ((price * m.numOfMonths) * (m.discount / 100))}
                                                                  displayType={'text'}
                                                                  thousandSeparator={true}
                                                                  renderText={value => <span>{value} VNĐ</span>} />
                                                              </span>
                                                            </Col>
                                                          </Row>
                                                        </div>

                                                      </div>
                                                    ))
                                                  }
                                                </div>
                                              ) : (
                                                  <div className="form__package-no-discount">
                                                    {
                                                      this.state.discountMonths.map((m, index) => (
                                                        <div className="form__discount-month-input" key={index}>
                                                          <Row>
                                                            <Col span={5}>
                                                              <span className={`form__label form__label--discount-month`}>{m.name}</span>
                                                            </Col>
                                                            <Col span={19}>
                                                              <span className={`form__label form__label--extra`}>Giá gói</span>
                                                              <span className={`form__label form__label--discount-price`}>
                                                                <NumberFormat
                                                                  value={price * m.numOfMonths}
                                                                  displayType={'text'}
                                                                  thousandSeparator={true}
                                                                  renderText={value => <span>{value} VNĐ</span>} />
                                                              </span>
                                                            </Col>
                                                          </Row>
                                                        </div>
                                                      ))
                                                    }
                                                  </div>
                                                )
                                            }

                                          </div>
                                        ) : (
                                            <div className="form__contact-info-input">
                                              <label className="form__label form__label--field2">Thông tin liên hệ</label>
                                              <TextArea
                                                value={contactInfo}
                                                placeholder="Không quá 200 kí tự"
                                                maxLength={200}
                                                rows={10}
                                                type="text"
                                                onChange={e => this.onChangeContactInfoTextArea(e)} />
                                            </div>
                                          )
                                      }
                                    </Form.Item>
                                  ) : (
                                      <span className={`form__label form__label--currency2`}>miễn phí</span>
                                    )
                                }
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={4} style={{ textAlign: 'left' }}>
                            <label className={`form__label form__label--field`}>
                              <img src={require('../../../assets/images/sparkles-icon.png')} alt="" />
                              Quyền lợi
                          </label>
                          </Col>
                          <Col span={19}>
                            <Form.Item className="form__interest-input">
                              <Row gutter={5}>
                                <Col span={20}>
                                  <Input
                                    placeholder='Nhập nội dung tại đây'
                                    value={interestInputValue}
                                    onKeyUp={e => {
                                      if (e.keyCode === 13)
                                        this.addInterest(this.state.interestInputValue);
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
                          <Col span={24}>
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
                                      dataSource={interests}
                                      renderItem={(interest, interestIndex) => (
                                        <List.Item>
                                          <Icon style={{ color: '#44b543', marginTop: -5 }} type="check-circle" />
                                          <List.Item.Meta
                                            title={<span>{interest}</span>}
                                          />
                                          <Button
                                            icon="close-circle"
                                            type="link"
                                            onClick={() => this.removeInterest(interestIndex)} />
                                        </List.Item>
                                      )}
                                    />
                                  )
                              }
                            </div>

                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24} style={{ textAlign: 'center' }}>
                        <Button
                          className="form__btn-update-package"
                          onClick={() => this.updatePackage(item._id, item.type)}>Cập nhật gói</Button>
                      </Col>
                    </Row>
                  </div>

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
