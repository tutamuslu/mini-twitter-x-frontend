package com.workintech.twitter.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "comment", schema = "twitter_app")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "tweet_id")
    private Tweet tweetId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member userId;

    @Column(name = "content")
    private String content;

    @Column(name = "comment_date")
    private Date commentDate;
}
