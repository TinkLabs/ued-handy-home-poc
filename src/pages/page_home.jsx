import * as React from "react";
import { connect } from 'react-redux';

import LanguageBanner from "../components/languageBanner/languageBanner";
import MainPosterBanner from "../components/mainPosterBanner/mainPosterBanner";
import MustDoBanner from "../components/mustDoBanner/mustDoBanner";
import PromotionBanner from "../components/promotionBanner/promotionBanner";

import {
	setDisplayLanguage,
	getContent,
} from "../redux/actions/homePage";

class PureHomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loadedLang: ["EN"],
			mainPosterBanner: [
				{
					locale: "EN",
					image: `url(${require("../localeContent/EN/top-banner-set/drawable-hdpi/top_banner.png")})`,
				},
			],
			promotions: [
				{
					locale: "EN",
					ads: [
						{
							id: 1,
							image: require(`../localeContent/EN/ad1/drawable-hdpi/resting.png`),
						},
						{
							id: 2,
							image: require(`../localeContent/EN/ad2/drawable-hdpi/resting.png`),
						}
					],
				}
			],
		}

		this.onSelectLang = this.onSelectLang.bind(this);
		this.loadNewLangResource = this.loadNewLangResource.bind(this);
	}
	componentDidMount() {
		this.props.getContent(this.props.availableLanguage);
	}
	componentDidUpdate() {
		// 
	}
	shouldComponentUpdate(nextProps) {
		// change lang, target lang loaded
		if (this.props.displayLanguage !== nextProps.displayLanguage) {
			return true
		}
		return false;
	}
	onSelectLang(locale) {
		// change lang, target lang first load
		if (this.state.loadedLang.indexOf(locale) === -1) {
			this.loadNewLangResource(locale);
		}
		this.props.setDisplayLanguage(locale);
	}
	loadNewLangResource(locale) {
		const updates = {}
		updates.loadedLang = this.state.loadedLang.concat(locale);
		updates.mainPosterBanner = this.state.mainPosterBanner.concat({
			locale,
			image: `url(require("../localeContent/${locale}/top-banner-set/drawable-hdpi/top_banner.png"))`,
		});
		updates.promotions = this.state.promotions.concat({
			locale: locale,
				ads: [
					{
						id: 1,
						image: require(`../localeContent/${locale}/ad1/drawable-hdpi/resting.png`),
					},
					{
						id: 2,
						image: require(`../localeContent/${locale}/ad2/drawable-hdpi/resting.png`),
					}
				],
		});
		this.setState({
			...this.state,
			...updates,
		});
	}
	render() {
		return (
			<div className="homePage">
				<LanguageBanner
					availableLanguage={this.props.availableLanguage}
					displayLanguage={this.props.displayLanguage}
					onClick={this.onSelectLang}
				/>
				<MainPosterBanner
					mainPosterBanner={
						this.state.mainPosterBanner.find(b => b.locale === this.props.displayLanguage).image
					}
				/>
				<MustDoBanner
					displayLanguage={this.props.displayLanguage}
					articles={this.props.content}
				/>
				{
					this.state.promotions
					.find(p => p.locale === this.props.displayLanguage).ads
					.map(p => (
						<PromotionBanner
							key={p.id}
							id={p.id}
							image={p.image}
						/>
					))
				}
			</div>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		availableLanguage: state.homePage.availableLanguage,
		displayLanguage: state.homePage.displayLanguage,
		content: state.homePage.content,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		setDisplayLanguage: (locale) => dispatch(setDisplayLanguage(locale)),
		getContent: (locales) => dispatch(getContent(locales)),
	};
}

const HomePage = connect(mapStateToProps, mapDispatchToProps)(PureHomePage);

export default HomePage;
