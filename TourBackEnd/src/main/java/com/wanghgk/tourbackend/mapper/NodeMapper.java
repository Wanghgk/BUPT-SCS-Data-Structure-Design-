package com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Node;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface NodeMapper {

    @Select("SELECT * FROM node WHERE id = #{id}")
    Node getById(@Param("id") int id);

    @Select("SELECT * FROM node")
    List<Node> getAllNodes();

    @Select("SELECT MAX(id) FROM node")
    int getMaxNodeId();

    @Select("SELECT * FROM buptnode WHERE id = #{id}")
    Node getByIdB(@Param("id") int id);

    @Select("SELECT * FROM buptnode")
    List<Node> getAllNodesB();

    @Select("SELECT MAX(id) FROM buptnode")
    int getMaxNodeIdB();

    @Update("update node set total_view=#{totalView} where id=#{id}")
    void viewNode(Integer id, Integer totalView);
    // 如果有其他需要的查询方法，可以在这里添加
}
