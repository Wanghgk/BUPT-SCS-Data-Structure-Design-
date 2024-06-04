package  com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Article;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
import java.util.Map;

@Mapper
public interface ArticleMapper {

    @Select("select * from article where create_user=#{userId}")
    List<Article> myAllList(Integer userId);

    //新增
    @Insert("insert into article(title,content,cover_img,category_id,create_user,create_time,update_time) values(#{title},#{content},#{coverImg},#{categoryId},#{createUser},#{createTime},#{updateTime})")
    void add(Article article);


    List<Article> list(Integer userId, Integer categoryId);

    @Select("select * from article where id=#{id}")
    Article findById(Integer id);

    List<Article> recommend(Map<String, Object> params);

    List<Article> searchByTitle(String title);

    @Update("update article set total_score=#{totalScore},total_user=#{totalUser} where id=#{id}")
    void scoreArtical(Integer id, Integer totalScore, Integer totalUser);

    @Update("update article set total_view=#{view} where id=#{id}")
    void viewArtical(Integer id,Integer view);
}