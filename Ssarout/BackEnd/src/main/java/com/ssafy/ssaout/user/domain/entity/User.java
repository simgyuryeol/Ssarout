package com.ssafy.ssaout.user.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssaout.common.oauth.entity.ProviderType;
import com.ssafy.ssaout.common.oauth.entity.RoleType;
import com.ssafy.ssaout.fav.domain.entity.Favorite;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@Entity
@Table(name = "USER")
public class User {

    @JsonIgnore
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String username;

    @Column(name = "NICKNAME")
    @Size(max = 100)
    private String nickname;

    /**
     * 사용자 정의 로그인 용, 소셜 로그인시 필요 없음
     */
//    @JsonIgnore
//    @Column(name = "PASSWORD", length = 128)
//    @NotNull
//    @Size(max = 128)
//    private String password;

    @Column(name = "EMAIL", length = 512)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    @Column(name = "CREATED_AT")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    @NotNull
    private LocalDateTime modifiedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserRefreshToken userRefreshToken;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
    private List<Favorite> favorite;

    public User(
        @NotNull @Size(max = 64) String userId,
        @NotNull @Size(max = 100) String username,
        @NotNull @Size(max = 512) String email,
        @NotNull @Size(max = 1) String emailVerifiedYn,
        @NotNull @Size(max = 512) String profileImageUrl,
        @NotNull ProviderType providerType,
        @NotNull RoleType roleType,
        @NotNull LocalDateTime createdAt,
        @NotNull LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.username = username;
        //this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    @Override
    public String toString() {
        return "User{" +
            "userSeq=" + userSeq +
            ", userId='" + userId + '\'' +
            ", username='" + username + '\'' +
            ", nickname='" + nickname + '\'' +
            ", email='" + email + '\'' +
            ", emailVerifiedYn='" + emailVerifiedYn + '\'' +
            ", profileImageUrl='" + profileImageUrl + '\'' +
            ", providerType=" + providerType +
            ", roleType=" + roleType +
            ", createdAt=" + createdAt +
            ", modifiedAt=" + modifiedAt +
            '}';
    }
}
