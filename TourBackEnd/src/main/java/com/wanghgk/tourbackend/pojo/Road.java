package com.wanghgk.tourbackend.pojo;

import lombok.Data;

@Data
public class Road {
    private int id;
    private String name;
    private int top;
    private int left;
    private int distance;
    private int thickness;
    private double angle;
    private int point1;
    private int point2;
    private int clazz;
    private int crowding;
}
