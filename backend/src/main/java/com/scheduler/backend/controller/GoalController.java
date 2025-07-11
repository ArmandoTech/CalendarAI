package com.scheduler.backend.controller;

import com.scheduler.backend.model.Goal;
import com.scheduler.backend.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalRepository goalRepository;

    // GET: Fetch all goals
    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        List<Goal> goals = goalRepository.findAll();
        return ResponseEntity.ok(goals);
    }

    // POST: Create a new goal
    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        Goal savedGoal = goalRepository.save(goal);
        return new ResponseEntity<>(savedGoal, HttpStatus.CREATED);
    }

    // PUT: Update an existing goal
    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, @RequestBody Goal goalDetails) {
        return goalRepository.findById(id)
                .map(goal -> {
                    goal.setTitle(goalDetails.getTitle());
                    goal.setDescription(goalDetails.getDescription());
                    goal.setEstimatedHours(goalDetails.getEstimatedHours());
                    goal.setPreferredDays(goalDetails.getPreferredDays());
                    Goal updatedGoal = goalRepository.save(goal);
                    return ResponseEntity.ok(updatedGoal);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Remove a goal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        return goalRepository.findById(id)
        .map(goal -> {
            goalRepository.delete(goal);
            return ResponseEntity.noContent().<Void>build();  
        })
        .orElse(ResponseEntity.notFound().build());
    }
}
