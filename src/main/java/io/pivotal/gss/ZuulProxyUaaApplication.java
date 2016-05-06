package io.pivotal.gss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableZuulProxy
public class ZuulProxyUaaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuulProxyUaaApplication.class, args);
	}
	
	@Bean
	public RemoteOriginZuulFilter remoteOriginZuulFilter() {
		return new RemoteOriginZuulFilter();
	}
}
