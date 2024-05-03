package com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Village;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface VillageMapper {

    @Select("select * from china2020 where id = #{id}")
    public Village findById(Integer id);


}
