package com.example.demo.service;

import com.example.demo.dto.ReportDTO;
import com.example.demo.entity.ReportEntity;
import com.example.demo.model.Group;
import com.example.demo.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    /**
     * Returns all reports between given dates.
     */
    public List<ReportEntity> getReportsByDateRange(LocalDate startDate, LocalDate endDate) {
        return reportRepository.findByDateBetween(startDate, endDate);
    }

    /**
     * Returns reports by status.
     */
    public List<ReportEntity> getReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }

    /**
     * Returns all reports.
     */
    public List<ReportEntity> getAllReports() {
        return reportRepository.findAll();
    }

    /**
     * Returns reports by group id.
     * Note: ReportEntity does not have groupId field, so this method is commented out.
     */
    // public List<ReportEntity> getReportsByGroupId(Integer groupId) {
    //     // Assuming Report has a groupId field or relationship
    //     return reportRepository.findByGroupId(groupId);
    // }

    /**
     * Returns recent reports by user email.
     */
    public List<ReportDTO> getRecentReportsByUserEmail(String email) {
        // Assuming logic to get recent reports for user
        return reportRepository.findRecentByUserEmail(email);
    }
}
