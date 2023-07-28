package com.ssafy.ssaout.common.error;

import java.util.Collections;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(500, "서버에 문제가 생겼습니다."),
    INVALID_REFRESH_TOKEN(500, "Invalid refresh token."),
    INVALID_ACCESS_TOKEN(500, "Invalid access token."),
    NOT_EXPIRED_TOKEN_YET(500, "Not expired token yet."),
    OAUTH_PROVIDER_MISMATCH(500, "기존에 가입된 SNS 계정이 있습니다. 해당 계정을 이용해주세요."),
    FAIL_TOKEN_GENERATION(500, "Failed to generate Token.");


    private int status;
    private String message;

    private static final Map<String, ErrorCode> messageMap = Collections.unmodifiableMap(
        Stream.of(values()).collect(
            Collectors.toMap(ErrorCode::getMessage, Function.identity())));

    public static ErrorCode fromMessage(String message) {
        return messageMap.get(message);
    }
}
