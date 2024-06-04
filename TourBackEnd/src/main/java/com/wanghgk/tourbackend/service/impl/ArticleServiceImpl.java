package com.wanghgk.tourbackend.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.wanghgk.tourbackend.mapper.ArticleMapper;
import com.wanghgk.tourbackend.pojo.Article;
import com.wanghgk.tourbackend.pojo.PageBean;
import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.service.ArticleService;
import com.wanghgk.tourbackend.utils.HuffmanCoding;
import com.wanghgk.tourbackend.utils.ThreadLocalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;


@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    private final ConcurrentHashMap<Long, Queue<Long>> userRecentArticleMap = new ConcurrentHashMap<>();
    private final int QUEUE_MAX_SIZE = 10;
    HuffmanCoding huffmanCoding = new HuffmanCoding();
    @Override
    public void add(Article article) {
        //补充属性值
        article.setCreateTime(LocalDateTime.now());
        article.setUpdateTime(LocalDateTime.now());

        Map<String,Object> map = ThreadLocalUtil.get();
        Integer userId = (Integer) map.get("id");
        article.setCreateUser(userId);
        //使用Huffman压缩文本
//        String content = article.getContent();
//
//        String compressedContent = huffmanCoding.compress(content);
//        article.setContent(compressedContent);

        articleMapper.add(article);
    }

    @Override
    public PageBean<Article> list(Integer pageNum, Integer pageSize, Integer categoryId) {
       //创建PageBean对象
        PageBean<Article> pb = new PageBean<>();
        //开启分页查询 PageHelper
        PageHelper.startPage(pageNum,pageSize);

        //调用mapper
        Map<String,Object> map = ThreadLocalUtil.get();
        Integer userId = (Integer)map.get("id");
        List<Article> as = articleMapper.list(userId,categoryId);
        //因为Page中提供了方法，可以获取PageHelper分页查询后得到的总记录条数和当前页数据
        Page<Article> p = (Page<Article>) as;

        //把数据填充到PageBean对象中
        pb.setTotal(p.getTotal());
        pb.setItems(p.getResult());
        return pb;
    }

    @Override
    public Article findById(Integer id) {

        Article article = articleMapper.findById(id);
        //使用Huffman解压文本
//        article.setContent(huffmanCoding.decompress(article.getContent()));
        return article;
    }

    @Override
    public List<Article> recommend(Integer size, Boolean[] receiveCategories) {
        Map<String, Object> params = new HashMap<>();
        Map<String,Object> map = ThreadLocalUtil.get();
        Integer userId = (Integer) map.get("id");
        params.put("size", size);
        List<Integer> categories = new ArrayList<>();
        for (int i = 0; i < receiveCategories.length; ++i) {
            if (receiveCategories[i]) {
                categories.add(i + 1);
            }
        }
        params.put("categories", categories);

        Queue<Long> recentArticleQueue = userRecentArticleMap.computeIfAbsent(Long.valueOf(userId), k -> new ConcurrentLinkedQueue<>());
        List<Long> excludedIds = new ArrayList<>(recentArticleQueue);
        params.put("excludedIds", excludedIds);

        List<Article> articles = articleMapper.recommend(params);

        for (Article article : articles) {
            recentArticleQueue.add(Long.valueOf(article.getId()));
            if (recentArticleQueue.size() > QUEUE_MAX_SIZE) {
                recentArticleQueue.poll();
            }
        }

        return articles;
    }

    @Override
    public List<Article> searchByTitle(String title) {
        return articleMapper.searchByTitle(title);
    }

    @Override
    public List<Article> myAlllist() {
        Map<String,Object> map = ThreadLocalUtil.get();
        Integer userId = (Integer)map.get("id");
        List<Article> articles = articleMapper.myAllList(userId);

        return articles;
    }

    @Override
    public void scoreArtical(Integer id, Integer score) {
//        System.out.println(id);
        Article article = articleMapper.findById(id);
        Integer newScore = article.getTotalScore()+score;
        Integer newUsers = article.getTotalUser()+1;

        articleMapper.scoreArtical(id,newScore,newUsers);
    }

    @Override
    public void viewArtical(Integer id) {
        Article article = articleMapper.findById(id);
        Integer view = article.getTotalView() + 1;
        articleMapper.viewArtical(id,view);
    }
}
