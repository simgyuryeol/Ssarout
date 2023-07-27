package com.ssafy.ssaout.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    private int status;
    private String code;
    private String message;
}
