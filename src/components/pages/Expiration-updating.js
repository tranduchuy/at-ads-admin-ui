import React from "react";
import { Component } from "react";
import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
	console.log(`selected ${value}`);
}

export class ExpirationUpdating extends Component {

	render() {
		return (
			<div className="container">
				<h1>CẬP NHẬT THỜI HẠN SỬ DỤNG</h1>

				<div>
					<Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
						<Option value="jack">Jack</Option>
						<Option value="lucy">Lucy</Option>
						<Option value="disabled" disabled>
							Disabled
      					</Option>
						<Option value="Yiminghe">yiminghe</Option>
					</Select>
				</div>

			</div>
		)
	}
}
