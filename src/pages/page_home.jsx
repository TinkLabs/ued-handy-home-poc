import * as React from "react";
import { connect } from 'react-redux';
import mixpanel from '../utils/mixpanel';

import LanguageBanner from "../components/languageBanner/languageBanner";
import MainPosterBanner from "../components/mainPosterBanner/mainPosterBanner";
import MustDoBanner from "../components/mustDoBanner/mustDoBanner";
import PromotionBanner from "../components/promotionBanner/promotionBanner";

import {
	setGlobalProperties,
	setDisplayLanguage,
	getContent,
} from "../redux/actions/homePage";

class PureHomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			loadedLang: [],
			mainPosterBanner: [],
			promotions: [],
		}

		this.lastPosition = [];
		this.onSelectLang = this.onSelectLang.bind(this);
		this.loadNewLangResource = this.loadNewLangResource.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		// demo
		this.changeHotel81 = this.changeHotel81.bind(this);
		this.changeHotel375 = this.changeHotel375.bind(this);
		this.changeHotel1357 = this.changeHotel1357.bind(this);
	}
	componentDidMount() {
		// add scrollspy
		window.addEventListener('scroll', this.handleScroll);

		// get hotel id to prepare display content
		const notReady = !this.props.globalPropertiesReady;
		const isAndroid = typeof (window.Android) !== "undefined";
		let hasGetGP = "undefined";
		if (isAndroid) {
			hasGetGP = typeof (window.Android.getGlobalProperties) !== "undefined";
		}
		if (notReady && isAndroid && hasGetGP) {
			const globalProperties = JSON.parse(window.Android.getGlobalProperties());
			const gp = {
				"hotel_id": globalProperties.hotel_id,
				"deviceLocale": globalProperties.deviceLocale,
			}
			// if (window.Android) { window.Android.showToast(`welcome to hotel ${globalProperties.hotel_id}`); }
			this.props.setGlobalProperties(gp);
		} else {
			const p = {
				"hotel_id": "2",
				"deviceLocale": "zh_TW",
			};
			this.props.setGlobalProperties(p);
		}
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	shouldComponentUpdate(nextProps, nextState) {
		let update = new Set();
		// after global prop is fetched (ie hotel_id changed)
		// write hotel specific content to store
		if (this.props.hotel_ID !== nextProps.hotel_ID) {
			this.props.getContent(nextProps.hotel_ID, nextProps.availableLanguage);
			update.add(false);
		}
		// hotel specific content is loaded
		if (this.props.loaded !== nextProps.loaded) {
			this.loadNewLangResource(nextProps.displayLanguage, undefined ,nextProps);
			update.add(false);
		}
		// change lang, target lang loaded
		if (this.props.displayLanguage !== nextProps.displayLanguage) {
			update.add(true);
		}
		// switch to new lang
		if (!nextState.loaded) {
			this.loadNewLangResource(nextProps.displayLanguage);
			update.add(false);
		}
		return !update.has(false);
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
		if ((this.lastPosition < window.innerHeight && window.scrollY >= window.innerHeight)) {
			// if (window.Android) { window.Android.showToast(window.scrollY); }
			mixpanel().track("Screen View", {
				"Screen Name": "Home",
				screen_number: 2,
			});
		}
		// update last position
		this.lastPosition = window.scrollY;
	}
	onSelectLang(locale) {
		// change lang, target lang first load
		if (this.state.loadedLang.indexOf(locale) === -1) {
			this.loadNewLangResource(locale);
		}
		this.props.setDisplayLanguage(locale);
	}
	loadNewLangResource(locale, hotel_ID = this.props.hotel_ID, props = this.props) {
		const updates = {};
		const localeContent = props.content.find(content => content.locale === locale);
		const bannerPath = require(`../localeContent/hotel_ID_${hotel_ID}/${locale}/${localeContent.mainPosterBanner.image}`);
		const adArray = localeContent.ADBlock.map(ad => (
			{
				ad_id: ad.ad_id,
				name: ad.name,
				iLink: ad.iLink,
				image: require(`../localeContent/hotel_ID_${hotel_ID}/${locale}/${ad.image}`),
			}
		));
		updates.loaded = true;
		updates.loadedLang = this.state.loadedLang.concat(locale);
		updates.mainPosterBanner =
			this.state.mainPosterBanner
				.filter(p => (p.locale !== locale))
				.concat({
					locale,
					iLink: localeContent.mainPosterBanner.iLink,
					image: `url(${bannerPath})`
				});
		updates.promotions = this.state.promotions.concat({
			locale: locale,
			ads: adArray,
		});
		this.setState({
			...this.state,
			...updates,
		});
	}
	changeHotel81() {
		this.props.setGlobalProperties({"hotel_id": "81", "deviceLocale": "en_US"});
	}
	changeHotel375() {
		this.props.setGlobalProperties({"hotel_id": "375", "deviceLocale": "en_US"});
	}
	changeHotel1357() {
		this.props.setGlobalProperties({"hotel_id": "1357", "deviceLocale": "en_US"});
	}
	render() {
		if (this.state.loaded) {
			return (
				<div className="homePage">
					<LanguageBanner
						availableLanguage={this.props.availableLanguage}
						displayLanguage={this.props.displayLanguage}
						onClick={this.onSelectLang}
					/>
					<MainPosterBanner
						mainPosterBanner={
							this.state.mainPosterBanner.find(b => b.locale === this.props.displayLanguage)
						}
					/>
					<MustDoBanner
						displayLanguage={this.props.displayLanguage}
						articles={this.props.content}
					/>
					{
						this.state.promotions
							.find(p => p.locale === this.props.displayLanguage).ads
							.map(p => {
								return (
									<PromotionBanner
										key={p.ad_id}
										id={p.ad_id}
										iLink={p.iLink}
										image={p.image}
										availableLanguage={this.props.availableLanguage}
										displayLanguage={this.props.displayLanguage}
										tickets={
											this.props.content
												.filter(c => c.locale === this.props.displayLanguage)[0]
												.ADBlock
												.filter(ad => ad.ad_id === p.ad_id)[0]
										}
									/>
								)
							})
					}
					<button onClick={this.changeHotel81}>81</button>
					<button onClick={this.changeHotel375}>375</button>
					<button onClick={this.changeHotel1357}>1357</button>
				</div>
			)
		}
		return (<div></div>)
	};
}

const mapStateToProps = (state) => {
	return {
		loaded: state.homePage.loaded,
		availableLanguage: state.homePage.availableLanguage,
		displayLanguage: state.homePage.displayLanguage,
		content: state.homePage.content,
		hotel_ID: state.homePage.globalProperties.hotel_id,
		globalPropertiesReady: state.homePage.globalPropertiesReady,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setGlobalProperties: (globalProperties) => dispatch(setGlobalProperties(globalProperties)),
		setDisplayLanguage: (locale) => dispatch(setDisplayLanguage(locale)),
		getContent: (hotelID, locales) => dispatch(getContent(hotelID, locales)),
	};
}

const HomePage = connect(mapStateToProps, mapDispatchToProps)(PureHomePage);

export default HomePage;
