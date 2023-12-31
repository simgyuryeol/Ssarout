package com.ssafy.ssaout.common.error.exception;

import com.ssafy.ssaout.common.error.ErrorCode;
import lombok.Getter;

@Getter
public class AWSException extends RuntimeException {

    private final ErrorCode errorCode;

    public AWSException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
