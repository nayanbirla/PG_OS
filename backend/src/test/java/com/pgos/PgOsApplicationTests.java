package com.pgos;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class PgOsApplicationTests {

    @Test
    void contextLoads() {
        // Verifies the Spring context loads without errors
    }
}
