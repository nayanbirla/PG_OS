package com.pgos.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI pgOsOpenAPI() {
        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()
                .info(new Info()
                        .title("PG OS API")
                        .description("Digital Operating System for PGs and Co-Living Spaces")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("PG OS Team")
                                .email("support@pgos.in"))
                        .license(new License()
                                .name("Proprietary")))
                .addSecurityItem(new SecurityRequirement()
                        .addList(securitySchemeName))
                .schemaRequirement(securitySchemeName,
                        new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter your JWT access token"));
    }
}
