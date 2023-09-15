package com.workintech.twitter.demo.repository;

import com.workintech.twitter.demo.entity.Retweet;
import com.workintech.twitter.demo.entity.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RetweetRepository extends JpaRepository<Retweet, Integer> {
    @Query("select a from Retweet a where a.tweetId = :tweetId")
    List<Retweet> selectByTweetId(Tweet tweetId);

}
