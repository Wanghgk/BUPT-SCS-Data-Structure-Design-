package com.wanghgk.tourbackend.service.impl;

import com.wanghgk.tourbackend.mapper.NodeMapper;
import com.wanghgk.tourbackend.mapper.RoadMapper;
import com.wanghgk.tourbackend.pojo.Node;
import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.pojo.Road;
import com.wanghgk.tourbackend.service.PathService;
import com.wanghgk.tourbackend.utils.DijkstraAlgorithmUtil;
import com.wanghgk.tourbackend.utils.KMPUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PathServiceImpl implements PathService {

    private final NodeMapper nodeMapper;
    private final RoadMapper roadMapper;

    private int numNodes;

    private boolean isInNow = false;

    @Autowired
    public PathServiceImpl(NodeMapper nodeMapper, RoadMapper roadMapper) {
        this.nodeMapper = nodeMapper;
        this.roadMapper = roadMapper;
        this.numNodes = nodeMapper.getMaxNodeId();
    }

    @Override
    public List<Integer> shortestPath(Integer start, Integer end, Integer vehicle) {
        int[][][] adjacencyMatrix = getAdjacencyMatrix(false, vehicle);
        DijkstraAlgorithmUtil dijkstraAlgorithmUtil = new DijkstraAlgorithmUtil(numNodes,adjacencyMatrix);
        return dijkstraAlgorithmUtil.shortestPath(start-1, end-1, true);
    }

    @Override
    public List<Node> getAllNodes() {

        List<Node> nodes;
        if(isInNow) {
            nodes = nodeMapper.getAllNodesB();
        } else {
            nodes = nodeMapper.getAllNodes();
        }
        return nodes;
    }

    @Override
    public List<Road> getAllRoads() {
        List<Road> roads;
        if(isInNow) {
            roads = roadMapper.getAllRoadsB();
        } else {
            roads = roadMapper.getAllRoads();
        }
        return roads;
    }

    @Override
    public List<Node> searchNodes(String keyword) {
        List<Node> allNodes = isInNow ? nodeMapper.getAllNodes() : nodeMapper.getAllNodesB();
        List<NodeMatch> matchingNodes = new ArrayList<>();

        for (Node node : allNodes) {
            int matchCount = 0;
            for (char c : keyword.toCharArray()) {
                if (!KMPUtil.KMPSearch(String.valueOf(c), node.getName()).isEmpty()) {
                    matchCount++;
                }
            }
            if (matchCount > 0) {
                matchingNodes.add(new NodeMatch(node, matchCount));
            }
        }

        matchingNodes.sort(Comparator.comparingInt(NodeMatch::getMatchCount).reversed());

        List<Node> sortedNodes = new ArrayList<>();
        for (NodeMatch nodeMatch : matchingNodes) {
            sortedNodes.add(nodeMatch.getNode());
        }

        return sortedNodes;
    }

    @Override
    public List<Integer> fastestPath(Integer start, Integer end, Integer vehicle) {
        int[][][] adjacencyMatrix = getAdjacencyMatrix(true, vehicle);
        DijkstraAlgorithmUtil dijkstraAlgorithmUtil = new DijkstraAlgorithmUtil(numNodes,adjacencyMatrix);
        return dijkstraAlgorithmUtil.shortestPath(start-1, end-1, true);
    }

    @Override
    public List<Integer> shortestMultiPath(Integer start, List<Integer> ends, Integer vehicle) {
        System.out.println(start);
        System.out.println(ends);
        System.out.println(vehicle);
//        List<Node> nodes = nodeMapper.getAllNodes();
//        List<Road> roads = roadMapper.getAllRoads();
        int[][][] adjacencyMatrix = getAdjacencyMatrix(false, vehicle);


        List<Integer> optimalPath = new ArrayList<>();
        Set<Integer> toVisit = new HashSet<>(ends);
//        optimalPath.add(start);

        int currentNode = start;
        int preNode = start;

        while (!toVisit.isEmpty()) {
            int nextNode = -1;
            int shortestDistance = Integer.MAX_VALUE;
            List<Integer> finalPath = new ArrayList<>();
            for (int node : toVisit) {
                DijkstraAlgorithmUtil dijkstraAlgorithmUtil = new DijkstraAlgorithmUtil(numNodes,adjacencyMatrix);
                List<Integer> path = dijkstraAlgorithmUtil.shortestPath(currentNode-1, node-1, false);
                int distance = 0;
                int startNode = -1;
                for(int pathNode : path) {
                    if(startNode != -1) {
                        distance += adjacencyMatrix[0][startNode-1][pathNode-1];
                    }
                    startNode = pathNode;
                }
                if (distance < shortestDistance) {
                    finalPath = path;
                    shortestDistance = distance;
                    nextNode = node;
                }
            }
            for (int node : finalPath) {
                if(preNode != -1) {
                    optimalPath.add(adjacencyMatrix[1][preNode-1][node-1]);
                }
                preNode = node;
            }

            currentNode = nextNode;
            toVisit.remove(nextNode);
        }

        return optimalPath;
    }

    @Override
    public void setIn(boolean isIn) {
        isInNow = isIn;
        numNodes = nodeMapper.getMaxNodeIdB();
    }

    @Override
    public void viewNode(Integer id) {
        Node node = nodeMapper.getById(id);
        Integer newTotalView = node.getTotalView()+1;
        nodeMapper.viewNode(id,newTotalView);
    }

    public int[][][] getAdjacencyMatrix(boolean enableCrowding, Integer vehicle) {
        List<Integer> vehicleBan = new ArrayList<>();
        int[][] vehicleNotPermit = {{1,2},{2,3},{2,3},{3}};
        for(Integer item:vehicleNotPermit[vehicle]) {
            vehicleBan.add(item);
        }

        int[][][] adjacencyMatrix = new int[2][numNodes][numNodes];


        for (int i = 0; i < numNodes; i++) {
            for (int j = 0; j < numNodes; j++) {
                adjacencyMatrix[0][i][j] = Integer.MAX_VALUE;
                adjacencyMatrix[1][i][j] = -1;
            }
        }

        List<Road> roads;
        if(isInNow) {
            roads = roadMapper.getAllRoadsB();
        } else {
            roads = roadMapper.getAllRoads();
        }
        if(enableCrowding){
            for (Road road : roads) {
                if(!vehicleBan.contains(road.getRclass())) {
                    int point1 = road.getPoint1() - 1;
                    int point2 = road.getPoint2() - 1;
                    int distance = road.getDistance();
                    if (road.getRclass() == 3) {
                        distance /= 3;
                    }
                    int crowding = road.getCrowding();
                    int id = road.getId();
                    adjacencyMatrix[0][point1][point2] = distance * crowding;
                    adjacencyMatrix[0][point2][point1] = distance * crowding; // Assuming undirected roads
                    adjacencyMatrix[1][point1][point2] = id;
                    adjacencyMatrix[1][point2][point1] = id;
                }
            }
        }else {
            for (Road road : roads) {
                if(!vehicleBan.contains(road.getRclass())){
                    int point1 = road.getPoint1() - 1;
                    int point2 = road.getPoint2() - 1;
                    int distance = road.getDistance();
                    int id = road.getId();
                    adjacencyMatrix[0][point1][point2] = distance;
                    adjacencyMatrix[0][point2][point1] = distance; // Assuming undirected roads
                    adjacencyMatrix[1][point1][point2] = id;
                    adjacencyMatrix[1][point2][point1] = id;
                }
            }
        }

//        System.out.println(Arrays.toString(adjacencyMatrix[1]));

        return adjacencyMatrix;
    }


    private static class NodeMatch {
        private final Node node;
        private final int matchCount;

        public NodeMatch(Node node, int matchCount) {
            this.node = node;
            this.matchCount = matchCount;
        }

        public Node getNode() {
            return node;
        }

        public int getMatchCount() {
            return matchCount;
        }
    }
}
