package br.com.heitorviana.projeto_trainee.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.heitorviana.projeto_trainee.models.Lista;
import br.com.heitorviana.projeto_trainee.models.Task;
import br.com.heitorviana.projeto_trainee.repositories.ListaRepository;
import br.com.heitorviana.projeto_trainee.repositories.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ListaRepository listaRepository;

    public Task createTask(Task task) {
        if (task.getList() == null || task.getList().getId() == null) {
            throw new IllegalArgumentException("listID não pode ser nulo.");
        }

        Optional<Lista> listaID = listaRepository.findById(task.getList().getId());
        if (!listaID.isPresent()) {
            throw new IllegalArgumentException("Lista com o ID informado não existe.");
        }
        
        task.setList(listaID.get());

        if (task.getExpectedFinishDate() != null && task.getExpectedFinishDate().before(new Date())) {
            throw new IllegalArgumentException("A data de finalização deve ser no futuro.");
        }

        return taskRepository.save(task);
    }

    public List<Task> getTasksByListId(Long listId) {
        Optional<Lista> listaID = listaRepository.findById(listId);
        if (!listaID.isPresent()) {
            throw new IllegalArgumentException("Lista com o ID informado não existe.");
        }
        
        return taskRepository.findByListId(listId);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> taskID = taskRepository.findById(id);

        if (!taskID.isPresent()) {
            throw new IllegalArgumentException("Tarefa com o ID informado não existe.");
        }

        Task updatedTask = taskID.get();

        if (taskDetails.getName() != null) {
            updatedTask.setName(taskDetails.getName());
        }

        if (taskDetails.getDescription() != null) {
            updatedTask.setDescription(taskDetails.getDescription());
        }

        if (taskDetails.getPriority() != null) {
            updatedTask.setPriority(taskDetails.getPriority());
        }

        if (taskDetails.getExpectedFinishDate() != null) {
            
            updatedTask.setExpectedFinishDate(taskDetails.getExpectedFinishDate());
        }

        if (taskDetails.getIsFinished() != null) {
        updatedTask.setIsFinished(taskDetails.getIsFinished());
    }

        if (taskDetails.getList() != null && taskDetails.getList().getId() != null) {
            Optional<Lista> listID = listaRepository.findById(taskDetails.getList().getId());
            if (!listID.isPresent()) {
                throw new IllegalArgumentException("Lista com o ID informado para a atualização não existe.");
            }
            updatedTask.setList(listID.get());
        }

        return taskRepository.save(updatedTask);
    }

    public void deleteTask(Long id) {
        Optional<Task> taskID = taskRepository.findById(id);

        if (!taskID.isPresent()) {
            throw new IllegalArgumentException("Tarefa com o ID informado não existe.");
        }

        taskRepository.deleteById(id);
    }
}
