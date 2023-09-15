package com.workintech.twitter.demo.validation;

import com.workintech.twitter.demo.dto.TweetRequest;
import com.workintech.twitter.demo.dto.TweetResponse;
import com.workintech.twitter.demo.entity.Tweet;

public class TweetValidation {
    public static TweetResponse controlId(int id){
        if(id <= 0){
            return new TweetResponse(null, false, "Id 1den küçük olamaz.");
        }
        return null;
    }
    public static TweetResponse controlSave(TweetRequest tweetRequest){
        if(tweetRequest.getContent() == null || tweetRequest.getContent().isEmpty()){
            return new TweetResponse(null, false, "Tweet içeriği boş olamaz!");
        }
        if(tweetRequest.getTweetDate() == null){
            return new TweetResponse(null, false, "Tweet tarihi boş olamaz!");
        }
        return null;
    }
}
