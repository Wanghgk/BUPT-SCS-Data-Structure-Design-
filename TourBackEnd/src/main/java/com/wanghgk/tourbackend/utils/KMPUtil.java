package com.wanghgk.tourbackend.utils;

import java.util.ArrayList;
import java.util.List;

public class KMPUtil {

    /**
     * KMP算法，在txt中搜索pat出现的所有位置
     * @param pat 模式字符串
     * @param txt 文本字符串
     * @return 模式字符串在文本字符串中出现的所有位置的列表
     */
    public static List<Integer> KMPSearch(String pat, String txt) {
        int M = pat.length();
        int N = txt.length();

        List<Integer> matches = new ArrayList<>();
        int[] lps = new int[M];
        int j = 0; // index for pat[]

        computeLPSArray(pat, M, lps);

        int i = 0; // index for txt[]
        while (i < N) {
            if (pat.charAt(j) == txt.charAt(i)) {
                j++;
                i++;
            }
            if (j == M) {
                matches.add(i - j);
                j = lps[j - 1];
            } else if (i < N && pat.charAt(j) != txt.charAt(i)) {
                if (j != 0) {
                    j = lps[j - 1];
                } else {
                    i = i + 1;
                }
            }
        }
        return matches;
    }

    /**
     * 计算LPS（最长前缀后缀）数组
     * @param pat 模式字符串
     * @param M 模式字符串的长度
     * @param lps lps数组
     */
    private static void computeLPSArray(String pat, int M, int[] lps) {
        int len = 0;
        int i = 1;
        lps[0] = 0;

        while (i < M) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = len;
                    i++;
                }
            }
        }
    }
}
