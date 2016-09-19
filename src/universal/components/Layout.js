import React, {PropTypes} from 'react';
import Header from './Header.js';
import styles from './Layout.css';

export default function Layout(props) {
	return (
		<div className={styles.layout}>
			<Header/>
			<div className="content">
				{props.children}
			</div>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.any,
};
