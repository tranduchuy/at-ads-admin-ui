import React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Tooltip, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import secret from '../../../../config/secret';
import { COOKIE_NAMES } from '../../../../constants/cookie-names';
import { UserRoles } from '../../../../constants/user-role';
import CookieService from '../../../../services/cookie.service';
import './button-stand-for-user.style.scss';


const fieldsOfTargetUser = [
  '_id',
  'avatar',
  'createdAt',
  'email',
  'name',
  'phone',
  'role',
  'googleId',
  'licence'
];

class ButtonStandForUser extends React.Component {
  secret = secret;

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  getTargetUserInfo() {
    const targetUser = JSON.parse(JSON.stringify(this.props.user));
    targetUser._id = targetUser.id;

    const userInfoToBeSaved = {};
    fieldsOfTargetUser.forEach(f => (userInfoToBeSaved[f] = targetUser[f]));

    userInfoToBeSaved.licence = {
      type: userInfoToBeSaved.licence.packageId.type,
      name: userInfoToBeSaved.licence.packageId.name,
      expiredAt: userInfoToBeSaved.expiredAt
    };

    return userInfoToBeSaved;
  }

  onClick() {
    this.props.setAppLoading(true);
    const token = CookieService.get(COOKIE_NAMES.token);
    const loggedInUser = CookieService.get(COOKIE_NAMES.user);
    const targetUser = this.getTargetUserInfo();

    CookieService.set(COOKIE_NAMES.FRONT_END.user, JSON.stringify(targetUser), {
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
    }, 2000);
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

    if(this.props.user.role === UserRoles.admin) {
      return <span className="admin-label">Admin</span>
    }

    if(this.props.user.role === UserRoles.master) {
      return <span className="master-label">Master</span>
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
