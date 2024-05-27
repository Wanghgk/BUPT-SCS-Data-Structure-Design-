package com.wanghgk.tourbackend.pojo;

import lombok.Data;

@Data
public class Node {
    private Integer id;
    private int x;
    private int y;
    private int kind;
    private String roads;
    private String name;
    private String block;
}
