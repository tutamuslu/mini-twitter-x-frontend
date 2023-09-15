package com.workintech.twitter.demo.service;

import com.workintech.twitter.demo.dto.CommentRequest;
import com.workintech.twitter.demo.dto.TweetRequest;
import com.workintech.twitter.demo.dto.TweetResponse;
import com.workintech.twitter.demo.entity.Comment;
import com.workintech.twitter.demo.entity.Tweet;

import java.util.List;
import java.util.Optional;

public interface TweetService {
    List<Tweet> getAll();
    Optional<Tweet> getById(int id);
    TweetResponse newTweet(TweetRequest tweet);
    TweetResponse update(int id, TweetRequest tweet);
    TweetResponse delete(int id, int userId);
    TweetResponse like(int id, int userId);
    TweetResponse disLike(int id, int userId);
    TweetResponse retweet(int id, int userId);
    TweetResponse newComment(int id, CommentRequest commentRequest);
    TweetResponse deleteComment(int id, CommentRequest commentRequest);
}
