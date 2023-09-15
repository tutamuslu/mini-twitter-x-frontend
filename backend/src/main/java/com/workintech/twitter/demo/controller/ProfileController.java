package com.workintech.twitter.demo.controller;

import com.workintech.twitter.demo.dto.LoginRequest;
import com.workintech.twitter.demo.dto.LoginResponse;
import com.workintech.twitter.demo.dto.RegisterResponse;
import com.workintech.twitter.demo.entity.Member;
import com.workintech.twitter.demo.service.ProfileService;
import com.workintech.twitter.demo.validation.ProfileValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private ProfileService profileService;
    @Autowired
    public ProfileController(ProfileService profileService){
        this.profileService = profileService;
    }

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody Member member){
        // genel validasyon
        RegisterResponse validation = ProfileValidation.validateRegister(member);
        if(validation != null){
            return validation;
        }
        // kullanıcı adı daha önce kullanılmış mı?
        String deneme = member.getUsername();
        Optional<Member> isRegistered = profileService.findByUserName(deneme);
        if(isRegistered.isPresent()){
            return new RegisterResponse(null, false, "Kullanıcı adı zaten kullanılmaktadır!");
        }
        member.setRegisterDate(new Date());
        profileService.register(member);
        return new RegisterResponse(member, true, "");
    }

    @PostMapping("/logout")
    public boolean logout(){
        return true;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        LoginResponse validate = ProfileValidation.validateLogin(loginRequest);
        if(validate != null){
            return validate;
        }

        Optional<Member> member = profileService.findByUserName(loginRequest.getUser());
        if(!member.isPresent()){
            return new LoginResponse("", null, false, "Kullanıcı sistemde bulunamadı!");
        }

        LoginResponse loginResponse = profileService.login(loginRequest.getUser(), loginRequest.getPassword());
        return loginResponse;
    }
}
