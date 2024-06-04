package com.wanghgk.tourbackend.service;

import com.wanghgk.tourbackend.pojo.User;

public interface UserService {
    //根据用户名查询用户
    User findByUserName(String username);

    //注册
    void rigister(String username, String password);

    //更新基本信息（nickname）
    void update(User user);

    //更新头像
    void updateAvatar(String avatarUrl);

    User findById(Integer id);
}
