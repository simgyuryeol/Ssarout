package com.ssafy.ssaout.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDto {
    public UserInfoDto() {
    }

    public UserInfoDto(String nickname, String profileImageUrl) {
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    private String nickname;
    private String profileImageUrl;
}
