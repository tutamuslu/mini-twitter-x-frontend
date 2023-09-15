package com.workintech.twitter.demo.repository;

import com.workintech.twitter.demo.entity.Comment;
import com.workintech.twitter.demo.entity.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("select a from Comment a where a.tweetId = :tweetId")
    List<Comment> selectByTweetId(Tweet tweetId);
}
