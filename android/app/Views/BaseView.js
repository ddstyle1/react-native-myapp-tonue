'use-strict'

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import System from '../utils/System';
import RNnavBar from "../components/RNnavBar";
/**
 * 定义页面加载状态
 */

const px2dp = (val) => System.px2dp(val);
export const ViewLoad = {
	loading: 0, // 表示页面未加载
	loaded: 1, // 表示页面已加载
}
export default class BaseView extends BasePage {
	constructor(props) {
		super(props);
		this.state = {
			viewLoad: ViewLoad.loaded, // 默认已加载
		}
		this.navBarBackgroundcolor = null;
		this.navBarTitle = null;
		this.navBarStyle = {};
		this.renderNavLeft = this.renderNavLeft.bind(this);
		this.renderNavRight = this.renderNavRight.bind(this);
		this.push = this.push.bind(this); // 进入页面
	}

	showNavBar() {
		return true;
	}

	async push(page, params) {
		console.log(page, params);
		console.log('进入下一个页面');
	}

	renderLoadingView() {
		// 加载中展示
		return (
			null
		)
	}

	renderContent() {
		return null;
	}

	/**
	 * 导航栏右侧
	 */
	renderNavRight() {
		return null;
	}

	/**
	 * 导航栏左侧
	 */
	renderNavLeft() {
		return null;
	}
	/**
	 * 渲染导航 
	 * 默认是true
	 **/
	renderNavigationBar() {
		if (!this.showNavBar()) {
			return null;
		}
		return (
			<RNnavBar
				navBarTitle={this.navBarTitle}
				navBarStyle={this.navBarStyle}
				renderNavRight={this.renderNavRight}
				renderNavLeft={this.renderNavLeft}
			/>
		)
	}

	render() {
		const { viewLoad } = this.state;
		let contentView = null;
		switch (viewLoad) {
			case ViewLoad.loading:
			case undefined:
				contentView = this.renderLoadingView();
			case ViewLoad.loaded:
				contentView = (
					<View style={{ flex: 1 }}>
						{this.renderContent()}
					</View>
				);
				break;
		}
		return (
			<View style={styles.viewContainer}>
				{this.renderNavigationBar()}
				<View style={{ flex: 1 }}>{contentView}</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	navBar: {
		zIndex: 999,
		width: '100%',
		height: px2dp(56),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewContainer: {
		display: 'flex',
		flex: 1,
		height: '100%',
		marginTop: 0,
		marginLeft: 0,
		marginBottom: 0,
	}
})