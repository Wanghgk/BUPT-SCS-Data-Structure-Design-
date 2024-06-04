package com.wanghgk.tourbackend.controller;

import com.wanghgk.tourbackend.pojo.Article;
import com.wanghgk.tourbackend.pojo.PageBean;
import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping
    public Result add(@RequestBody @Validated Article article){
        articleService.add(article);
        return Result.success();
    }

    @GetMapping
    public Result<PageBean<Article>> list(
            Integer pageNum,
            Integer pageSize,
            @RequestParam(required = false) Integer categoryId
    ){
        PageBean<Article> pb = articleService.list(pageNum,pageSize,categoryId);
        return Result.success(pb);
    }

    @GetMapping("/list")
    public Result<List<Article>> myAllList(){
        List<Article> articles = articleService.myAlllist();

        return Result.success(articles);
    }

    @GetMapping("/detail")
    public Result<Article> detail(Integer id){
        Article article = articleService.findById(id);

        return Result.success(article);
    }

    @GetMapping("/recommend")
    public Result<List<Article>> recommend(Integer size, Boolean[] receiveCategories){
        List<Article> articles = articleService.recommend(size, receiveCategories);

        return Result.success(articles);
    }

    @GetMapping("/search")
    public List<Article> searchByTitle(@RequestParam String title) {
        return articleService.searchByTitle(title);
    }

    @PostMapping("/score")
    public Result scoreArtical(Integer id,Integer score) {

        articleService.scoreArtical(id, score);

        return Result.success();
    }
    @PostMapping("/view")
    public Result viewArtical(Integer id) {
        articleService.viewArtical(id);

        return Result.success();
    }
}
