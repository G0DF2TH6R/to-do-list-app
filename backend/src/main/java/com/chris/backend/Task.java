package com.chris.backend;

import org.springframework.data.annotation.Id;

import java.sql.Date;

public record Task(
        @Id
        Integer id,
        String title,
        String description,
        Date date,
        String priority
) {
}
