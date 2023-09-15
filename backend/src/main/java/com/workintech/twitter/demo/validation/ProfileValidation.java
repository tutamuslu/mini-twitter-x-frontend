package com.workintech.twitter.demo.validation;

import com.workintech.twitter.demo.dto.LoginRequest;
import com.workintech.twitter.demo.dto.LoginResponse;
import com.workintech.twitter.demo.dto.RegisterResponse;
import com.workintech.twitter.demo.entity.Member;

public class ProfileValidation {
    public static RegisterResponse validateRegister(Member member){
        if(member == null){
            return new RegisterResponse(null, false, "User bilgisi null olamaz");
        }
        if(member.getFullName() == null || member.getFullName().isEmpty()){
            return new RegisterResponse(null, false, "Kullanıcı ismi boş olamaz");
        }
        if(member.getUsername() == null || member.getUsername().isEmpty()){
            return new RegisterResponse(null, false, "Kullanıcı adı boş olamaz");
        }
        if(member.getEmail() == null || member.getEmail().isEmpty()){
            return new RegisterResponse(null, false, "Email boş olamaz");
        }
        if(member.getPassword() == null || member.getPassword().isEmpty()){
            return new RegisterResponse(null, false, "Şifre boş olamaz");
        }
        if(member.getBirthDate() == null){
            return new RegisterResponse(null, false, "Doğrum tarihi boş olamaz");
        }
        return null;
    }

    public static LoginResponse validateLogin(LoginRequest loginRequest){
        if(loginRequest == null){
            return new LoginResponse("", null, false, "Login inputu null olamaz");
        }
        if(loginRequest.getUser() == null || loginRequest.getUser().isEmpty()){
            return new LoginResponse("",null, false, "Kullanıcı adı girilmelidir!");
        }
        if(loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()){
            return  new LoginResponse("",null, false, "Şifre girilmelidir!");
        }
        return null
                ;
    }
}
