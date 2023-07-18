package com.chris.backend;

import org.springframework.data.repository.ListCrudRepository;

public interface TaskRepository extends ListCrudRepository<Task, Integer> {
}
