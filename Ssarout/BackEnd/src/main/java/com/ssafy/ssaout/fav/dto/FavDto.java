package com.ssafy.ssaout.fav.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavDto {
    private Long contentId;

    @Override
    public String toString() {
        return "FavDto{" +
                ", contentId=" + contentId +
                '}';
    }
}
