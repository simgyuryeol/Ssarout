package com.ssafy.speakerRecognition.content.service;

import com.ssafy.speakerRecognition.content.dto.ContentDto;

import java.util.List;

public interface ContentService {
    List<ContentDto> getList(String type);
    ContentDto getDetail(Long content);
}
