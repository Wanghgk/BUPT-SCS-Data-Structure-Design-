package com.wanghgk.tourbackend.interceptors;

import com.wanghgk.tourbackend.pojo.Result;
import com.wanghgk.tourbackend.utils.JwtUtil;
import com.wanghgk.tourbackend.utils.ThreadLocalUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;

@Component
public class LoginInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //令牌验证
        String token = request.getHeader("Authorization");
        //验证token
        try {
            Map<String, Object> claims = JwtUtil.parseToken(token);



            //把业务数据存储到ThreadLocal中
            ThreadLocalUtil.set(claims);


            return true;//放行
        }catch (Exception e) {
            //未登录，http响应状态码为401
            response.setStatus(401);
            return false;//不放行
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        //清空ThreadLocal中的数据
        ThreadLocalUtil.remove();
    }
}
