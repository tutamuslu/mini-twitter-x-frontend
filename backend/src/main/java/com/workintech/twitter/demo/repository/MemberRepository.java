package com.workintech.twitter.demo.repository;

import com.workintech.twitter.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    @Query("SELECT a FROM Member a WHERE a.userName = :userName")
    Optional<Member> findByUserName(String userName);

}
