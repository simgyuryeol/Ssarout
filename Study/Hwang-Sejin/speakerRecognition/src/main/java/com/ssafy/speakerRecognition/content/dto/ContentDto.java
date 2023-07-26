package com.ssafy.speakerRecognition.content.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContentDto {
    private Long contentId;
    private String title;
    private String name;
    private String text;
    private String visualFile;

    public ContentDto(Long contentId, String title, String name, String visualFile){
        this.contentId = contentId;
        this.title = title;
        this.name = name;
        this.visualFile = visualFile;
    }
    ContentDto(String title, String name, String text,String visualFile){
        this.title = title;
        this.name = name;
        this.text = text;
        this.visualFile = visualFile;
    }
}
