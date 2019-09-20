import React, { Component } from 'react';
import { Row, Col, Table, Input, Button, Icon } from 'antd';
import { withCookies } from 'react-cookie';
import { API } from '../../../constants/api';
import moment from 'moment';
import './Google-ads-errors-style.scss';

export class GoogleAdsErrors extends Component {
    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}
export default withCookies(GoogleAdsErrors);