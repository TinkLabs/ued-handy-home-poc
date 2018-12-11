import * as React from "react";
import { connect } from 'react-redux';
import mixpanel from 'utils/mixpanel';
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from 'prop-types';

import LanguageBanner from "components/LanguageBanner/LanguageBanner";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";
import MustDoBanner from "components/MustDoBanner/MustDoBanner";
import PromotionBanner from "components/PromotionBanner/PromotionBanner";
import SignUp from "components/SignUp/SignUp";

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
			imgLoaded: false,
			mainBannerPkg: [],
			promotions: [],
			hiDotComURL: process.env.REACT_APP_HI_REDIRECT,
			hiDotComBanner: "",
		}

		this.lastPosition = [];
		this.onSelectLang = this.onSelectLang.bind(this);
		this.loadImgResource = this.loadImgResource.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.getCookies = this.getCookies.bind(this);
		this.setCookies = this.setCookies.bind(this);
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
				"hotel_id": "2",
				"deviceLocale": "zh_CN",
			};
		}
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
		// hotel specific content is loaded in nextProps, now load img
		if (this.props.loaded !== nextProps.loaded) {
			this.loadImgResource(nextProps);
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
	handleScroll(event) {
		// if (window.Android) {window.Android.showToast(window.scrollY);}
		// screen 1 = 'chicken rice' = window.scrollY === 105?
		// screen 2 = bottom = window.scrollY === 704?
		if ((this.lastPosition < 105 && window.scrollY >= 105)
			|| (this.lastPosition > 105 && window.scrollY <= 105)) {
			// if (window.Android) { window.Android.showToast(window.scrollY); }
			mixpanel().track("Screen View", {
				"Screen Name": "Home",
				screen_number: 1,
			});
		}
		this.lastPosition = window.scrollY;
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
	loadImgResource(props = this.props) {
		/*
		 *	Load all hotel- and locale- specific img to state.
		 *	Img will be external call when BE is ready,
		 *	this part will be used to load default img
		 */
		const updates = {};
		const hotel_ID = props.hotel_ID;
		const content = props.content;
		const mainBannerPkg = [];
		const promotions = [];
		props.availableLanguage.forEach(locale => {
			const bannerPath = require(`localeContent/hotel_ID_${hotel_ID}/${locale.short}/${content[locale.short].mainPosterBanner.image}`);
			mainBannerPkg.push({
				...content[locale.short].mainPosterBanner,
				path: `url(${bannerPath})`,
			});
			const ADPath = require(`localeContent/hotel_ID_${hotel_ID}/${locale.short}/${content[locale.short].ADBlock[0].image}`);
			promotions.push({
				...content[locale.short].ADBlock[0],
				path: `url(${ADPath})`,
			})
		});
		const hiDotComBanner = "url(".concat(require("images/hidotcom.png")).concat(")");
		updates.imgLoaded = true;
		updates.mainBannerPkg = mainBannerPkg;
		updates.promotions = promotions;
		updates.hiDotComBanner = hiDotComBanner;
		this.setState({
			...updates,
		});
	}
	changeHotel(e) {
		this.props.setGlobalProperties({ "hotel_id": e.currentTarget.innerHTML, "deviceLocale": this.props.displayLanguage });
	}
	render() {
		if (this.state.imgLoaded) {
			return (
				<div className="homePage">
					<LanguageBanner
						availableLanguage={this.props.availableLanguage}
						displayLanguage={this.props.displayLanguage}
						onClick={this.onSelectLang}
					/>
					<MainPosterBanner
						tracking
						bannerInfo={
							this.state.mainBannerPkg.find(b => b.locale === this.props.displayLanguage)
						}
					/>
					<MustDoBanner
						displayLanguage={this.props.displayLanguage}
						content={this.props.content}
					/>
					{
						this.state.promotions
							.filter(p => p.locale === this.props.displayLanguage)
							.map(p => {
								return (
									<PromotionBanner
										key={p.ad_id}
										id={p.ad_id}
										availableLanguage={this.props.availableLanguage} // for fetching google ads
										displayLanguage={this.props.displayLanguage}
										adInfo={p}
									/>
								)
							})
					}
					<SignUp
						locale={this.props.displayLanguage}
						redirectURL={this.state.hiDotComURL}
					/>
					<VisibilitySensor
						onChange={(isVisible) => {
							if (isVisible) {
								mixpanel().track("Screen View", {
									"Screen Name": "Home",
									screen_number: 2,
								});
							}
						}}
					>
						<div style={{ height: "1px", opacity: "0" }} />
					</VisibilitySensor>
					{/* <button onClick={this.changeHotel}>81</button>
					<button onClick={this.changeHotel}>375</button>
					<button onClick={this.changeHotel}>1357</button> */}
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
