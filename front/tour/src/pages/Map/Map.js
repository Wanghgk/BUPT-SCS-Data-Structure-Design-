import {useState} from "react";

import Style from "./Map.module.css"

import Data from "../../map (4).json"
import Block from "../Block/Block";
import Road from "../Road/Road";

export default function Map() {
    const [nodes, setNodes] = useState(Data.nodes)
    const [roads, setRoads] = useState(Data.roads)
    const [mapWidth, setMapWidth] = useState(Data.width)
    const [mapHeight, setMapHeight] = useState(Data.height)
    const [base, setBase] = useState(Data.base)


    return (
        <div className={Style["map"]}>

            {
                nodes.map((e) => {
                    if (e.kind) {


                        return (
                            <div key={"node" + e.id}>
                                <div className={Style["node"]}
                                     style={{left: e.x + base.baseX - 2.5, top: e.y + base.baseY + 1}}></div>
                                <Block pointLeft={(e.x + base.baseX)}
                                       pointTop={(e.y + base.baseY)}
                                       blockLeft={e.block.left}
                                       blockTop={e.block.top}
                                       width={e.block.width}
                                       height={e.block.height}
                                       nodeId={"block" + e.id}
                                       rotate={e.block.rotate}
                                       enableGrab={false}
                                       setBlockPosition={null}
                                       focusNode={null}
                                ></Block>
                            </div>
                        )
                    } else {
                        return (
                            <div key={"node" + e.id}>
                                <div className={Style["node"]}
                                     style={{left: e.x + base.baseX - 2.5, top: e.y + base.baseY + 1}}></div>
                            </div>
                        )
                    }
                })
            }
            {
                roads.map((e) => {
                    return (
                        <div key={"road" + e.id}>
                            <Road left={e.leftValue + base.baseX} top={e.topValue + base.baseY} distance={e.distance}
                                  thickness={e.thickness} deg={e.angle}></Road>
                        </div>
                    )
                })
            }
        </div>
    )
}