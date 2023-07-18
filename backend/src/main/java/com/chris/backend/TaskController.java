package com.chris.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/task")
@CrossOrigin
public class TaskController {

    private final TaskRepository repository;

    @Autowired
    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping("")
    public List<Task> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Task findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Content nod found"));
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    public void create(@RequestBody Task task) {
        repository.save(task);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{id}")
    public void update(@RequestBody Task task, @PathVariable Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND ,"Content not found");
        }
        repository.deleteById(id);
        repository.save(task);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
