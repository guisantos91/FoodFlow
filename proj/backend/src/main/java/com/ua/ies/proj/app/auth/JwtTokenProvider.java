package com.ua.ies.proj.app.auth;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtTokenProvider {

    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("your-256-bit-secret-key-of-32bytes!!".getBytes());

    private final long validityInMilliseconds = 86400000; // 24h

    public String createToken(String username, String user_type) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("user_type", user_type);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token); 
            return true;
        } catch (SignatureException ex) {
            System.err.println("Invalid JWT signature: " + ex.getMessage());
        } catch (Exception ex) {
            System.err.println("JWT validation error: " + ex.getMessage());
        }
        return false;
    }

    public String getUsername(String token) {
        Claims claims = parseToken(token).getBody();
        return claims.getSubject();
    }

    public String getUserType(String token) {
        return parseToken(token).getBody().get("user_type", String.class);
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) 
                .build()
                .parseClaimsJws(token);
    }
}

