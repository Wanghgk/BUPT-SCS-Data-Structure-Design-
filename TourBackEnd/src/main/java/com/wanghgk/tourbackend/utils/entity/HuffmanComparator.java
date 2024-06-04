package com.wanghgk.tourbackend.utils.entity;

import java.util.Comparator;

/**
 * @Author: dc
 * @create: 2024/5/25 - 22:35
 * @description:
 */
public class HuffmanComparator implements Comparator<HuffmanNode> {
    public int compare(HuffmanNode x, HuffmanNode y) {
        return x.frequency - y.frequency;
    }
}