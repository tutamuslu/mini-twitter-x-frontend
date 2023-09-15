package com.workintech.twitter.demo.service;

import com.workintech.twitter.demo.dto.CommentRequest;
import com.workintech.twitter.demo.dto.TweetRequest;
import com.workintech.twitter.demo.dto.TweetResponse;
import com.workintech.twitter.demo.entity.*;
import com.workintech.twitter.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TweetServiceImpl implements TweetService{

    private TweetRepository tweetRepository;
    private CommentRepository commentRepository;
    private LikeRepository likeRepository;
    private RetweetRepository retweetRepository;
    private MemberRepository memberRepository;

    @Autowired
    public TweetServiceImpl(TweetRepository tweetRepository, CommentRepository commentRepository, LikeRepository likeRepository, RetweetRepository retweetRepository, MemberRepository memberRepository){
        this.tweetRepository = tweetRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
        this.retweetRepository = retweetRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public List<Tweet> getAll() {

        return tweetRepository.findAll();
    }

    @Override
    public Optional<Tweet> getById(int id) {
        return tweetRepository.findById(id);
    }

    @Override
    public TweetResponse newTweet(TweetRequest tweetRequest) {

        Optional<Member> member = memberRepository.findById(tweetRequest.getUserId());

        if(!member.isPresent()){
            return new TweetResponse(null, false, "Kullanıcı bulunamadı!!");
        }

        Tweet tweet = new Tweet();
        tweet.setUserId(member.get());
        tweet.setContent(tweetRequest.getContent());
        tweet.setTweetDate(tweetRequest.getTweetDate());
        Tweet tweet1 = tweetRepository.save(tweet);
        return new TweetResponse(tweet1, true, "");
    }

    @Override
    public TweetResponse update(int id, TweetRequest tweetRequest) {
        Optional<Tweet> tweet1 = tweetRepository.findById(id);
        if(tweet1.isPresent()){
            Optional<Member> member = memberRepository.findById(tweetRequest.getUserId());
            if(!member.isPresent()){
                return new TweetResponse(null, false, "Kullanıcı Bulunamadı!");
            }
            if(tweet1.get().getUserId().getId() != tweetRequest.getUserId()){
                return new TweetResponse(null, false, "Size ait olmayan tweeti güncelleyemezsiniz!!");
            }
            tweet1.get().setContent(tweetRequest.getContent());
            Tweet tweet2 = tweetRepository.save(tweet1.get());
            return new TweetResponse(tweet2, true, "");
        }
        else{
            return new TweetResponse(null, false, "Tweet bulunamadı!!");
        }

    }

    @Override
    public TweetResponse delete(int id, int userId) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(tweet.isPresent()){
            Optional<Member> member = memberRepository.findById(userId);
            if(!member.isPresent()){
                return new TweetResponse(null, false, "Kullanıcı Bulunamadı!");
            }
            if(tweet.get().getUserId().getId() != userId){
                return new TweetResponse(null, false, "Size ait olmayan tweeti silemezsiniz!!");
            }
            // likeları sil
            List<Like> likes = likeRepository.selectByTweetId(tweet.get());
            likeRepository.deleteAll(likes);
            // yorumları sil
            List<Comment> comments = commentRepository.selectByTweetId(tweet.get());
            commentRepository.deleteAll(comments);
            // retwetleri sil
            List<Retweet> retweets = retweetRepository.selectByTweetId(tweet.get());
            retweetRepository.deleteAll(retweets);
            tweetRepository.deleteById(id);
            return new TweetResponse(null , true, "");
        }
        return new TweetResponse(null, false, "Tweet Bulunamadı!");
    }

    @Override
    public TweetResponse like(int id, int userId) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(tweet.isPresent()){
            Optional<Member> member = memberRepository.findById(userId);
            Optional<Like> like = likeRepository.selectLikeByUserAndTweet(tweet.get(), member.get());
            // gönderiyi bu kullanıcı beğmemişse devam etmeli
            if(!like.isPresent()){
                if(member.isPresent()){
                    Like newLike = new Like();
                    newLike.setLikeDate(new Date());
                    newLike.setUserId(member.get());
                    newLike.setTweetId(tweet.get());
                    likeRepository.save(newLike);
                    // yorum sayısını arttırdım
                    tweet.get().setLikeCount(tweet.get().getLikeCount() + 1);
                    tweetRepository.save(tweet.get());
                    return new TweetResponse(tweet.get(), true, "");
                }else{
                    return new TweetResponse(null, false, "Kullanıcı bulunamadı!!");
                }
            }
            else{
                return new TweetResponse(null, false, "Bu tweeti zaten beğendin !");
            }

        }
        return new TweetResponse(null, false, "Tweet beğenilemedi!");
    }

    @Override
    public TweetResponse disLike(int id, int userId) {

        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(tweet.isPresent()){
            Optional<Member> member = memberRepository.findById(userId);
            Optional<Like> like = likeRepository.selectLikeByUserAndTweet(tweet.get(), member.get());
            if(like.isPresent()){
                likeRepository.delete(like.get());
                // uorum sayısını azalttım
                tweet.get().setLikeCount(tweet.get().getLikeCount() - 1);
                tweetRepository.save(tweet.get());
                return new TweetResponse(tweet.get(), true, "");
            }else {
                return new TweetResponse(null, false, "Like bulunamadı!!");
            }
        }
        return new TweetResponse(null, false, "Tweet silinemedi!");
    }

    @Override
    public TweetResponse retweet(int id, int userId) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(!tweet.isPresent()) {
        return new TweetResponse(null, false, "Tweet bulunamadı!");
        }
        Optional<Member> member = memberRepository.findById(userId);
        if(!member.isPresent())
        {
            return new TweetResponse(null, false, "Kullanıcı bulunamadı!");
        }

        Retweet retweet = new Retweet();
        retweet.setRetweetDate(new Date());
        retweet.setUserId(member.get());
        retweet.setTweetId(tweet.get());

        retweetRepository.save(retweet);

        // retweet sayısını arttırdım
        tweet.get().setRetweetCount(tweet.get().getRetweetCount() + 1);
        tweetRepository.save(tweet.get());

        return new TweetResponse(tweet.get(), true, "");
    }

    @Override
    public TweetResponse newComment(int id, CommentRequest commentRequest) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(!tweet.isPresent()){
            return new TweetResponse(null, true, "Tweet bulunamadı!");
        }
        Optional<Member> member = memberRepository.findById(commentRequest.getUserId());
        if(!member.isPresent())
        {
            return new TweetResponse(null, false, "Kullanıcı bulunamadı!");
        }
        Comment comment = new Comment();
        comment.setUserId(member.get());
        comment.setCommentDate(new Date());
        comment.setContent(commentRequest.getComment());
        comment.setTweetId(tweet.get());
        commentRepository.save(comment);

        // yorum saysıını arttırdım
        tweet.get().setCommentCount(tweet.get().getCommentCount() + 1);
        tweetRepository.save(tweet.get());

        return new TweetResponse(tweet.get(), true, "");
    }

    @Override
    public TweetResponse deleteComment(int id, CommentRequest commentRequest) {
        Optional<Tweet> tweet = tweetRepository.findById(id);
        if(!tweet.isPresent()){
            return new TweetResponse(null, true, "Tweet bulunamadı!");
        }
        Optional<Member> member = memberRepository.findById(commentRequest.getUserId());
        if(!member.isPresent())
        {
            return new TweetResponse(null, false, "Kullanıcı bulunamadı!");
        }
        Optional<Comment> comment = commentRepository.findById(id);
        if(!comment.isPresent())
        {
            return new TweetResponse(null, false, "Yorum bulunamadı!");
        }
        commentRepository.delete(comment.get());

        // yorum saysıını azalttım
        tweet.get().setCommentCount(tweet.get().getCommentCount() - 1);
        tweetRepository.save(tweet.get());

        return new TweetResponse(tweet.get(), true, "");
    }
}
