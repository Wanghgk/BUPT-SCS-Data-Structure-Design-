package com.wanghgk.tourbackend.service;


import com.wanghgk.tourbackend.pojo.Article;
import com.wanghgk.tourbackend.pojo.PageBean;

public interface ArticleService {

//新增文章
    void add(Article article);
//条件分页列表查询
    PageBean<Article> list(Integer pageNum, Integer pageSize, Integer categoryId);
//获取文章详情
    Article findById(Integer id);
}