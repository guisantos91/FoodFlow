// package com.ua.ies.proj.app.auth;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(authorize -> authorize
//                 .requestMatchers("/api/v1/admin/**").hasAuthority("ADMIN")
//                 .requestMatchers("/api/v1/auth/logout").authenticated()
//                 .anyRequest().permitAll()
//             )
//             .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtCustomizer -> {})); 

//         return http.build(); 
//     }
// }


