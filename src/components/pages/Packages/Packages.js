import React from 'react';
import { Tabs, Form, InputNumber, Icon, Row, Col, List, Input, Button } from 'antd';
import { BasePage } from '../base-page';
import './Packages.style.scss';

const { TabPane } = Tabs;
const PACKAGES = [
  {
    id: 1,
    type: 'free',
    name: 'Miễn phí'
  },
  {
    id: 2,
    type: 'vip1',
    name: 'Vip1',
  },
  {
    id: 3,
    type: 'custom',
    name: 'Đối tác'
  }
];

class Packages extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      //mode: 'top',
    };
  }

  // handleModeChange = e => {
  //   const mode = e.target.value;
  //   this.setState({ mode });
  // };

  render() {
    // const { mode } = this.state;
    const { getFieldDecorator } = this.props.form;

    const interests = [
      'Interest 1',
      'Interest 2',
      'Interest 3',
      'Interest 4',
      'Interest 5',
      'Interest 1',
      'Interest 2',
      'Interest 3',
      'Interest 4',
      'Interest 5'
    ];

    return (
      <div className="packages__container">
        {/* <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Hiển thị ngang</Radio.Button>
          <Radio.Button value="left">Hiển thị dọc</Radio.Button>
        </Radio.Group> */}
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 500 }}>
          {PACKAGES.map(item => (
            <TabPane tab={
              <span>{item.name}</span>
            } key={item.id}>

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
                          item.type !== 'free' ? (
                            <Form.Item>
                              {getFieldDecorator('packagePrice', {
                                rules: [{ required: true, message: 'Giá gói không hợp lệ.' }],
                                initialValue: 1000000
                              })(
                                <InputNumber
                                  prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                  placeholder="Tối thiểu là 1"
                                />,
                              )}
                            </Form.Item>
                          ) : (
                              <span>miễn phí</span>
                            )
                        }
                      </Col>

                      {
                        item.type !== 'free' ? (
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
                        <Col span={20}><Input placeholder='Nhập nội dung quyền lợi' /></Col>
                        <Col span={4}>
                          <Button type="dashed" icon="plus-circle">
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
                      <List
                        itemLayout="horizontal"
                        dataSource={interests}
                        renderItem={(item, index) => (
                          <List.Item>
                            <div className="list-interests__order-label">{index + 1}</div>
                            <List.Item.Meta
                              title={<a href="https://ant.design">{item}</a>}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </Col>
                </Row>

              </Form>

            </TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}

const UpdatePackageForm = Form.create({ name: 'update_package' })(Packages);
export default UpdatePackageForm;
