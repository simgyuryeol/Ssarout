package com.ssafy.ssaout.result.dto.response;

import com.ssafy.ssaout.result.domain.Result;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ResultDetailResponseDto {

    private final Integer accuracy;
    private final LocalDateTime createdDateTime;

    public ResultDetailResponseDto(Result result) {
        this.accuracy = result.getAccuracy();
        this.createdDateTime = result.getCreatedDateTime();
    }
}
