import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { API } from '../../../constants/api';
import './Login-style.scss';
import * as actions from '../../../actions';
import { COOKIE_NAMES } from '../../../constants/cookie-names';
import { BasePage } from '../base-page';

class Login extends BasePage {
  constructor(props) {
    super(props);

    this.state = {
      loginMessage: ''
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.setAppLoading(false);
    const { cookies } = this.props;
    const token = cookies.get(COOKIE_NAMES.token);
    const user = cookies.get(COOKIE_NAMES.user);

    setTimeout(() => {
      if (user && token) {
        this.props.history.push('/dashboard');
      }
    }, 1000);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        const params = {
          email: values.email,
          password: values.password
        };

        fetch(API.login, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
          signal: this.abortController.signal
        })
          .then(res => {
            if (res.status === 200) return Promise.resolve(res.json());
            return Promise.reject(res.json());
          })
          .then(
            resolve => {
              const { cookies } = this.props;
              const token = resolve.data.meta.token;
              const user = resolve.data.user;
              this.props.login(user, token);

              cookies.set(COOKIE_NAMES.token, token, { path: '/' });
              cookies.set(COOKIE_NAMES.user, user, { path: '/' });

              setTimeout(() => {
                this.props.history.push('/dashboard');
              }, 1000);
            },
            reject =>
              reject.then(res => {
                this.setState({
                  loginMessage: res.messages[0]
                });
              })
          );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login__container">
        <div className="inner">
          <Form onSubmit={this.handleSubmit} className={`login-form bounceIn bounceInDown`}>
            <div className='form-title'>CÔNG CỤ CHỐNG CLICK TẶC</div>

            <div className='logo'>
              <img
                src={require('../../../assets/images/app-logo.png')}
                alt='...'
              />
            </div>

            <div className="role">Administrator</div>

            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Vui lòng nhập email' }]
              })(<Input prefix={<Icon type='user' />} placeholder='Email' />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }]
              })(
                <Input
                  prefix={<Icon type='lock' />}
                  type='password'
                  placeholder='Mật khẩu'
                />
              )}
            </Form.Item>

            <p style={{ color: 'red', textAlign: 'center' }}>
              {this.state.loginMessage}
            </p>

            <Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Button
                  type='danger'
                  htmlType='submit'
                  className='login-form-button'
                >
                  ĐĂNG NHẬP
                  </Button>
              </div>
            </Form.Item>

            <div className="form__footer">
              <img src={'https://image.flaticon.com/icons/png/128/222/222506.png'} alt="" />
              Powered by Appnet Technology
              </div>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
const mapStateToProps = state => ({
  users: state.users
});

export default withCookies(
  connect(
    mapStateToProps,
    actions
  )(WrappedNormalLoginForm)
);
