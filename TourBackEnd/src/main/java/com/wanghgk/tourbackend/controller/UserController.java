package com.wanghgk.tourbackend.controller;

import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.pojo.User;
import com.wanghgk.tourbackend.service.UserService;
import com.wanghgk.tourbackend.utils.JwtUtil;
import com.wanghgk.tourbackend.utils.Md5Util;
import com.wanghgk.tourbackend.utils.ThreadLocalUtil;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Result register(@Pattern(regexp = "^\\S{5,16}$") String username, @Pattern(regexp = "^\\S{5,16}$") String password) {
        //查询用户
        User u = userService.findByUserName(username);
        if(u == null){
            //没有占用
            // 注册
            userService.rigister(username,password);
            return Result.success();
        }else {
            //占用
            return Result.err("用户名已被占用");
        }

    }

    @PostMapping("/login")
    public Result<String> login(@Pattern(regexp = "^\\S{5,16}$") String username, @Pattern(regexp = "^\\S{5,16}$") String password) {
        //根据用户名查询用户
        User loginUser = userService.findByUserName(username);
        //判断该用户是否存在
        if(loginUser == null){
//            System.out.println(username + password);
            return Result.err("用户名错误");

        }

        //判断密码是否正确
        if(Md5Util.getMD5String(password).equals(loginUser.getPassword())) {
            //登陆成功
            Map<String,Object> claims = new HashMap<>();
            claims.put("id",loginUser.getId());
            claims.put("username",loginUser.getUsername());

            String token = JwtUtil.genToken(claims);
            return Result.success(token);
        }

        return Result.err("密码错误");

    }

    @GetMapping("/userInfo")
    public Result<User> userInfo(/*@RequestHeader(name = "Authorization") String token*/){

        //根据用户名查询用户
//        Map<String,Object> map = JwtUtil.parseToken(token);
//        String username = (String) map.get("username");

        Map<String,Object> map = ThreadLocalUtil.get();
        String username = (String) map.get("username");

        User user = userService.findByUserName(username);
        return Result.success(user);

    }

    @PostMapping("/searchUser")
    public Result<User> searchUser(Integer id) {
        User user = userService.findById(id);

        return Result.success(user);
    }

    @PutMapping("/update")
    public Result update(@RequestBody @Validated User user) {
        userService.update(user);

        return Result.success();
    }

    @PatchMapping("/updateAvatar")
    public Result updateAvatar(@RequestParam String avatarUrl) {
        userService.updateAvatar(avatarUrl);

        return Result.success();
    }

}
