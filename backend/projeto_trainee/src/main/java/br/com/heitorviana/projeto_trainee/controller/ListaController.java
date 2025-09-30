package br.com.heitorviana.projeto_trainee.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.heitorviana.projeto_trainee.models.Lista;
import br.com.heitorviana.projeto_trainee.repositories.ListaRepository;
import br.com.heitorviana.projeto_trainee.repositories.TaskRepository;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "http://localhost:5173")
public class ListaController {

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<Object> createList(@RequestBody Lista lista) {
        if (listaRepository.findByName(lista.getName()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe uma lista com este nome.");
        }

        Lista newLista = listaRepository.save(lista);

        return ResponseEntity.status(HttpStatus.CREATED).body(newLista);
    }

    @GetMapping
    public java.util.List<Lista> getAllLists() {
        return listaRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Object> getListById(@PathVariable Long id) {
        Optional<Lista> listID = listaRepository.findById(id);

        if (listID.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(listID.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista não encontrada.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateList(@PathVariable Long id, @RequestBody Lista newName){
        Optional<Lista> listID = listaRepository.findById(id);

        if(listID.isPresent()){
            Lista List = listID.get();
            List.setName(newName.getName());
            Lista updatedLista = listaRepository.save(List);
            return ResponseEntity.status(HttpStatus.OK).body(updatedLista);
        } else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista não encontrada."); 
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteList(@PathVariable Long id) {
        Optional<Lista> listID = listaRepository.findById(id);

        if (listID.isPresent()) {
            if(taskRepository.existsByListId(id)){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Não é possível excluir a lista, pois existem tarefas associadas.");
            }

            listaRepository.deleteById(id);
            
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lista não encontrada.");
        }
    }
}
