package com.scheduler.backend.controller;

import com.scheduler.backend.model.Goal;
import com.scheduler.backend.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;


import java.util.List;
@CrossOrigin(origins = "${frontend.url}")
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

    // GET: Fetch goals by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getGoalsByUser(@PathVariable String userId) {
        List<Goal> userGoals = goalRepository.findByUserId(userId);
        return ResponseEntity.ok(userGoals);
}


    // Schedule tasks
    @GetMapping("/schedule/{userId}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> generateSchedule(@PathVariable String userId) { // Returns a map of days and a list of goals for each day with title and number of hours
        List<Goal> goals = goalRepository.findByUserId(userId);
        Map<String, List<Map<String, Object>>> schedule = new HashMap<>();

        // Initialize days of the week
        String[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        for (String day : daysOfWeek) {
            schedule.put(day, new ArrayList<>()); // Initialize an empty list for each day
        }

        for (Goal goal : goals) {
            String[] days = goal.getPreferredDays().split(","); // Only get user's preferred days

            // Distribute hours evenly
            int totalHours = goal.getEstimatedHours();
            int hoursPerDay = totalHours / days.length;
            int remainingHours = totalHours % days.length;

            for (int i = 0; i < days.length; i++) {
                String day = days[i].trim();
                int allocatedHours = hoursPerDay + (i == 0 ? remainingHours : 0); // Add remainder to first day

                Map<String, Object> goalInfo = new HashMap<>(); 
                goalInfo.put("title", goal.getTitle());
                goalInfo.put("hours", allocatedHours);

                schedule.get(day).add(goalInfo); // Add the goal to the corresponding day
            }
        }
        

        return ResponseEntity.ok(schedule);
}

}
