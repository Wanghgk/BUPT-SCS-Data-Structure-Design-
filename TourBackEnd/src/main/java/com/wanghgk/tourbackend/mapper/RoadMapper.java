package com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Road;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface RoadMapper {

    @Select("SELECT * FROM road WHERE id = #{id}")
    Road getById(@Param("id") int id);

    @Select("SELECT * FROM road")
    List<Road> getAllRoads();
    @Select("SELECT MAX(id) FROM road")
    int getMaxNodeId();

    @Select("SELECT * FROM buptroad WHERE id = #{id}")
    Road getByIdB(@Param("id") int id);

    @Select("SELECT * FROM buptroad")
    List<Road> getAllRoadsB();
    @Select("SELECT MAX(id) FROM buptroad")
    int getMaxNodeIdB();
    // 如果有其他需要的查询方法，可以在这里添加
}

