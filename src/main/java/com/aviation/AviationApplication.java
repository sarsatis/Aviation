package com.aviation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class AviationApplication {

	public static void main(String[] args) {
		SpringApplication.run(AviationApplication.class, args);
	}
}
