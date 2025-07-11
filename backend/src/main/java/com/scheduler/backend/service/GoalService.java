package com.scheduler.backend.service;

import com.scheduler.backend.model.Goal;
import com.scheduler.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Goal addGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> getGoals(String userId) {
        return goalRepository.findByUserId(userId);
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}
