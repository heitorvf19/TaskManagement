package br.com.heitorviana.projeto_trainee.models;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import br.com.heitorviana.projeto_trainee.enums.Priority;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Temporal(TemporalType.DATE)
    private Date expectedFinishDate;
    //LocalDate

    private Boolean isFinished;
    

    @ManyToOne
    @JoinColumn(name = "list_id") 
    @JsonBackReference
    private Lista list;

    // Getters and Setters (manual addition)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Date getExpectedFinishDate() {
        return expectedFinishDate;
    }

    public void setExpectedFinishDate(Date expectedFinishDate) {
        this.expectedFinishDate = expectedFinishDate;
    }

    public Boolean getIsFinished() {
        return isFinished;
    }

    public void setIsFinished(Boolean isFinished) {
        this.isFinished = isFinished;
    }

    public Lista getList() {
        return list;
    }

    public void setList(Lista list) {
        this.list = list;
    }
}
