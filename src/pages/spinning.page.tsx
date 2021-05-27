import React from "react";
import classes from "./spinning.module.scss";
import "./spinning.css";

function spinning() {
    return (
        <div className={classes.pageContainer}>
            <div className={classes.spinnerContainer}>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>

    )
}

export default spinning;