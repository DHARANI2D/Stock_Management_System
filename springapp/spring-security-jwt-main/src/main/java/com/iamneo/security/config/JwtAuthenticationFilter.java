package com.iamneo.security.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.iamneo.security.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    // 7. userDetailService is an interface available withtin spring framework
    // security core
    // 8. Need to implement our own method to check whether user is available or not
    // in database
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // 1. If both the condition doesn't meet then we will send the filterChain to
        // next
        // filter
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(jwtToken); // Will go to jwtService

        // 2.. Checking if userEmail is not null and I want to check that user is not
        // authenticated yet
        // 3. If user is authenticated then I don't want to check all the condition and
        // update the SecurityContextHolder
        // 4. To check whethe the user is authenticated or not we have a object called
        // SecurityContextHolder
        // 5. If the authentication is null then the user is not authenticated/
        // connected yet
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 6. Check whether we have user within the database after the authentication
            // condition
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            // 9. Check whether the token is valid or not
            // 10. If token is vaild we need to update SecurityContextHolder
            if (jwtService.isTokenValid(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            filterChain.doFilter(request, response);
        }
    }

}
