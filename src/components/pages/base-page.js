import React from 'react';

export class BasePage extends React.Component {
	abortController = new AbortController();

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		this.abortController.abort();
	}
}
