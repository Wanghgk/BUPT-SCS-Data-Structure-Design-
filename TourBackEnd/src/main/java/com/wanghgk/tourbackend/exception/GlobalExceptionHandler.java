package com.wanghgk.tourbackend.exception;

import com.wanghgk.tourbackend.pojo.Result;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Result handleException(Exception e) {
        e.printStackTrace();
        return Result.err(StringUtils.hasLength(e.getMessage()) ? e.getMessage() : "操作失败");
    }
}
