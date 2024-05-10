package com.wanghgk.tourbackend.pojo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;


@Data
public class ArticleRelation {
    private Integer id;
    @NotEmpty
    private Integer articleId;
    @NotEmpty
    private Integer totalScore;
    @NotEmpty
    private Integer totalTimes;
    @Pattern(regexp = "^\\{.*\\}$", message = "Must be a valid JSON string")
    private String attractionsRelated;//关联景区，含有一个数组attractions,若没有则传入空数组
}
