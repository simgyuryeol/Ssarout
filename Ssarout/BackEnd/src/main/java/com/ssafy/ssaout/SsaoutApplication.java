package com.ssafy.ssaout;


import com.ssafy.ssaout.common.config.properties.AppProperties;
import com.ssafy.ssaout.common.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
@EnableJpaAuditing
public class SsaoutApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsaoutApplication.class, args);
	}

}
