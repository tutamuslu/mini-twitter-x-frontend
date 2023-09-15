package com.workintech.twitter.demo.service;

import com.workintech.twitter.demo.dto.LoginResponse;
import com.workintech.twitter.demo.entity.Member;

import java.util.Optional;

public interface ProfileService {
    Optional<Member> findByUserName(String userName);
    Member register(Member user);
    Member logout(int id);
    LoginResponse login(String userName, String password);
}
