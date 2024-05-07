package com.mozart.mockserver.repository;

import com.mozart.mockserver.domain.ApiResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApiResponseRepository extends JpaRepository<ApiResponse, Long> {
    List<ApiResponse> findByApiProject_ApiId(Long apiId);
}
