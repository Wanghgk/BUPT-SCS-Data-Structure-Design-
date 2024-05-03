package com.wanghgk.tourbackend.controller;

import com.wanghgk.tourbackend.pojo.Village;
import com.wanghgk.tourbackend.service.VillageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VillageController {

    @Autowired
    private VillageService villageService;

    @RequestMapping("/findById")
    public Village findById(Integer id){
        return villageService.findById(id);
    }

}
