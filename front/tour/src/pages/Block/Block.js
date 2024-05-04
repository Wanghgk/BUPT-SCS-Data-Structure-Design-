import {useState,useRef,useEffect} from "react";
import Style from "./Block.module.css"

export default function Block(props) {
    const {pointLeft,pointTop,blockLeft,blockTop,setBlockPosition,width,height,focusNode,nodeId} = props

    const [position,setPosition] = useState({left:pointLeft+blockLeft,top:pointTop+blockTop})

    const positionData = useRef({isGrab:false,clientX:0,clientY:0})

    useEffect(()=>{
        setPosition({left:pointLeft+blockLeft,top:pointTop+blockTop})
    },[blockLeft, blockTop, pointLeft, pointTop])
    
    function grabBegin(e){

        positionData.current.isGrab = true;
        positionData.current.clientX = e.clientX;
        positionData.current.clientY = e.clientY;

        focusNode(null,nodeId)

    }

    function grabWindow(e){

        if(positionData.current.isGrab){
            let deltaLeft = e.clientX - positionData.current.clientX;
            let deltaTop = e.clientY - positionData.current.clientY;
            positionData.current.clientX = e.clientX;
            positionData.current.clientY = e.clientY;
            setPosition({left: position.left + deltaLeft,top: position.top + deltaTop})
        }
    }

    function grabOver(e){
        // console.log(e.stopPropagation)

        positionData.current.isGrab = false;
        setBlockPosition(position.left - pointLeft,position.top - pointTop)
    }

    function grabLeave() {
        positionData.current.isGrab = false
    }

    return (
        <div className={Style["block"]}
             onMouseDown={(e)=>{grabBegin(e)}}
             onMouseMove={(e)=>{grabWindow(e)}}
             onMouseUp={(e) => {grabOver(e)}} onMouseLeave={() => {grabLeave()}}
             style={{left: position.left, top: position.top,width:width,height:height}}
        >

        </div>
    )

}