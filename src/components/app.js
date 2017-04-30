import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './app.css';
import { helloRedux } from '../actions';

class App extends Component {

	componentWillMount() {
		this.props.helloRedux();
	}

	renderText() {
		return (
			<span>{this.props.hello.text}</span>
		);
	}

	render() {
		return (
			<div class={styles.app}>
				{ this.renderText.call(this)}
			</div>
		);
	}
}

App.propTypes = {
	hello: PropTypes.shape({
		text: PropTypes.string,
	}),
	helloRedux: PropTypes.func.isRequired,
};

App.defaultProps = {
	hello: {},
};

function mapStateToProps(state) {
	return { hello: state.hello };
}

export default connect(mapStateToProps, { helloRedux })(App);
