package com.ssafy.speakerRecognition.content.service;

import com.ssafy.speakerRecognition.content.dto.ContentDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContentImpl implements ContentService{
    @Override
    public List<ContentDto> getList(String type) {
        List<ContentDto> list = new ArrayList<>();

        if(type.equals("A1") ){
            System.out.println("들어옴");
            list.add(new ContentDto(1L,"유인나","음성1","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(2L,"유인나","음성2","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(3L,"유인나","음성3","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(4L,"유인나","음성4","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(5L,"유인나","음성5","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(6L,"유인나","음성6","https://picsum.photos/id/237/200/300"));
        }
        else if(type.equals("A2") ){
            list.add(new ContentDto(7L,"배철수","음성1","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(8L,"배철수","음성2","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(9L,"배철수","음성3","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(10L,"배철수","음성4","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(11L,"배철수","음성5","https://picsum.photos/id/237/200/300"));
            list.add(new ContentDto(12L,"배철수","음성6","https://picsum.photos/id/237/200/300"));
        }
        return list;
    }

    @Override
    public ContentDto getDetail(Long content) {
        return null;
    }
}
