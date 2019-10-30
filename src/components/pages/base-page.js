import React from 'react';

export class BasePage extends React.Component {
	abortController = new AbortController();

	componentWillUnmount() {
		this.abortController.abort();
	}
}
