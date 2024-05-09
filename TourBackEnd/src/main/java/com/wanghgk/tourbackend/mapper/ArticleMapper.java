package  com.wanghgk.tourbackend.mapper;

import com.wanghgk.tourbackend.pojo.Article;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ArticleMapper {

    //新增
    @Insert("insert into article(title,content,cover_img,category_id,create_user,create_time,update_time) values(#{title},#{content},#{coverImg},#{categoryId},#{createUser},#{createTime},#{updateTime})")
    void add(Article article);


    List<Article> list(Integer userId, Integer categoryId);

    @Select("select * from article where id=#{id}")
    Article findById(Integer id);
}