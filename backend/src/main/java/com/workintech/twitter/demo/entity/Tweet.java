package com.workintech.twitter.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tweet", schema = "twitter_app")
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "tweet_user_id")
    private Member userId;

    @Column(name = "content")
    private String content;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "retweet_count")
    private int retweetCount;

    @Column(name = "comment_count")
    private int commentCount;

    @Column(name = "tweet_date")
    private Date tweetDate;

    @OneToMany(mappedBy = "tweetId")
    private Set<Like> likes;

    @OneToMany(mappedBy = "tweetId")
    private Set<Comment> comments;

}
