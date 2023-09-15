package com.workintech.twitter.demo.repository;

import com.workintech.twitter.demo.entity.Like;
import com.workintech.twitter.demo.entity.Member;
import com.workintech.twitter.demo.entity.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {

    @Query("SELECT l FROM Like l WHERE l.tweetId = :tweetId")
    List<Like> selectByTweetId(Tweet tweetId);

    @Query("select a from Like a where a.tweetId = :tweetId and a.userId = :userId")
    Optional<Like> selectLikeByUserAndTweet(Tweet tweetId, Member userId);
}
