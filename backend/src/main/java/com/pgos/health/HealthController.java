package com.pgos.health;

import com.pgos.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Health check endpoint for monitoring and keep-alive pings.
 */
@RestController
@RequestMapping("/api/v1")
@Tag(name = "Health", description = "Application health check")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Check API health", description = "Returns the current health status of the API")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> healthData = Map.of(
                "status", "UP",
                "service", "PG OS API",
                "version", "0.0.1-SNAPSHOT",
                "timestamp", LocalDateTime.now().toString()
        );
        return ResponseEntity.ok(ApiResponse.success(healthData, "Service is healthy"));
    }
}
