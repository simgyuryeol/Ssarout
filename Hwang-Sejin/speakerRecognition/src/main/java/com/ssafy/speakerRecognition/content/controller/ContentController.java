package com.ssafy.speakerRecognition.content.controller;

import com.ssafy.speakerRecognition.content.dto.ContentDto;
import com.ssafy.speakerRecognition.content.service.ContentService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.speakerRecognition.web.ApiResponseUtil.createResponse;

@RestController
@RequestMapping("/api/v1/content")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContentController {
    @Autowired
    ContentService contentService;

    @GetMapping()
    @ApiOperation(value = "모창 성대모사 선택")
    @ApiImplicitParam(name = "type", value ="모창 - 'A1' , 성대모사 - 'A2'", dataType = "String")
    public ResponseEntity<?> getList(String type) {
        List<ContentDto> list= contentService.getList(type);
        return createResponse(true,"리스트 받기 성공", list);
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<?> getDetail(@PathVariable Long contentId) {
        List<ContentDto> list1= contentService.getList("A1");
        List<ContentDto> list2= contentService.getList("A2");

        ContentDto content = new ContentDto();
        for(ContentDto c : list1){
            if(c.getContentId() == contentId){
                content = c;
            }
        }
        for(ContentDto c : list2){
            if(c.getContentId() == contentId){
                content = c;
            }
        }

        content.setContentId(null);
        content.setText("텍스트 입니다");
        return createResponse(true,"컨텐츠 디테일 받기 성공", content);
    }

}
