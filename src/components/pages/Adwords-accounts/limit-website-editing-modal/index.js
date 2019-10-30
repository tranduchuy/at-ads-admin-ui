import React from 'react';
import { API } from "../../../../constants/api";
import { Form, Button, Col, Row, Modal, message, Tooltip, InputNumber, Icon } from 'antd';
import { BasePage } from '../../base-page';
import axios from "axios";

class LimitWebsiteEditingModal extends BasePage {
  key = 'updatable';

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }
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

  updateAccountLimitWebsite = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          accountId: this.props.accountId,
          limitWebsite: values.limitWebsite
        };

        axios({
          method: 'PUT',
          url: API.updateAccountLimitWebsite,
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
          this.props.onAccountLimitWebsiteEdited();
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  openMessage = (messageContent) => {
    message.loading({ content: 'Loading...', key: this.key });
    setTimeout(() => {
      message.success({ content: messageContent, key: this.key, duration: 2 });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="modal-container">
        <Tooltip placement="bottom" title="Chỉnh sửa" overlayStyle={{ fontSize: '12px' }}>
          <Button onClick={this.showModal} icon="edit" style={{ border: 0, background: 'rgba(0,0,0,0)' }} />
        </Tooltip>
        <Modal
          title={"CHỈNH SỬA LIMIT WEBSITE - TÀI KHOẢN: " + this.props.adsId}
          visible={this.state.visible}
          onOk={this.updateAccountLimitWebsite}
          onCancel={this.hideModal}
          okText="Lưu"
          cancelText="Hủy bỏ"
        >
          <Row>
            <Col span={6}></Col>
            <Col span={12}>
              <Form>
                <Form.Item>
                  <label>
                    <span>Limit website: </span>
                    {getFieldDecorator('limitWebsite', {
                      rules: [{ required: true, message: 'Vui lòng nhập limit website' }],
                      initialValue: this.props.currentLimitWebsite
                    })(
                      <InputNumber
                        prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Limit website"
                      />,
                    )}
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

const EditLimitWebsiteForm = Form.create({ name: 'update_limit_website' })(LimitWebsiteEditingModal);
export default EditLimitWebsiteForm;