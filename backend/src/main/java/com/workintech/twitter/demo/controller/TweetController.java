package com.workintech.twitter.demo.controller;

import com.workintech.twitter.demo.dto.CommentRequest;
import com.workintech.twitter.demo.dto.TweetRequest;
import com.workintech.twitter.demo.dto.TweetResponse;
import com.workintech.twitter.demo.entity.Tweet;
import com.workintech.twitter.demo.service.TweetService;
import com.workintech.twitter.demo.validation.CommentValidation;
import com.workintech.twitter.demo.validation.TweetValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tweet")
public class TweetController {

    private TweetService tweetService;

    @Autowired
    public TweetController(TweetService tweetService){
        this.tweetService = tweetService;
    }
    @GetMapping("/")
    public List<Tweet> getAll(){
        return tweetService.getAll();
    }
    @GetMapping("/{id}")
    public TweetResponse getById(@PathVariable int id){
        TweetResponse idValidation = TweetValidation.controlId(id);
        if(idValidation != null){
            return idValidation;
        }
        Optional<Tweet> tweet = tweetService.getById(id);
        if(tweet.isPresent()){
            return  new TweetResponse(tweet.get(), true, "");
        }else{
            return new TweetResponse(null, false, "Tweet bulunamadı!");
        }
    }

    @PostMapping("/")
    public TweetResponse add(@RequestBody TweetRequest tweetRequest){
        TweetResponse validate = TweetValidation.controlSave(tweetRequest);
        if(validate != null){
            return validate;
        }
        TweetResponse tweetResponse = tweetService.newTweet(tweetRequest);
        return tweetResponse;
    }

    @PutMapping("/{id}")
    public TweetResponse update(@PathVariable int id, @RequestBody TweetRequest tweetRequest){
        TweetResponse validate = TweetValidation.controlId(tweetRequest.getUserId());
        if(validate != null){
            return validate;
        }

        TweetResponse tweetResponse = tweetService.update(id, tweetRequest);

        return tweetResponse;
    }

    @DeleteMapping("/{id}/{userId}")
    public TweetResponse delete(@PathVariable int id, @PathVariable int userId){
        TweetResponse idValidation = TweetValidation.controlId(id);
        if(idValidation != null){
            return idValidation;
        }
        TweetResponse tweetResponse = tweetService.delete(id, userId);
        return tweetResponse;
    }

    @PostMapping("/like/{id}")
    public TweetResponse like(@PathVariable int id, @RequestBody TweetRequest tweetRequest){
        TweetResponse idValidation = TweetValidation.controlId(id);
        if(idValidation != null){
            return idValidation;
        }

        return tweetService.like(id, tweetRequest.getUserId());
    }

    @DeleteMapping("/like/{id}")
    public TweetResponse disLike(@PathVariable int id, @RequestBody TweetRequest tweetRequest){
        TweetResponse idValidation = TweetValidation.controlId(id);
        if(idValidation != null){
            return idValidation;
        }

        return tweetService.disLike(id, tweetRequest.getUserId());
    }

    @PostMapping("/retweet/{id}")
    public TweetResponse retweet(@PathVariable int id, @RequestBody TweetRequest tweetRequest){
        TweetResponse idValidation = TweetValidation.controlId(id);
        if(idValidation != null){
            return idValidation;
        }
        TweetResponse idValidation2 = TweetValidation.controlId(tweetRequest.getUserId());
        if(idValidation2 != null){
            return idValidation2;
        }
        TweetResponse tweetResponse = tweetService.retweet(id, tweetRequest.getUserId());
        return tweetResponse;
    }

    @PostMapping("/reply/{id}")
    public TweetResponse addComment(@PathVariable int id, @RequestBody CommentRequest commentRequest){
        TweetResponse idValidation = CommentValidation.checkAddComment(commentRequest);
        if(idValidation != null){
            return idValidation;
        }
        TweetResponse tweetResponse = tweetService.newComment(id, commentRequest);
        return tweetResponse;
    }

    @DeleteMapping("/reply/{id}")
    public TweetResponse deleteComment(@PathVariable int id, @RequestBody CommentRequest commentRequest){
        TweetResponse idValidation = CommentValidation.checkDeleteComment(commentRequest);
        if(idValidation != null){
            return idValidation;
        }
        TweetResponse tweetResponse = tweetService.deleteComment(id, commentRequest);
        return tweetResponse;
    }
}
