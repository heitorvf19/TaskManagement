package br.com.heitorviana.projeto_trainee.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.heitorviana.projeto_trainee.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByListId(Long listId);
    boolean existsByListId(Long listId);
}
