import React from "react";
import Burger from "components/Burger/Burger";
import BuildControls from "components/Burger/BuildControls/BuildControls";
import Modal from "components/UI/Modal/Modal";
import OrderSummary from "components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends React.Component {
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			bacon: 0,
			cheese: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	updatePurchaseSate = () => {
		this.setState((prevSate) => {
			const sum = Object.keys(prevSate["ingredients"])
				.map((igKey) => prevSate["ingredients"][igKey])
				.reduce((sum, el) => {
					return sum + el;
				}, 0);
			return { purchasable: sum > 0 };
		});
	};

	purchaseHandler = () => {
		this.setState((prevSate) => {
			return { purchasing: !prevSate.purchasing };
		});
	};
	purchaseContinueHandler = () => {
		alert("yay!");
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCounter = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCounter;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseSate();
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCounter = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCounter;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseSate();
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<>
				<Modal
					show={this.state.purchasing}
					toggleModal={this.purchaseHandler}>
					<OrderSummary
						price={this.state.totalPrice}
						toggle={this.purchaseHandler}
						ingredients={this.state.ingredients}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<div>
					<Burger ingredients={this.state.ingredients} />
				</div>
				<BuildControls
					price={this.state.totalPrice}
					addIngredient={this.addIngredientHandler}
					deductIngredient={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</>
		);
	}
}

export default BurgerBuilder;