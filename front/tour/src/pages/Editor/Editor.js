import {useState, useRef, useEffect} from "react";

import "../../iconfont.css"
import Style from "./Editor.module.css"
import Block from "../Block/Block";

export default function Editor() {

    let [nodes, setNodes] = useState([]);
    let [roads, setRoads] = useState([]);
    let [status, setStatus] = useState(false)//false代表路口，true代表景点
    let [nowNode, setNowNode] = useState(-1)
    let [detail, setDetail] = useState({
        nowNodeBlock: {},
        nowNodeName: "未选中节点",
        nowNodeX: "未选中节点",
        nowNodeY: "未选中节点",
        nowNodeKind: "未选中节点",
        nowNodeId: "未选中节点"
    })
    let [roadDetail, setRoadDetail] = useState({
        nowRoadDistance: "未选中道路",
        nowRoadName: "未选中道路",
        nowRoadLeft: "未选中道路",
        nowRoadTop: "未选中道路",
        nowRoadKind: "未选中道路",
        nowRoadId: "未选中道路",
        nowRoadCrowding: "未选中道路"
    })
    let [targets, setTargets] = useState({point1: NaN, point2: NaN, road: NaN})
    // let [scroll,setScroll] = useState(3)
    let [map, setMap] = useState([0, 0])
    let [base, setBase] = useState({
        baseX: 0,
        baseY: 0
    })

    const scrollContainer = useRef()
    let useMap = useRef(true)

    const roadKinds = ["road-kind-0","road-kind-1","road-kind-2","road-kind-3","road-kind-4","road-kind-5","road-kind-6","road-kind-7","road-kind-8","road-kind-9"]

    function addNode(e) {
        if (useMap.current) {
            let id = 1
            if (nodes.length !== 0) {
                id = nodes[nodes.length - 1].id + 1
            }

            const {offsetX, offsetY} = e.nativeEvent;

            setNodes([...nodes, {
                id: id,
                x: (offsetX - 8 - base.baseX),
                y: (offsetY - 11 - base.baseY),
                kind: status,
                roads: [],
                name: "未命名",
                block: {}
            }])
        }
        useMap.current = true
    }

    function focusNode(ele, id) {
        if (ele !== null) {
            ele.stopPropagation()
        }
        // console.log("@@@",id)
        let newNowNode = nodes.find(e => e.id === id)
        // console.log(newNowNode)
        setDetail({
            nowNodeBlock: newNowNode.block,
            nowNodeName: newNowNode.name,
            nowNodeX: newNowNode.x,
            nowNodeY: newNowNode.y,
            nowNodeKind: newNowNode.kind ? "景点" : "路口",
            nowNodeId: id
        })
        setNowNode(id)
        const newPoint2 = targets.point1
        const nowRoad = targets.road
        setTargets({point1: id, point2: newPoint2, road: nowRoad})
    }

    function focusRoad(ele, id) {
        ele.stopPropagation()

        let newNowRoad = roads.find(e => e.id === id)

        setRoadDetail({
            nowRoadDistance: newNowRoad.distance,
            nowRoadName: newNowRoad.name,
            nowRoadLeft: newNowRoad.leftValue,
            nowRoadTop: newNowRoad.topValue,
            nowRoadKind: newNowRoad.classifiedWay,
            nowRoadId: newNowRoad.id,
            nowRoadCrowding: newNowRoad.crowding
        })

        const point1 = targets.point1
        const point2 = targets.point2
        setTargets({point1: point1, point2: point2, road: id})
    }

    function toggleStatus(newStatus) {
        setStatus(newStatus)
    }

    function updateDetail(name, value) {
        let index = nodes.findIndex(e => e.id === nowNode)
        let newNodes = nodes
        if (value !== nodes[index][name]) {
            newNodes[index][name] = value
            setNodes([...newNodes])
            focusNode(null, nodes[index].id)
            setTimeout(() => {
                let newRoads = roads
                nodes[index].roads.forEach((id) => {
                    let ri = roads.findIndex(e => e.id === id)
                    let {topValue, leftValue, distance, angle} = initRoadData(roads[ri].point1, roads[ri].point2)
                    newRoads[ri].topValue = topValue
                    newRoads[ri].leftValue = leftValue
                    newRoads[ri].distance = distance
                    newRoads[ri].angle = angle

                })
                setRoads([...newRoads])
            }, 50)
        }
    }

    function initRoadData(id1, id2) {
        const index1 = nodes.findIndex(e => e.id === id1)
        const index2 = nodes.findIndex(e => e.id === id2)

        const point1 = nodes[index1]
        const point2 = nodes[index2]

        const x1 = point1.x
        const y1 = point1.y

        const x2 = point2.x
        const y2 = point2.y

        const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

        const distance = Number(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)).toFixed(2) - 14)
        const thickness = 10

        const leftValue = (x1 + x2) / 2 - distance / 2 + 8
        const topValue = (y1 + y2) / 2 - thickness / 2 + 11

        return {
            leftValue: leftValue,
            topValue: topValue,
            distance: distance,
            thickness: thickness,
            angle: angle
        }
    }

    function addRoad(id1, id2) {
        if (Number.isInteger(id1) && Number.isInteger(id2) && id1 !== id2) {
            const index1 = nodes.findIndex(e => e.id == id1)
            const index2 = nodes.findIndex(e => e.id == id2)
            //
            // const point1 = nodes[index1]
            // const point2 = nodes[index2]
            //
            // const x1 = point1.x
            // const y1 = point1.y
            //
            // const x2 = point2.x
            // const y2 = point2.y
            //
            // const angle = Math.atan2(y1 - y2,x1 - x2) * (180/Math.PI)
            //
            // const distance = Number(Math.sqrt(Math.pow(x1 - x2 , 2) + Math.pow(y1 - y2, 2)).toFixed(2) - 14)
            // const thickness = 20
            //
            // const leftValue = (x1 + x2) / 2 - distance / 2
            // const topValue = (y1 + y2)/2 - thickness / 2

            const {topValue, leftValue, distance, thickness, angle} = initRoadData(id1, id2)

            let id = 1
            if (roads.length !== 0) {
                id = roads[roads.length - 1].id + 1
            }

            setRoads([...roads, {
                id: id,
                name: "xx路",
                topValue: topValue,
                leftValue: leftValue,
                distance: distance,
                thickness: thickness,
                angle: angle,
                point1: id1,
                point2: id2,
                classifiedWay: 0,
                crowding:1//1表示完全不拥挤，数字越大越拥挤
            }])
            let newNodes = nodes
            newNodes[index1].roads.push(id)
            newNodes[index2].roads.push(id)

            setNodes([...newNodes])

        }
    }

    function deleteNode(id) {
        if (id > 0 && Number.isInteger(id)) {
            let toDelete = nodes.find(e => e.id === id)

            let newNodes = nodes.filter((e) => {
                return e.id !== id
            })

            deleteRoad(toDelete.roads, id)

            setNodes([...newNodes])

            setTargets({point1: NaN, point2: NaN, road: targets.road})

            setDetail({
                nowNodeBlock: {},
                nowNodeName: "未选中节点",
                nowNodeX: "未选中节点",
                nowNodeY: "未选中节点",
                nowNodeKind: "未选中节点",
                nowNodeId: "未选中节点"
            })

        }
    }

    function deleteRoad(ids, node = -1) {
        if (isNaN(ids[0])) {

        } else {
            let newRoads = roads
            let newNodes = nodes

            ids.forEach((id) => {
                let toDelete = roads.find((e) => e.id === id)

                if (toDelete === undefined) {
                    // console.log(nodes,nodes[1].roads,id)
                } else {
                    newRoads = newRoads.filter((e) => {
                        return e.id !== id
                    })

                    let point1 = nodes.findIndex((e) => e.id === toDelete.point1)
                    let point2 = nodes.findIndex((e) => e.id === toDelete.point2)

                    if (point1 !== node) {
                        newNodes[point1].roads = newNodes[point1].roads.filter((e) => {
                            return e !== id
                        })
                    }

                    if (point2 !== node) {
                        newNodes[point2].roads = newNodes[point2].roads.filter((e) => {
                            return e !== id
                        })
                    }
                }
            })


            setRoads([...newRoads])
            setNodes([...newNodes])
            setTargets({point1: targets.point1, point2: targets.point2, road: NaN})
        }
    }

    function setRoadFeature(featureName, featureValue) {
        if (!isNaN(targets.road)) {
            let newRoads = roads

            const targetIndex = roads.findIndex(e => e.id === targets.road)

            if (newRoads[targetIndex] !== undefined) {
                newRoads[targetIndex][featureName] = featureValue
                setRoads([...newRoads])
            }
        }
    }

    function addBlock() {
        let newNode = nodes
        const targetIndex = nodes.findIndex(e => e.id === detail.nowNodeId)

        let target = newNode[targetIndex]
        const newBlock = {
            left: 0,
            top: 0,
            width: 50,
            height: 50,
            rotate:0,
            hidden: false,
            kind: 0,
            workplace: []
        }

        target.block = newBlock

        newNode[targetIndex] = target
        // console.log(newNode)

        setNodes([...newNode])

    }

    function deleteBlock() {
        let newNode = nodes
        const targetIndex = nodes.findIndex(e => e.id === detail.nowNodeId)

        let target = newNode[targetIndex]

        target.block = {}

        newNode[targetIndex] = target
        // console.log(newNode)

        setNodes([...newNode])
    }

    function setBlockPosition(blockLeft, blockTop) {
        let newNode = nodes
        const targetIndex = nodes.findIndex(e => e.id === detail.nowNodeId)

        if (newNode[targetIndex] !== undefined/* && newNode[targetIndex].left !== undefined*/) {
            newNode[targetIndex].block.left = blockLeft
            newNode[targetIndex].block.top = blockTop
            setNodes([...newNode])
            focusNode(null, newNode[targetIndex].id)
        }
    }

    function setBlockFeature(blockFeature, blockValue) {
        let newNode = nodes
        const targetIndex = nodes.findIndex(e => e.id === detail.nowNodeId)

        if (newNode[targetIndex] !== undefined) {
            newNode[targetIndex].block[blockFeature] = blockValue
            setNodes([...newNode])
        }
    }

    function changeSize(kind) {
        let newWidth = map[0]
        let newHeight = map[1]
        if (kind === 1) {
            newWidth += 200
            setBase({baseX: base.baseX + 100, baseY: base.baseY})
        } else {
            newHeight += 200
            setBase({baseX: base.baseX, baseY: base.baseY + 100})
        }

        setMap([newWidth, newHeight])
    }

    //获取用户输入的json文件的对象
    function getFile(e) {
        // console.log(e.target.files[0])
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileTxtContent = event.target.result;
            // console.log('File content:', fileTxtContent);

            const fileContent = JSON.parse(fileTxtContent)
            // console.log(fileContent)

            setNodes(fileContent.nodes)
            setRoads(fileContent.roads)
            setMap([fileContent.width, fileContent.height])
            setBase(fileContent.base)
            setDetail({
                nowNodeName: "未选中节点",
                nowNodeX: "未选中节点",
                nowNodeY: "未选中节点",
                nowNodeKind: "未选中节点",
                nowNodeId: "未选中节点"
            })
            setTargets({point1: NaN, point2: NaN, road: NaN})
            setNowNode(-1)
            setRoadDetail({
                nowRoadName: "未选中道路",
                nowRoadLeft: "未选中道路",
                nowRoadTop: "未选中道路",
                nowRoadKind: "未选中道路",
                nowRoadId: "未选中道路"
            })
        };
        reader.readAsText(e.target.files[0]);

        // console.log(reader)
    }

    function saveMap() {
        // console.log("nodes:",nodes)
        // console.log("roads:",roads)
        // console.log("width:",map[0])
        // console.log("height:",map[1])
        // 创建一个 Blob 对象
        const jsonData = {
            width: map[0],
            height: map[1],
            base: base,
            nodes: nodes,
            roads: roads
        }

        // console.log(JSON.stringify(jsonData))

        const blob = new Blob([JSON.stringify(jsonData)], {type: 'application/json'});

        // 创建一个下载链接
        const url = URL.createObjectURL(blob);

        // 创建一个 <a> 标签用于触发下载
        const link = document.createElement('a');
        link.href = url;
        link.download = 'map.json';

        // 模拟点击下载链接
        document.body.appendChild(link);
        link.click();

        // 清理资源
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }

    function saveSql() {
        let sqlFile = "DROP TABLE IF EXISTS `node`;\n" +
            "CREATE TABLE `node` (\n" +
            "  `id` int NOT NULL,\n" +
            "  `x` int NOT NULL,\n" +
            "  `y` int NOT NULL,\n" +
            "  `kind` int NOT NULL,\n" +
            "  `roads` json DEFAULT NULL,\n" +
            "  `name` varchar(45) NOT NULL,\n" +
            "  `block` json DEFAULT NULL,\n" +
            "  PRIMARY KEY (`id`),\n" +
            "  UNIQUE KEY `id_UNIQUE` (`id`)\n" +
            ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n" +
            "LOCK TABLES `node` WRITE;\n" +
            "INSERT INTO `node` VALUES "

        nodes.forEach((value, index, array) => {
            let length = array.length
            sqlFile += "(" + value.id + "," + value.x + "," + value.y + "," + value.kind + "," + "'["
            let roadsLength = value.roads.length
            value.roads.forEach((roadValue, roadIndex, roadArray) => {
                sqlFile += Number(roadValue) + (roadIndex === roadsLength - 1 ? "" : ",")
            })
            sqlFile += "]','" + value.name + "','{"
            if (value.block.left !== undefined) {
                sqlFile += "\\\"top\\\": " + (Number(value.y) + Number(value.block.top) + Number(base.baseY)) + ", \\\"kind\\\":" + value.block.kind + ", \\\"left\\\": " + (Number(value.x) + Number(value.block.left) + Number(base.baseX)) + ", \\\"width\\\": " + value.block.width + ", \\\"height\\\": " + value.block.height + ", \\\"hidden\\\": " + value.block.hidden
            }
            sqlFile += "}')" + (index === length - 1 ? ";\n" : ",")
        })

        sqlFile += "UNLOCK TABLES;\n"

        sqlFile += "DROP TABLE IF EXISTS `road`;\n" +
            "CREATE TABLE `road` (\n" +
            "  `id` int NOT NULL,\n" +
            "  `name` varchar(45) NOT NULL,\n" +
            "  `top` int NOT NULL,\n" +
            "  `left` int NOT NULL,\n" +
            "  `distance` int NOT NULL,\n" +
            "  `thickness` int NOT NULL,\n" +
            "  `angle` double NOT NULL,\n" +
            "  `point1` int NOT NULL,\n" +
            "  `point2` int NOT NULL,\n" +
            "  `class` int NOT NULL,\n" +
            "  `crowding` int NOT NULL,\n" +
            "  PRIMARY KEY (`id`),\n" +
            "  UNIQUE KEY `id_UNIQUE` (`id`)\n" +
            ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n" +
            "LOCK TABLES `road` WRITE;\n" +
            "INSERT INTO `road` VALUES "

        roads.forEach((value, index, array) => {
            let length = array.length
            sqlFile += "(" + value.id + ",'" + value.name + "'," + (Number(value.topValue) + Number(base.baseY)) + "," + (Number(value.leftValue) + Number(base.baseX)) + "," + value.distance + "," + value.thickness + "," + value.angle + "," + value.point1 + "," + value.point2 + "," + value.classifiedWay + "," + value.crowding + ")"

            sqlFile += (index === length - 1) ? ";\n" : ","
        })

        sqlFile += "UNLOCK TABLES;"


        const blob = new Blob([sqlFile], {
            type: "text/plain;charset=utf-8"
        })
        // 根据 blob生成 url链接
        const objectURL = URL.createObjectURL(blob)

        // 创建一个 a 标签Tag
        const aTag = document.createElement('a')
        // 设置文件的下载地址
        aTag.href = objectURL
        // 设置保存后的文件名称
        aTag.download = "map.sql"
        // 给 a 标签添加点击事件
        aTag.click()
        // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
        // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
        URL.revokeObjectURL(objectURL)
    }

    return (
        <div className={Style["editor"]}>
            <div className={Style["operation"]}>
                <div className={Style["buttons-container"]}>
                    <div className={Style["status-button"]} onClick={() => {
                        toggleStatus(false)
                    }} style={{"--backclr": status ? "#eeeeee" : "#a0a0a0"}}>路口
                    </div>
                    <div className={Style["status-button"]} onClick={() => {
                        toggleStatus(true)
                    }} style={{"--backclr": !status ? "#eeeeee" : "#a0a0a0"}}>景点
                    </div>
                </div>
                <div className={Style["size-buttons"]}>
                    <button onClick={() => {
                        changeSize(1)
                    }}>加宽
                    </button>
                    <button onClick={() => {
                        changeSize(0)
                    }}>加高
                    </button>
                </div>
                <div className={Style["detail"]}>
                    <div className={Style["now-node-name"]}>名称:<input className={Style["detail-input"]}
                                                                        onBlur={(e) => {
                                                                            updateDetail("name", e.target.value)
                                                                        }} key={detail.nowNodeId + detail.nowNodeName}
                                                                        defaultValue={detail.nowNodeName}/></div>
                    <div className={Style["now-node-id"]}>ID: {detail.nowNodeId}</div>
                    <div className={Style["now-node-x"]}>X坐标:<input className={Style["detail-input"]} onBlur={(e) => {
                        updateDetail("x", Number(e.target.value - base.baseX))
                    }} key={detail.nowNodeId + detail.nowNodeX} defaultValue={detail.nowNodeX + base.baseX}/></div>
                    <div className={Style["now-node-y"]}>Y坐标:<input className={Style["detail-input"]} onBlur={(e) => {
                        updateDetail("y", Number(e.target.value - base.baseY))
                    }} key={detail.nowNodeId + detail.nowNodeY} defaultValue={detail.nowNodeY + base.baseY}/></div>
                    <div className={Style["now-node-kind"]}>种类:
                        <input type={"radio"} value={"路口"} name={"node_kind"} checked={detail.nowNodeKind === "路口"}
                               onChange={() => updateDetail("kind", false)}/><span>路口</span>
                        <input type={"radio"} value={"景点"} name={"node_kind"} checked={detail.nowNodeKind === "景点"}
                               onChange={() => updateDetail("kind", true)}/><span>景点</span>
                    </div>
                    <div className={Style["now-node-delete"]}>
                        <button onClick={() => {
                            deleteNode(nowNode)
                        }}>删除当前节点
                        </button>
                    </div>

                    {
                        detail.nowNodeKind &&
                        <div className={Style["block-operate"]}>
                            <button className={Style["set"]} onClick={() => {
                                addBlock()
                            }}>为当前节点添加景区
                            </button>
                            <button className={Style["set"]} onClick={() => {
                                deleteBlock()
                            }}>删除当前节点的景区
                            </button>
                            {
                                (detail.nowNodeBlock !== undefined && detail.nowNodeBlock.left !== undefined) &&
                                <div className={Style["block-detail"]}>
                                    <div className={Style["size"]}>相对X坐标:<input
                                        className={Style["detail-input"]}
                                        onBlur={(e) => {
                                            setBlockFeature("left", Number(e.target.value))
                                        }}
                                        key={detail.nowNodeId + "" + detail.nowNodeBlock.left + "blockh"}
                                        defaultValue={detail.nowNodeBlock.left}/>
                                    </div>
                                    <div className={Style["size"]}>相对Y坐标:<input
                                        className={Style["detail-input"]}
                                        onBlur={(e) => {
                                            setBlockFeature("top", Number(e.target.value))
                                        }}
                                        key={detail.nowNodeId + "" + detail.nowNodeBlock.top + "blockh"}
                                        defaultValue={detail.nowNodeBlock.top}/>
                                    </div>
                                    <div className={Style["size"]}>旋转角度:<input
                                        className={Style["detail-input"]}
                                        onBlur={(e) => {
                                            setBlockFeature("rotate", Number(e.target.value))
                                        }}
                                        key={detail.nowNodeId + "" + detail.nowNodeBlock.rotate + "blockr"}
                                        defaultValue={detail.nowNodeBlock.rotate}/>
                                    </div>
                                    <div className={Style["size"]}>宽度:<input
                                        className={Style["detail-input"]}
                                        onBlur={(e) => {
                                            setBlockFeature("width", Number(e.target.value))
                                        }}
                                        key={detail.nowNodeId + "" + detail.nowNodeBlock.width + "blockw"}
                                        defaultValue={detail.nowNodeBlock.width}/>
                                    </div>
                                    <div className={Style["size"]}>高度:<input
                                        className={Style["detail-input"]}
                                        onBlur={(e) => {
                                            setBlockFeature("height", Number(e.target.value))
                                        }}
                                        key={detail.nowNodeId + "" + detail.nowNodeBlock.height + "blockh"}
                                        defaultValue={detail.nowNodeBlock.height}/>
                                    </div>
                                </div>
                            }

                        </div>
                    }


                    <div className={Style["sides"]}>
                        <div className={Style["ends"]}>point1:{targets.point1} point2:{targets.point2}</div>
                        <button onClick={() => {
                            addRoad(targets.point1, targets.point2)
                        }}>在point1和point2之间设置路线
                        </button>
                        <div>道路id:{targets.road}</div>
                        <div>道路:</div>
                        <div>道路名称:<input
                            className={Style["detail-input"]}
                            onBlur={(e) => {
                                setRoadFeature("name", e.target.value)
                            }}
                            key={roadDetail.nowRoadId + "" + roadDetail.nowRoadName + "roadName"}
                            defaultValue={roadDetail.nowRoadName}/>
                        </div>
                        <div>道路长度:{roadDetail.nowRoadDistance}</div>
                        <div>道路等级:<input
                            className={Style["detail-input"]}
                            onBlur={(e) => {
                                setRoadFeature("classifiedWay", Number(e.target.value))
                            }}
                            key={roadDetail.nowRoadId + "" + roadDetail.nowRoadKind + "roadkind"}
                            defaultValue={roadDetail.nowRoadKind}/>
                        </div>
                        <div>拥挤系数:<input
                            className={Style["detail-input"]}
                            onBlur={(e) => {
                                setRoadFeature("crowding", Number(e.target.value))
                            }}
                            key={roadDetail.nowRoadId + "" + roadDetail.nowRoadCrowding + "roadcrowding"}
                            defaultValue={roadDetail.nowRoadCrowding}/>
                        </div>
                        <button onClick={() => {
                            deleteRoad([targets.road])
                        }}>{isNaN(targets.road) ? "未选择道路" : "删除该道路"}</button>
                    </div>

                    <div className={Style["file"]}>
                        <input type={"file"} onChange={(e) => {
                            getFile(e)
                        }}/>
                    </div>
                    <button onClick={saveMap}>保存</button>
                    <button onClick={saveSql}>保存为sql</button>

                </div>
            </div>
            <div className={Style["scroll"]}>
                <div className={Style["map"]} ref={scrollContainer} onClick={(e) => {
                    useMap.current = true;
                    addNode(e)
                }} style={{"--more-width": map[0] + "px", "--more-height": map[1] + "px"}}>
                    {
                        nodes.map((e) => {
                            if (e.block.hidden === undefined || e.block.hidden || !e.kind) {
                                return (
                                    <div key={e.id}>
                                        <div className={Style["node"]}
                                             style={{left: (e.x + base.baseX), top: (e.y + base.baseY)}}
                                             onClick={(ele) => {
                                                 focusNode(ele, e.id)
                                             }}>
                                            <i className={["iconfont", "icon-tongxinyuantu", `${Style["icon"]}`, `${Style[e.kind ? "tourism-unblock" : "cross"]}`].join(' ')}></i>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={e.id}>
                                        <div className={Style["node"]}
                                             style={{left: (e.x + base.baseX), top: (e.y + base.baseY)}}
                                             onClick={(ele) => {
                                                 focusNode(ele, e.id)
                                             }}>
                                            <i className={["iconfont", "icon-tongxinyuantu", `${Style["icon"]}`, `${Style["tourism"]}`].join(' ')}></i>
                                        </div>
                                        <div onClick={(e) => {
                                            e.stopPropagation()
                                        }}>
                                            <Block pointLeft={(e.x + base.baseX)}
                                                   pointTop={(e.y + base.baseY)}
                                                   blockLeft={e.block.left}
                                                   blockTop={e.block.top}
                                                   width={e.block.width}
                                                   height={e.block.height}
                                                   nodeId={e.id}
                                                   rotate={e.block.rotate}
                                                   enableGrab={true}
                                                   setBlockPosition={setBlockPosition}
                                                   focusNode={focusNode}
                                            />
                                        </div>

                                    </div>


                                )
                            }

                        })
                    }
                    {
                        roads.map((e) => {
                            return (
                                <div className={[`${Style["road"]}`, `${Style[roadKinds[e.classifiedWay]]}`].join(' ')} key={e.id} style={{
                                    left: (e.leftValue + base.baseX),
                                    top: (e.topValue + base.baseY),
                                    width: (e.distance),
                                    height: e.thickness,
                                    "--deg": e.angle
                                }} onClick={(ele) => {
                                    focusRoad(ele, e.id)
                                }}></div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}