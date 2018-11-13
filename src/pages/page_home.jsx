import * as React from "react";
import { connect } from 'react-redux';

import LanguageBanner from "../components/languageBanner/languageBanner";
import MainPosterBanner from "../components/mainPosterBanner/mainPosterBanner";
import MustDoBanner from "../components/mustDoBanner/mustDoBanner";
import PromotionBanner from "../components/promotionBanner/promotionBanner";

class PureHomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			promotions: [
				{
					id: 1,
					image: require(`../images/promotion1/drawable-hdpi/resting.png`),
				},
				{
					id: 2,
					image: require(`../images/promotion2/drawable-hdpi/resting.png`),
				}
			],
		}
	}
	render() {
		return (
			<div className="homePage">
				<LanguageBanner />
				<MainPosterBanner />
				<MustDoBanner />
				{
					this.state.promotions.map( p => (
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
		// 
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// 
	};
}

const HomePage = connect(mapStateToProps, mapDispatchToProps)(PureHomePage);

export default HomePage;
