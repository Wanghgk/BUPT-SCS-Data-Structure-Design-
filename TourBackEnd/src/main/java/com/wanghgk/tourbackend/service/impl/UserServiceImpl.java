package com.wanghgk.tourbackend.service.impl;

import com.wanghgk.tourbackend.mapper.UserMapper;
import com.wanghgk.tourbackend.pojo.User;
import com.wanghgk.tourbackend.service.UserService;
import com.wanghgk.tourbackend.utils.Md5Util;
import com.wanghgk.tourbackend.utils.ThreadLocalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUserName(String username) {
        User u = userMapper.findByUserName(username);
        return u;
    }

    @Override
    public void rigister(String username, String password) {
        //加密
        String mdtString = Md5Util.getMD5String(password);
        //添加
        userMapper.add(username,mdtString);
    }

    @Override
    public void update(User user) {
        user.setUpdateTime(LocalDateTime.now());

        userMapper.update(user);
    }

    @Override
    public void updateAvatar(String avatarUrl) {
        Map<String,Object> map = ThreadLocalUtil.get();
        Integer id = (Integer) map.get("id");
        userMapper.updateAvatar(avatarUrl,id);
    }

    @Override
    public User findById(Integer id) {
        User user = userMapper.findById(id);
//        user.setPassword("******");
        return user;
    }
}
