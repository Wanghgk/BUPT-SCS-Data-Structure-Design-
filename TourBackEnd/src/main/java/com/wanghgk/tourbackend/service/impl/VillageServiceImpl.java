package com.wanghgk.tourbackend.service.impl;

import com.wanghgk.tourbackend.mapper.VillageMapper;
import com.wanghgk.tourbackend.pojo.Village;
import com.wanghgk.tourbackend.service.VillageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VillageServiceImpl implements VillageService {

    @Autowired
    private VillageMapper villageMapper;
    @Override
    public Village findById(Integer id) {
        return villageMapper.findById(id);
    }
}
