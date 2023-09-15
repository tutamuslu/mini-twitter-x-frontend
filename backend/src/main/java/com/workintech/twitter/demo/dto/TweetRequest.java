package com.workintech.twitter.demo.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TweetRequest {
    private int tweetId;
    private int userId;
    private String content;
    private Date tweetDate;
}
