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
    FAIL_UNLINKING_KAKAO_ACCOUNT(500, "카카오 계정의 연결을 끊는데 실패했습니다."),
    FAIL_TOKEN_GENERATION(500, "Failed to generate Token."),
    CONFLICT_RESOURCE(409, "중복된 값이 있습니다. 다시 입력해주세요"),

    USER_NOT_FOUND(404, "해당 유저를 찾을 수 없습니다."),
    SONG_NOT_FOUND(404, "해당 노래를 찾을 수 없습니다."),

    AMAZON_S3_ERROR(500, "AWS S3와의 통신에 문제가 생겼습니다."),

    INVALID_AI_COVER_REQUEST_CONDITION(400, "AI 커버를 요청하기 위해선 최소 10개의 개별곡에 대한 녹음이 완료되어야 합니다."),
    AI_COVER_NOT_FOUND(404, "해당 AI 커버곡을 찾을 수 없습니다."),
    FAIL_CONNECTING_AI_SERVER(500, "AI 서버와의 통신에 문제가 생겼습니다."),
    FAIL_CONVERT_TO_JSON(500, "AI 서버에 요청하기 위한 데이터 변환에 실패했습니다.");

    private int status;
    private String message;

    private static final Map<String, ErrorCode> messageMap = Collections.unmodifiableMap(
        Stream.of(values()).collect(
            Collectors.toMap(ErrorCode::getMessage, Function.identity())));

    public static ErrorCode fromMessage(String message) {
        return messageMap.get(message);
    }
}
