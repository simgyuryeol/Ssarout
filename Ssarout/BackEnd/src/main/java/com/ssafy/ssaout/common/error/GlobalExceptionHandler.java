package com.ssafy.ssaout.common.error;

import com.ssafy.ssaout.common.error.exception.NotFoundException;
import com.ssafy.ssaout.common.error.exception.OAuthProviderMissMatchException;
import com.ssafy.ssaout.common.error.exception.TokenValidFailedException;
import com.ssafy.ssaout.common.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleServerException(Exception e) {
        return handleException(e, ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(OAuthProviderMissMatchException.class)
    public ResponseEntity<ErrorResponse> handleOAuthProviderMissMatchException(
        OAuthProviderMissMatchException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(TokenValidFailedException.class)
    public ResponseEntity<ErrorResponse> handleTokenValidFailedException(
        TokenValidFailedException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
        return handleException(e, e.getErrorCode());
    }

    private ResponseEntity<ErrorResponse> handleException(Exception e, ErrorCode errorCode) {
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }
}
