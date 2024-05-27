package com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Node;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface NodeMapper {

    @Select("SELECT * FROM node WHERE id = #{id}")
    Node getById(@Param("id") int id);

    @Select("SELECT * FROM node")
    List<Node> getAllNodes();

    @Select("SELECT MAX(id) FROM node")
    int getMaxNodeId();

    // 如果有其他需要的查询方法，可以在这里添加
}
