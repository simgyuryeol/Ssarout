package com.ssafy.speakerRecognition.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDto<T> {
	private Boolean success;
	private String message;
	private T data;

	public ApiResponseDto(Boolean success, String message) {
		this(success, message, null);
	}
}
