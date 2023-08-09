package com.ssafy.ssaout.common.error;

import com.ssafy.ssaout.common.error.exception.AWSException;
import com.ssafy.ssaout.common.error.exception.ConflictException;
import com.ssafy.ssaout.common.error.exception.ConnectionException;
import com.ssafy.ssaout.common.error.exception.InvalidRequestException;
import com.ssafy.ssaout.common.error.exception.JsonException;
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

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflictException(ConflictException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(AWSException.class)
    public ResponseEntity<ErrorResponse> handleAWSException(AWSException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRequestException(InvalidRequestException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(ConnectionException.class)
    public ResponseEntity<ErrorResponse> handleConnectionException(ConnectionException e) {
        return handleException(e, e.getErrorCode());
    }

    @ExceptionHandler(JsonException.class)
    public ResponseEntity<ErrorResponse> handleJsonException(JsonException e) {
        return handleException(e, e.getErrorCode());
    }

    private ResponseEntity<ErrorResponse> handleException(Exception e, ErrorCode errorCode) {
        ErrorResponse errorResponse = ErrorResponse.of(errorCode);
        return ResponseEntity.status(errorResponse.getStatus()).body(errorResponse);
    }
}
