package com.wanghgk.tourbackend.controller;


import com.wanghgk.tourbackend.pojo.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
public class AvatarUploadController {

    private String imgUrl = "127.0.0.1:5002/";
    @PostMapping("/upload")
    public Result<String> upload(MultipartFile file) throws IOException {
        //获取文件原名
        String originalFilename = file.getOriginalFilename();

        //使用uuid保证文件名唯一不重复，防止文件覆盖
        String filename = UUID.randomUUID().toString() + originalFilename.substring(originalFilename.lastIndexOf("."));

        //把文件存储到本地磁盘上
        file.transferTo(new File("E:\\study_space\\data_structure_design\\static\\image\\" + filename));

        return Result.success(imgUrl + filename);
    }


}
