import * as React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilitySensor from "react-visibility-sensor";

import MostPopular from "components/Blocks/MostPopular/MostPopular";
import District from "components/Blocks/District/District";
import LanguageBanner from "components/LanguageBanner/LanguageBanner"
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";
import VisibiltyChecker from "components/VisibiltyChecker/VisibiltyChecker";

import mixpanel from 'utils/mixpanel';

import {
	setGlobalProperties,
	setDisplayLanguage,
	getContent,
} from "redux/actions/homePage";

const IProps = {
	availableLanguage: PropTypes.array,
	displayLanguage: PropTypes.string,
	hotel_ID: PropTypes.string,
	content: PropTypes.object,
	globalPropertiesReady: PropTypes.bool,
	loaded: PropTypes.bool,
	setGlobalProperties: PropTypes.func,
	setDisplayLanguage: PropTypes.func,
	getContent: PropTypes.func,
}

class PureHomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userPreference: [],
			// imgLoaded: false,
			imgLoaded: true,
			mainBannerPkg: [],
			promotions: [],
			hiDotComURL: process.env.REACT_APP_HI_REDIRECT,
			hiDotComBanner: "",
			loadVS: false,
		}

		this.onSelectLang = this.onSelectLang.bind(this);
		this.getCookies = this.getCookies.bind(this);
		this.setCookies = this.setCookies.bind(this);
		// render component
		this.renderDistrict = this.renderDistrict.bind(this);
		// demo
		this.changeHotel = this.changeHotel.bind(this);
	}
	componentDidMount() {
		// add scrollspy
		window.addEventListener('scroll', this.handleScroll);

		// get hotel id and device locale to prepare display content
		const notReady = !this.props.globalPropertiesReady;
		const isAndroid = typeof (window.Android) !== "undefined";
		let gp;
		let hasGetGP = "undefined";
		if (isAndroid) {
			hasGetGP = typeof (window.Android.getGlobalProperties) !== "undefined";
		}
		if (notReady && isAndroid && hasGetGP) {
			const globalProperties = JSON.parse(window.Android.getGlobalProperties());
			gp = {
				"hotel_id": globalProperties.hotel_id,
				// device locale is not ready in 7.6.x
				"deviceLocale": globalProperties.deviceLocale,
			}
		} else {
			// default hotel for 1st render
			gp = {
				"hotel_id": "0",
				"deviceLocale": "en_US",
			};
		}
		this.setState({ loadVS: true });
		this.props.setGlobalProperties(gp);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	shouldComponentUpdate(nextProps, nextState) {
		/*
		 *	`hotel_id` changed (DidMount / demo), write new hotel specific content to store 
		 */
		if (this.props.hotel_ID !== nextProps.hotel_ID) {
			this.props.getContent(nextProps.hotel_ID);
			return false;
		}
		/*
		 *	Change lang, target lang loaded, nth special, go on.
		 */
		/*
		 *	Read user preference, switch to previous language.
		 *	prevLang > sysLang > defaultLang
		 */
		const prevLocale = localStorage.getItem('homePageLocale');
		if (prevLocale !== null
			&& prevLocale !== nextProps.displayLanguage) {
			this.props.setDisplayLanguage(prevLocale);
			return false;
		}
		return true;
	}
	getCookies(label) {
		console.log(this.props.cookies.get(label));
	}
	setCookies(label, value, path) {
		// EG: this.setCookies('name', 'sb', '/');
		this.props.cookies.set(label, value, { path });
	}
	onSelectLang(locale) {
		/*
		 *	Save to localStorage for future ref
		 *	Udpate to redux as well
		 */
		localStorage.setItem('homePageLocale', locale);
		this.props.setDisplayLanguage(locale);
	}
	changeHotel(e) {
		this.props.setGlobalProperties({ "hotel_id": e.currentTarget.innerHTML, "deviceLocale": this.props.displayLanguage });
	}
	renderDistrict() {
		const comp = [];
		this.props.content[this.props.displayLanguage].districts.forEach((districtContent, i) => {
			comp.push(<District
				key={i}
				availableLanguage={this.props.availableLanguage}
				displayLanguage={this.props.displayLanguage}
				districtContent={districtContent}
			/>);
			if (i === 1) {
				comp.push(<div
					key={`ad_${i}`}
					style={{
						margin: "1rem -0 1rem -0",
						width: "100vw",
						height: "100px",
						backgroundColor: "grey",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center"
					}}>
					AD
					</div>)
			}
		});
		return comp;
	}
	render() {
		if (this.state.imgLoaded) {
			return (
				<div className="homePage">
					{/* full screen divs under everything for screen tracking */}
					{
						(this.state.loadVS) ? <VisibiltyChecker /> : null
					}
					{/* lang banner */}
					<LanguageBanner
						availableLanguage={this.props.availableLanguage}
						displayLanguage={this.props.displayLanguage}
						onClick={this.onSelectLang}
					/>
					{/* most popular */}
					<MostPopular
						displayLanguage={this.props.displayLanguage}
						content={this.props.content[this.props.displayLanguage].mostPopular}
					/>
					{/* each disrtrict */}
					{
						this.renderDistrict()
					}
					{/* sign up banner */}
					<div className="signUp-poster">
						<VisibilitySensor
							onChange={(isVisible) => {
								if (isVisible) {
									console.log("Ads Image downloaded");
									mixpanel().track("Ads Image downloaded", {
										"Screen Name": "Home",
										"campaignid": "0",
										"campaignname": "hi-signup",
										"bannerid": "0",
										"bannername": "hi-signup",
										"screen name": "Home",
										"position": "2",
									});
								}
							}}
						>
							<MainPosterBanner
								bannerInfo={{
									path: `url(${require("images/hi_dot_com_pre_launch_bg.jpg")})`,
									iLink: this.state.hiDotComURL,
									styles: {
										height: "191px"
									}
								}}
								tracker={() => {
									console.log('Email Sign Up', this.props.districtContent.district);
									mixpanel().track("Email Sign Up", {
										"Screen Name": "Home",
										"screen_number": "last",
									});
									mixpanel().track("Ads Image downloaded", {
										"Screen Name": "Home",
										"campaignid": "0",
										"campaignname": "hi-signup",
										"bannerid": "0",
										"bannername": "hi-signup",
										"screen name": "Home",
										"position": "2",
									});
								}}
							/>
						</VisibilitySensor>
					</div>
					{/* demo btn */}
					<button onClick={this.changeHotel}>0</button>
					<button onClick={this.changeHotel}>2</button>
					<button onClick={this.changeHotel}>249</button>
					<button onClick={this.changeHotel}>3461</button>
					<button onClick={this.changeHotel}>5640</button>
				</div>
			)
		}
		return (<div></div>)
	};
}

const mapStateToProps = (state, ownProps) => {
	return {
		availableLanguage: state.homePage.availableLanguage,
		displayLanguage: state.homePage.displayLanguage,
		hotel_ID: state.homePage.globalProperties.hotel_id,
		content: state.homePage.content,
		globalPropertiesReady: state.homePage.globalPropertiesReady,
		loaded: state.homePage.loaded,

		cookies: ownProps.cookies,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setGlobalProperties: (globalProperties) => dispatch(setGlobalProperties(globalProperties)),
		setDisplayLanguage: (locale) => dispatch(setDisplayLanguage(locale)),
		getContent: (hotelID) => dispatch(getContent(hotelID)),
	};
}

PureHomePage.propTypes = IProps;

const HomePage = connect(mapStateToProps, mapDispatchToProps)(PureHomePage);

export default HomePage;
