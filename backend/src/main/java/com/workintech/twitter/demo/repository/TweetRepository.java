package com.workintech.twitter.demo.repository;

import com.workintech.twitter.demo.entity.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TweetRepository  extends JpaRepository<Tweet, Integer> {
}
