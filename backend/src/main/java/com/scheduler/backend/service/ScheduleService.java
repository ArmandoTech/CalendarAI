package com.scheduler.backend.service;

import com.scheduler.backend.model.Goal;
import com.scheduler.backend.model.GoalSlot;
import com.scheduler.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScheduleService {

    private final GoalRepository goalRepository;

    public ScheduleService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Map<String, List<GoalSlot>> generateWeeklySchedule(String userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        Map<String, List<GoalSlot>> schedule = initEmptySchedule();

        for (Goal goal : goals) {
            String[] days = goal.getPreferredDays().split(",");
            int totalHours = goal.getEstimatedHours();
            int hoursPerDay = totalHours / days.length;
            int remainingHours = totalHours % days.length;

            for (int i = 0; i < days.length; i++) {
                String day = days[i].trim();
                int allocatedHours = hoursPerDay + (i == 0 ? remainingHours : 0); // Add remainder to first day

                schedule.get(day).add(new GoalSlot(goal.getTitle(), allocatedHours));
            }
        }

        return schedule;
    }

    private Map<String, List<GoalSlot>> initEmptySchedule() {
        Map<String, List<GoalSlot>> schedule = new LinkedHashMap<>();
        schedule.put("Monday", new ArrayList<>());
        schedule.put("Tuesday", new ArrayList<>());
        schedule.put("Wednesday", new ArrayList<>());
        schedule.put("Thursday", new ArrayList<>());
        schedule.put("Friday", new ArrayList<>());
        schedule.put("Saturday", new ArrayList<>());
        schedule.put("Sunday", new ArrayList<>());
        return schedule;
    }
}
