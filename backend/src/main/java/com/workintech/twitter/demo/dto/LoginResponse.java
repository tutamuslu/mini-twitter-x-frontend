package com.workintech.twitter.demo.dto;

import com.workintech.twitter.demo.entity.Member;

public class LoginResponse extends ResponseBase{
    private String token;
    private Member user;

    public LoginResponse(String token, Member user, boolean isSuccess, String errorMessage) {
        super(isSuccess, errorMessage);
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public Member getUser() {
        return user;
    }

}
