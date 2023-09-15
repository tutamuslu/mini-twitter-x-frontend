package com.workintech.twitter.demo.dto;

import com.workintech.twitter.demo.entity.Member;

public class RegisterResponse extends ResponseBase {
    private Member member;

    public RegisterResponse(Member member, boolean isSuccess, String errorMessage) {
        super(isSuccess, errorMessage);
        this.member = member;
    }

    public Member getMember() {
        return member;
    }
}
