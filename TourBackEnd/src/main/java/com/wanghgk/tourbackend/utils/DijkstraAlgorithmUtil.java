package com.wanghgk.tourbackend.utils;
import com.wanghgk.tourbackend.pojo.Node;
import com.wanghgk.tourbackend.pojo.Road;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class DijkstraAlgorithmUtil {
    private int[][] adjacencyMatrix;
    private int[][] roadMatrix;
    private int numNodes;

    public DijkstraAlgorithmUtil(int numNodes, int[][][] adjacencyMatrix) {
        this.adjacencyMatrix = adjacencyMatrix[0];
        this.roadMatrix = adjacencyMatrix[1];
        this.numNodes = numNodes;
    }

    public List<Integer> shortestPath(int startNode, int endNode, boolean isRoad) {
        int[] dist = new int[numNodes];
        boolean[] visited = new boolean[numNodes];
        int[] previous = new int[numNodes]; // 用于记录节点
        int[] gone = new int[numNodes];//用于记录走过的路

        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(previous, -1); // 初始化前驱节点为 -1
        Arrays.fill(gone,-1);
        dist[startNode] = 0;

        for (int i = 0; i < numNodes; i++) {
            int minDistNode = findMinDistanceNode(dist, visited);
            if (minDistNode == -1){
                System.out.println("minDistNode等于-1");
                break; // 无法继续
            }
            visited[minDistNode] = true;

            if (minDistNode == endNode) break; // 已到达终点

            for (int j = 0; j < numNodes; j++) {
                if (!visited[j] && adjacencyMatrix[minDistNode][j] != 0 &&
                        dist[minDistNode] != Integer.MAX_VALUE &&
                        adjacencyMatrix[minDistNode][j] != Integer.MAX_VALUE &&
                        dist[minDistNode] + adjacencyMatrix[minDistNode][j] < dist[j]) {
                    dist[j] = dist[minDistNode] + adjacencyMatrix[minDistNode][j];
                    previous[j] = minDistNode; // 记录前驱节点
                    gone[j] = roadMatrix[minDistNode][j];
//                    if(j==1||minDistNode==1) {
//                        System.out.println(j+","+minDistNode);
//                    }
                }
            }
//            System.out.println(minDistNode);

        }

//        System.out.println(Arrays.toString(adjacencyMatrix[1]));
        return constructPath(startNode, endNode, previous, gone, isRoad);
    }

    private int findMinDistanceNode(int[] dist, boolean[] visited) {
        int minDist = Integer.MAX_VALUE;
        int minDistNode = -1;
//        System.out.println(Arrays.toString(dist));

        for (int i = 0; i < numNodes; i++) {
            if (!visited[i] && dist[i] < minDist) {
                minDist = dist[i];
                minDistNode = i;
            }
        }

        if(minDistNode == -1){
            System.out.println(Arrays.toString(dist));
            System.out.println(Arrays.toString(visited));
        }

        return minDistNode;
    }

    private List<Integer> constructPath(int startNode, int endNode, int[] previous, int[] gone, boolean isRoad) {
        List<Integer> path = new ArrayList<>();
        for (int at = endNode; at != -1 && gone[at] != -1; at = previous[at]) {
//            System.out.println(at);
            if(isRoad){
                path.add(gone[at]);//返回路径

            }else {
                path.add(at+1);//返回节点

            }
        }
        Collections.reverse(path);
//        if (path.get(0) == startNode+1) {
//            return path;
//        }
//        return Collections.emptyList(); // 如果路径不连通，则返回空列表
        return path;
    }
}


