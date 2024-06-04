import {useState, useRef, useEffect} from "react";


import Style from "./Operation.module.css"
import axios from "axios";
import qs from "qs";
import {useSelector} from "react-redux";

export default function Operation(props) {
    const {enActive, flushDetail, changePosition, mapScrollTo, changeTarget, vehicle, roads, targets, goin} = props

    const [results, setResults] = useState([])
    const [nodeDetail, setNodeDetail] = useState({id: 0, name: "", img: "http://127.0.0.1:5002/3-d.png"})
    const [path, setPath] = useState([])
    const operationRef = useRef()
    const pathDetailRef = useRef()
    const newflush = useRef(true)
    const nowPositionRef = useRef(47)
    const isInRef = useRef(false)
    const [isIn, changeIsIn] = useState(false)

    const token = sessionStorage.getItem("token")
    const darkness = useSelector(state => state.darkness.value)

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         operationRef.current.classList.remove(Style["node-detail"])
    //     },1)
    // })

    useEffect(() => {
        if (!newflush.current) {
            const newNodeDetail = {id: flushDetail.id, name: flushDetail.name, img: "http://127.0.0.1:5002/3-d.png"}
            setNodeDetail(newNodeDetail)
            operationRef.current.classList.add(Style["node-detail"])
        } else {
            newflush.current = false
        }

    }, [flushDetail])

    function searchResult(e) {
        operationRef.current.classList.remove(Style["node-detail"])
        pathDetailRef.current.classList.remove(Style["show"])
        // console.log(e.target.value)
        const data = {keyword: e.target.value}
        const header = {headers: {"authorization": token}}

        axios.post("http://127.0.0.1:8080/path/search", qs.stringify(data), header)
            .then(res => {
                // console.log(res)
                setResults(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    function showDetail(index) {
        const newNode = results[index]
        const newNodeDetail = {id: newNode.id, name: newNode.name, img: "http://127.0.0.1:5002/3-d.png"}
        setNodeDetail(newNodeDetail)
        mapScrollTo(newNode.id, newNode.x, newNode.y)
        operationRef.current.classList.add(Style["node-detail"])
    }

    function postShortestPath(end) {
        const header = {headers: {"authorization": token}}
        const data = {start: nowPositionRef.current, end: end, vehicle: vehicle}

        axios.post("http://127.0.0.1:8080/path/shortest", qs.stringify(data), header)
            .then(res => {
                // console.log(res)
                setPath(res.data.data)
                enActive(res.data.data)
                pathDetailRef.current.classList.add(Style["show"])
            })
            .catch(err => {
                console.log(err)
            })

    }

    function postFastestPath(end) {
        const header = {headers: {"authorization": token}}
        const data = {start: nowPositionRef.current, end: end, vehicle: vehicle}

        axios.post("http://127.0.0.1:8080/path/fastest", qs.stringify(data), header)
            .then(res => {
                // console.log(res)
                setPath(res.data.data)
                enActive(res.data.data)
                pathDetailRef.current.classList.add(Style["show"])
            })
            .catch(err => {
                console.log(err)
            })

    }

    function postMultiplePath() {
        const header = {headers: {"authorization": token}}
        const data = [nowPositionRef.current, vehicle, ...targets]

        axios.post("http://127.0.0.1:8080/path/shortestmulti", data, header)
            .then(res => {
                // console.log(res)
                // console.log(res.data.data)
                setPath(res.data.data)
                enActive(res.data.data)
                pathDetailRef.current.classList.add(Style["show"])
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <div className={Style["operation"]} ref={operationRef}>
            <input placeholder={"输入目标地点"} onChange={(e) => {
                searchResult(e)
            }}/>
            <div className={Style["search-result"]}>
                {
                    results.map((item, index) => {
                        return (
                            <div
                                className={[`${Style["destination"]}`, `${Style[(index % 2) === 0 ? "left" : "right"]}`].join(' ')}
                                key={item.id} onClick={(e) => {
                                e.stopPropagation();
                                showDetail(index)
                            }}>{item.name}</div>
                        )

                    })
                }
            </div>
            <div className={Style["detail"]}>
                <div className={Style["node-name"]}>{nodeDetail.name}</div>
                <div className={Style["node-image"]}>
                    <img src={nodeDetail.img}/>
                </div>
                <div className={Style["newtons"]}>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            postShortestPath(nodeDetail.id)
                        }}>
                            <i className={["iconfont", "icon-navigation1", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>最近距离</div>
                    </div>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            nowPositionRef.current = nodeDetail.id
                            changePosition(nodeDetail.id)
                        }}>
                            <i className={["iconfont", "icon-daohangdizhi", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>设置位置</div>
                    </div>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            postFastestPath(nodeDetail.id)
                        }}>
                            <i className={["iconfont", "icon-navigation1", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>最短时间</div>
                    </div>
                </div>
                <div className={Style["newtons"]}>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            changeTarget(nodeDetail.id, true)
                        }}>
                            <i className={["iconfont", "icon-add-s", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>添到目标</div>
                    </div>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            changeTarget(nodeDetail.id, false)
                        }}>
                            <i className={["iconfont", "icon-jian", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>删除目标</div>
                    </div>
                    <div className={Style["newton-item"]}>
                        <div className={Style["newton"]} onClick={(e) => {
                            e.stopPropagation();
                            postMultiplePath()
                        }}>
                            <i className={["iconfont", "icon-daohang1", `${Style["icon"]}`].join(' ')}></i>
                        </div>
                        <div className={Style["newton-name"]}>多点导航</div>
                    </div>
                </div>
                <div className={Style["go-in"]} onClick={() => {
                    isInRef.current = !(isInRef.current)
                    operationRef.current.classList.remove(Style["node-detail"])
                    pathDetailRef.current.classList.remove(Style["show"])
                    setResults([])
                    setPath([])
                    goin(isInRef.current,nowPositionRef.current)
                    nowPositionRef.current = 105
                    changeIsIn(isInRef.current)
                }
                }>{isInRef.current ? "离开场所" : "进入场所内"}</div>
            </div>
            <div className={Style["path-detail-container"]}>
                <div className={Style["path-detail"]} ref={pathDetailRef}>
                    <div className={Style["head"]}>
                        <i className={["iconfont", "icon-xiangzuojiantou", `${Style["icon"]}`].join(' ')}
                           onClick={(e) => {
                               pathDetailRef.current.classList.remove(Style["show"])
                           }}>
                            返回
                        </i>
                    </div>
                    <div className={Style["paths"]}>
                        {
                            path.map((id) => {
                                // eslint-disable-next-line no-unused-expressions
                                const road = roads.find((e) => {
                                    return e.id === id
                                })
                                return (
                                    <div className={Style["path-item"]}>
                                        <div className={Style["path-road-name"]}>
                                            {road.name}
                                        </div>
                                        <div className={Style["path-road-distance"]}>
                                            {Number.parseInt(road.distance) * 10}米
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}