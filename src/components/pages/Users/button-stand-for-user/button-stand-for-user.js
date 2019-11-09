import React from 'react';
import { withCookies } from 'react-cookie';
import * as PropTypes from 'prop-types';
import { Icon, Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import secret from '../../../../config/secret';
import { COOKIE_NAMES } from '../../../../constants/cookie-names';
import { UserRoles } from '../../../../constants/user-role';
import CookieService from '../../../../services/cookie.service';

const fieldsOfTargetUser = [
  '_id',
  'avatar',
  'createdAt',
  'email',
  'name',
  'phone',
  'role',
  'googleId'
];

class ButtonStandForUser extends React.Component {
  secret = secret;

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setAppLoading(true);
    const token = CookieService.get(COOKIE_NAMES.token);
    const loggedInUser = CookieService.get(COOKIE_NAMES.user);
    const targetUser = JSON.parse(JSON.stringify(this.props.user));
    targetUser._id = targetUser.id;

    const userInfoToBeSaved = {};
    fieldsOfTargetUser.forEach(f => userInfoToBeSaved[f] = targetUser[f]);

    CookieService.set(COOKIE_NAMES.FRONT_END.user, JSON.stringify(userInfoToBeSaved), {
      path: '/',
      domain: secret.MAIN_DOMAIN
    }); // target user info
    CookieService.set(COOKIE_NAMES.FRONT_END.standBy, loggedInUser, {
      path: '/',
      domain: secret.MAIN_DOMAIN
    }); // Admin info
    CookieService.set(COOKIE_NAMES.FRONT_END.token, token, {
      path: '/',
      domain: secret.MAIN_DOMAIN
    }); // admin token

    // console.log('value: ', this.secret);
    setTimeout(() => {
      window.open(this.secret.FRONT_END_DOMAIN, '_blank');
      this.props.setAppLoading(false);
    }, 1000);
  }

  render() {
    if (this.props.user.role === UserRoles.endUser) {
      return (
        <Tooltip title='Thay quyền'>
          <Button size='small' onClick={this.onClick}>
            <Icon type='login' />
          </Button>
        </Tooltip>
      );
    }

    return <></>;
  }
}

ButtonStandForUser.propTypes = {
  users: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired
  }),
  setAppLoading: PropTypes.func
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  actions
)(ButtonStandForUser);
