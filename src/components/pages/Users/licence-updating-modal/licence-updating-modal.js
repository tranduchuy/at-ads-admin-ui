import React from 'react';
import { withCookies } from 'react-cookie';
import { API } from "../../../../constants/api";
import * as actions from '../../../../actions';
import { connect } from 'react-redux';
import { COOKIE_NAMES } from "../../../../constants/cookie-names";
import { Form, Button, Col, Row, Modal, Select, message } from 'antd';
import { BasePage } from '../../base-page';
import axios from "axios";

const { Option } = Select;

class LicenceUpdatingModal extends BasePage {
  cookies;
  token;
  packages = [];
  key = 'updatable';

  constructor(props) {
    super(props);

    this.cookies = this.props.cookies;
    this.token = this.cookies.get(COOKIE_NAMES.token);
    this.packages = props.packages;

    this.state = {
      visible: false,
      selectedPackage: {
        _id: this.packages[0]._id
      },
      updatingMessage: {
        message: '',
        isSucceed: true
      },
      isLoading: false
    }
  }

  handleChangePackage = (value) => {
    this.setState({
      selectedPackage: {
        _id: value
      }
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
      packageId: this.state.selectedPackage._id
    };

    axios({
      method: 'PUT',
      url: API.updateUserLicence,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accessToken': this.token
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

  render() {
    const selectedPackage = this.state.selectedPackage._id || (this.state.packages.length > 0 ? this.state.packages[0]._id : '');

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
              <Form>
                <Form.Item>
                  <label>
                    Chọn gói licence:
									<Select
                      value={selectedPackage}
                      style={{ width: '100%' }}
                      placeholder="Chọn gói"
                      onChange={this.handleChangePackage}>
                      {
                        this.props.packages.map((item, index) => {
                          return <Option value={item._id} key={index}>{item.name} - {item.numOfDays} ngày</Option>
                        })
                      }
                    </Select>
                  </label>
                </Form.Item>
              </Form>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default connect(null, actions)(withCookies(LicenceUpdatingModal));