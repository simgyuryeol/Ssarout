package com.ssafy.ssaout.user.controller.auth;

import static org.springframework.http.HttpStatus.OK;

import com.ssafy.ssaout.common.config.properties.AppProperties;
import com.ssafy.ssaout.common.error.ErrorCode;
import com.ssafy.ssaout.common.error.exception.TokenValidFailedException;
import com.ssafy.ssaout.common.oauth.entity.RoleType;
import com.ssafy.ssaout.common.oauth.token.AuthToken;
import com.ssafy.ssaout.common.oauth.token.AuthTokenProvider;
import com.ssafy.ssaout.common.response.ApiResponse;
import com.ssafy.ssaout.common.utils.CookieUtil;
import com.ssafy.ssaout.common.utils.HeaderUtil;
import com.ssafy.ssaout.user.domain.entity.UserRefreshToken;
import com.ssafy.ssaout.user.repository.UserRefreshTokenRepository;
import io.jsonwebtoken.Claims;
import java.util.Date;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    @GetMapping("/refresh")
    public ResponseEntity<ApiResponse> refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
//        if (authToken.validate()) {
//            throw new TokenValidFailedException(ErrorCode.INVALID_ACCESS_TOKEN);
//        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            throw new TokenValidFailedException(ErrorCode.NOT_EXPIRED_TOKEN_YET);
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

//        if (authRefreshToken.validate()) {
//            throw new TokenValidFailedException(ErrorCode.INVALID_REFRESH_TOKEN);
//        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            throw new TokenValidFailedException(ErrorCode.INVALID_REFRESH_TOKEN);

        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        ApiResponse apiResponse = ApiResponse.builder()
            .message("토큰이 재발행되었습니다.")
            .status(OK.value())
            .data(newAccessToken.getToken())
            .build();
        return ResponseEntity.ok(apiResponse);
    }
}
