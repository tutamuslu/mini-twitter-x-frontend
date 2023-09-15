package com.workintech.twitter.demo.service;
import com.workintech.twitter.demo.entity.Member;
import com.workintech.twitter.demo.repository.MemberRepository;
import com.workintech.twitter.demo.dto.LoginResponse;
import com.workintech.twitter.demo.entity.Role;
import com.workintech.twitter.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class ProfileServiceImpl implements ProfileService {
    private MemberRepository memberRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private TokenServiceImpl tokenService;
    @Autowired
    public ProfileServiceImpl(MemberRepository memberRepository,  RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenServiceImpl tokenService){
        this.memberRepository = memberRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Override
    public Optional<Member> findByUserName(String userName) {

        return memberRepository.findByUserName(userName);

    }


    @Override
    public Member register(Member user) {

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        Role memberRole = roleRepository.findByAuthority("USER").get();
        Set<Role> roles = new HashSet<>();
        roles.add(memberRole);

        user.setPassword(encodedPassword);
        user.setAuthorities(roles);
        return memberRepository.save(user);
    }

    @Override
    public Member logout(int id) {

        return null;
    }

    @Override
    public LoginResponse login(String userName, String password) {
        try{
            Optional<Member> user = memberRepository.findByUserName(userName);
            if(!user.isPresent()){
                return new LoginResponse("", null,false, "Kullanıcı sistemde bulunamadı!");
            }

            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));

            String token = tokenService.generateJwtToken(auth);

            return new LoginResponse(token, user.get(), true, "");
        }catch (Exception ex){
            return new LoginResponse("", null, false, "Kullanıcı adı veya şifre yanlış!!");
        }
    }

}
