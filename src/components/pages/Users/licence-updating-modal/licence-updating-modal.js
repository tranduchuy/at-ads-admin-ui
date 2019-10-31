import React from 'react';
import { API } from "../../../../constants/api";
import * as actions from '../../../../actions';
import { connect } from 'react-redux';
import { Button, Col, Row, Modal, Select, message, DatePicker } from 'antd';
import { BasePage } from '../../base-page';
import axios from "axios";
import moment from 'moment';
import * as _ from 'lodash';

const { Option } = Select;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

class LicenceUpdatingModal extends BasePage {
  packages = [];
  key = 'updatable';

  constructor(props) {
    super(props);

    this.packages = props.packages;

    this.state = {
      visible: false,
      selectedPackage: {
        _id: this.props.currentPackage._id,
        type: this.props.currentPackage.type
      },
      selectedExpiration: moment(new Date()).add(1, 'months'),
      updatingMessage: {
        message: '',
        isSucceed: true
      },
      isDatePickerDisplayed: this.props.currentPackage.type !== 'FREE'
    }
  }

  handleChangePackage = (value) => {
    this.setState({
      selectedPackage: {
        _id: value
      },
      isDatePickerDisplayed: _.find(this.props.packages, item => item._id === value).type !== 'FREE'
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  updateLicence = () => {
    const params = {
      userId: this.props.userId,
      packageId: this.state.selectedPackage._id,
      expiredAt: new Date(this.state.selectedExpiration).getTime()
    };

    if (this.state.selectedPackage.type === 'FREE')
      delete params.expiredAt;

    axios({
      method: 'PUT',
      url: API.updateUserLicence,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accessToken': this.props.accessToken
      },
      data: params,
      signal: this.abortController.signal
    }).then(res => {
      const message = res.data.messages[0];
      this.openMessage(message);
      this.hideModal();
      this.props.onUserLicenceUpdated();
    }).catch(err => {
      console.log(err);
    });
  }

  openMessage = (messageContent) => {
    message.loading({ content: 'Loading...', key: this.key });
    setTimeout(() => {
      message.success({ content: messageContent, key: this.key, duration: 2 });
    });
  };

  handleChangeDatePicker = (date) => {
    if (date) {
      this.setState({
        selectedExpiration: date
      })
    }
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment();
  }

  render() {
    const selectedPackageId = this.state.selectedPackage._id;
    const selectedExpiration = this.state.selectedExpiration;
    const isDatePickerDisplayed = this.state.isDatePickerDisplayed;
    return (
      <div className="modal-container">
        <Button onClick={this.showModal} type="primary">
          Cập nhật licence
        </Button>
        <Modal
          title={"CẬP NHẬT LICENCE - USER: " + this.props.userFullname}
          visible={this.state.visible}
          onOk={this.updateLicence}
          onCancel={this.hideModal}
          okText="Cập nhật"
          cancelText="Hủy bỏ"
        >
          <Row>
            <Col span={6}></Col>
            <Col span={12}>
              <div>
                Chọn gói licence:
								<Select
                  value={selectedPackageId}
                  style={{ width: '100%' }}
                  placeholder="Chọn gói"
                  onChange={this.handleChangePackage}
                >
                  {
                    this.props.packages.map((item, index) => {
                      return <Option value={item._id} key={index}>{item.name}</Option>
                    })
                  }
                </Select>
              </div>
              <br />
              {(() => {
                if (isDatePickerDisplayed === true) {
                  return (
                    <div>
                      Hạn dùng đến:
                    <DatePicker
                        style={{ width: '100%' }}
                        defaultValue={moment(selectedExpiration, dateFormatList[0])}
                        format={dateFormatList} onChange={this.handleChangeDatePicker}
                        disabledDate={this.disabledDate}
                      />
                    </div>
                  )
                }
              })()}
            </Col>
            <Col span={4}></Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default connect(null, actions)(LicenceUpdatingModal);