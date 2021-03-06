import React from "react";
import classes from "components/Burger/BuildControls/BuildControl/BuildControl.module.css";
const buildControl = (props) => {
	return (
		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button onClick={props.deducted} className={classes.Less} disabled={props.disabled}>Less</button>
			<button onClick={props.added} className={classes.More}>More</button>
		</div>
	);
};

export default buildControl;
