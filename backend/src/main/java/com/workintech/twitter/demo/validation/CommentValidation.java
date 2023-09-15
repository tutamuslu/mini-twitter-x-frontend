package com.workintech.twitter.demo.validation;

import com.workintech.twitter.demo.dto.CommentRequest;
import com.workintech.twitter.demo.dto.TweetResponse;

public class CommentValidation {
    public static TweetResponse checkAddComment(CommentRequest commentRequest){
        if(commentRequest == null){
            return new TweetResponse(null, false, "Yorum işlemi boş olamaz");
        }
        if(commentRequest.getUserId() <= 0){
            return new TweetResponse(null, false, "Kullanıcı ID si 1den kücük olamaz");
        }
        if(commentRequest.getComment() == null || commentRequest.getComment().isEmpty()){
            return new TweetResponse(null, false, "Yorum içeriği boş olamaz");

        }
        return null;
    }

    public static TweetResponse checkDeleteComment(CommentRequest commentRequest){
        if(commentRequest == null){
            return new TweetResponse(null, false, "Yorum işlemi boş olamaz");
        }
        if(commentRequest.getUserId() <= 0){
            return new TweetResponse(null, false, "Kullanıcı ID si 1den kücük olamaz");
        }
        return null;
    }
}
