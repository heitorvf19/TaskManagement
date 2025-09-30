package br.com.heitorviana.projeto_trainee.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.heitorviana.projeto_trainee.models.Task;
import br.com.heitorviana.projeto_trainee.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Object> createTask(@RequestBody Task task) {
        try {
            Task newTask = taskService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/lists/{listId}")
    public ResponseEntity<Object> getTasksByListId(@PathVariable Long listId) {
        try {
            List<Task> tasks = taskService.getTasksByListId(listId);
            return ResponseEntity.status(HttpStatus.OK).body(tasks);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTaskById(@PathVariable Long id) {
        Optional<Task> taskID = taskService.getTaskById(id);

        if (taskID.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(taskID.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarefa não encontrada.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        try {
            Task updatedTask = taskService.updateTask(id, taskDetails);
            return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
