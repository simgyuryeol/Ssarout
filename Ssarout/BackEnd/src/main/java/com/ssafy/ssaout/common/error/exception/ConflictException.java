package com.ssafy.ssaout.common.error.exception;

import com.ssafy.ssaout.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class ConflictException extends RuntimeException {

    private final ErrorCode errorCode;

    public ConflictException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
