package com.quickstay.filter;

import com.quickstay.model.UserRole;
import com.quickstay.service.UserAppService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Calendar;


@Configuration
public class RestAuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
            chain.doFilter(request, response);
        } else if (httpRequest.getRequestURL().indexOf("/profile") != -1) {
            String token = httpRequest.getHeader("auth-token");
            Calendar now = Calendar.getInstance();
            if (!StringUtils.isEmpty(token) && UserAppService.authUsers.containsKey(token)) {
                chain.doFilter(request, response);
            } else {
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
            }
        } else if (httpRequest.getRequestURL().indexOf("/logout") != -1) {
            String token = httpRequest.getHeader("auth-token");
            Calendar now = Calendar.getInstance();
            if (!StringUtils.isEmpty(token) && UserAppService.authUsers.containsKey(token)) {
                UserAppService.authUsers.remove(token);
                chain.doFilter(request, response);
            }
        } else if (httpRequest.getRequestURL().indexOf("/api/hotels") != -1) {
            String token = httpRequest.getHeader("auth-token");
            Calendar now = Calendar.getInstance();
            if (!StringUtils.isEmpty(token) && UserAppService.authUsers.containsKey(token)
                    && UserAppService.authUsers.get(token).getUserRole() == UserRole.ADMIN) {
                chain.doFilter(request, response);
            } else {
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
            }
        } else if (httpRequest.getRequestURL().indexOf("/api/booking") != -1
                || httpRequest.getRequestURL().indexOf("/api/payments") != -1) {
            String token = httpRequest.getHeader("auth-token");
            Calendar now = Calendar.getInstance();
            if (!StringUtils.isEmpty(token) && UserAppService.authUsers.containsKey(token)
                    && UserAppService.authUsers.get(token).getUserRole() == UserRole.USER) {
                chain.doFilter(request, response);
            } else {
                HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
            }
        } else
            chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
