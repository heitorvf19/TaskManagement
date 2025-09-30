package br.com.heitorviana.projeto_trainee.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.heitorviana.projeto_trainee.models.Lista;


@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
    
    Optional<Lista> findByName(String name);

}
