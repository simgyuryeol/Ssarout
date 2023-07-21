package com.ssafy.triptube.support.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponseUtil {

	public static <T> ResponseEntity<ApiResponseDto<T>> createResponse(Boolean success, String message, T data) {
		ApiResponseDto<T> apiResponse = new ApiResponseDto<>(success, message, data);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}

	public static <T> ResponseEntity<ApiResponseDto<T>> createResponse(Boolean success, String message) {
		ApiResponseDto<T> apiResponse = new ApiResponseDto<>(success, message, null);
		return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
	}
}
