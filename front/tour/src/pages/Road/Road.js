


import Style from "./Road.module.css"

export default function Road(props) {
    const {left,top,distance,thickness,deg,active} = props

    return (
        <div className={Style["road"]} style={{left:left,top:top,width:distance,height:thickness,"--deg":deg,"--road-bkc":active?"#3b84e7":"#fff"}}>

        </div>
    )
}