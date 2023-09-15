package com.workintech.twitter.demo.dto;

import com.workintech.twitter.demo.entity.Tweet;

public class TweetResponse extends ResponseBase{
    private Tweet tweet;
    public TweetResponse(Tweet tweet, boolean isSuccess, String errorMessage) {
        super(isSuccess, errorMessage);
        this.tweet = tweet;
    }

    public Tweet getTweet() {
        return tweet;
    }
}
