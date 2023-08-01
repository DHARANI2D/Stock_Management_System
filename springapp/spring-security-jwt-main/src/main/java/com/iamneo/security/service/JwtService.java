package com.iamneo.security.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    // 4.
    public String extractUserEmail(String jwtToken) {
        // Subject should be email or username
        return extractClaim(jwtToken, Claims::getSubject);
    }

    // 3. Using generic method to extract single claim
    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    // 6. Generate token using only user details without extra claims
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // 5. Generate token will take parameter of map of string and object and also
    // pass user details
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims) // Extra cliams is the one where we pass extra authorities or datas
                .setSubject(userDetails.getUsername()) // Subject should be username or email
                .setIssuedAt(new Date(System.currentTimeMillis())) // When the claim is created to calculate whether the
                                                                   // token is vaild or expired
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24 * 60)) // Setting expiration data -> 24
                                                                                      // hours plus 1000 milliseconds
                .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
    }

    // 7. To check whether the token is valid or not
    // To check whether the given token is for the given user or not
    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        final String userEmail = extractUserEmail(jwtToken);
        return (userEmail.equals(userDetails.getUsername())) && !isTokenExpired(jwtToken);
    }

    // 8. To check whether the token is expired or not
    private boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }

    // 9.This method is used to extract expiration date
    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    // 1. Extract all claims
    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    // 2. Get Signin key using secret key
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        // hmacShaKeyFor -> One of the algorithm
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
