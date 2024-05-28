package com.wanghgk.tourbackend.service;

import com.wanghgk.tourbackend.pojo.Node;
import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.pojo.Road;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PathService {
    List<Integer> shortestPath(Integer start, Integer end, Integer vehicle);

    List<Node> getAllNodes();

    List<Road> getAllRoads();

    List<Node> searchNodes(String keyword);

    List<Integer> fastestPath(Integer start, Integer end, Integer vehicle);
}