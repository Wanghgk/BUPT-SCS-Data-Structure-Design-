package com.wanghgk.tourbackend.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class User {
    @NonNull
    private Integer id;
    private String username;
    @JsonIgnore//让springmvc把当前对象转换成json字符串的时候，忽略password，最终的json字符串中就没有password这个属性了
    private String password;
    private String avatar;
    @NotEmpty
    @Pattern(regexp = "^\\S{1,10}$")
    private String nickname;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Integer status;
}
