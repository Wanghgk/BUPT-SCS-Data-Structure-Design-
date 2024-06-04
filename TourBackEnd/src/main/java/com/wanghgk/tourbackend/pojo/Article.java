package com.wanghgk.tourbackend.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;

@Data
public class Article {
    private Integer id;  //主键ID
    @NotEmpty
    @Pattern(regexp = "^\\S{1,10}$")
    private String title;
    @NotEmpty
    private String content;
    @NotEmpty
    private String coverImg;
    @NotNull
    private Integer categoryId; //文章分类ID
    private Integer createUser;
    private LocalDateTime createTime;  //创建时间
    private LocalDateTime updateTime;  //更新时间
    private Integer totalScore;
    private Integer totalUser;
    private Integer totalView;
}