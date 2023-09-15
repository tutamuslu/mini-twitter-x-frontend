package com.workintech.twitter.demo.dto;

import lombok.Data;

@Data
public class CommentRequest {
    private int userId;
    private String comment;
}
