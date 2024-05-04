import React from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";

import LeftBar from "../LeftBar/LeftBar";

import Style from "./Tour.module.css"
export default function Tour() {



    return (
        <div className={Style["tour"]}>
            <div className={Style["header"]}>
                <div className={Style["head-bar"]}>
                    <div className={Style["outline"]}><span>Tour</span></div>
                </div>
            </div>
            <div className={Style["leftbar"]}>
                <LeftBar/>
            </div>
            <div className={Style["main"]}>
                <Outlet/>
            </div>
            <div className={Style["footer"]}>

            </div>
        </div>
    )
}