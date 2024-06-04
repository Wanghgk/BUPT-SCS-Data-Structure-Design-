package com.wanghgk.tourbackend.service;


import com.wanghgk.tourbackend.pojo.Article;
import com.wanghgk.tourbackend.pojo.PageBean;

import java.io.IOException;
import java.util.List;

public interface ArticleService {

//新增文章
    void add(Article article);
//条件分页列表查询
    PageBean<Article> list(Integer pageNum, Integer pageSize, Integer categoryId);
//获取文章详情
    Article findById(Integer id);

    List<Article> recommend(Integer size, Boolean[] receiveCategories);

    List<Article> searchByTitle(String title);

    List<Article> myAlllist();

    void scoreArtical(Integer id, Integer score);

    void viewArtical(Integer id);
}