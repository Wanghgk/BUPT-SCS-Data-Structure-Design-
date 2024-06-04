package com.wanghgk.tourbackend.controller;

import com.wanghgk.tourbackend.pojo.Node;
import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.pojo.Road;
import com.wanghgk.tourbackend.service.PathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/path")
@Validated
public class PathController {

    @Autowired
    private PathService pathService;

    @PostMapping("/view")
    public Result viewNode(Integer id) {
        pathService.viewNode(id);
        return Result.success();
    }

    @PostMapping("/setIn")
    public Result setIn(boolean isIn) {
        pathService.setIn(isIn);

        return Result.success();
    }

    @PostMapping("/shortest")
    public Result<List<Integer>> findShortestPath(Integer start, Integer end, Integer vehicle) {

        return Result.success(pathService.shortestPath(start, end, vehicle));
    }

    @PostMapping("/fastest")
    public Result<List<Integer>> findFastestPath(Integer start, Integer end, Integer vehicle) {
        return Result.success(pathService.fastestPath(start, end, vehicle));
    }

    @PostMapping("/shortestmulti")
    public Result<List<Integer>> findShortestMultiPath(@RequestBody List<String> array) {
        List<Integer> ends = new ArrayList<>(array.stream().map(Integer::parseInt).toList());

        Integer start = ends.get(0);
        ends.remove(0);
        Integer vehicle = ends.get(0);
        ends.remove(0);
        return Result.success(pathService.shortestMultiPath(start,ends,vehicle));
    }

    @GetMapping("/nodes")
    public Result<List<Node>> getAllNodes() {
        List<Node> nodes = pathService.getAllNodes();
        return Result.success(nodes);
    }

    @GetMapping("/roads")
    public Result<List<Road>> getAllRoads() {
        List<Road> roads = pathService.getAllRoads();
        return Result.success(roads);
    }

    @PostMapping("/search")
    public Result<List<Node>> searchNodes(String keyword) {
        List<Node> nodes = pathService.searchNodes(keyword);
        return Result.success(nodes);
    }
}
