package com.iamneo.security.dto.request;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {
	@Id
	@GeneratedValue
    private int id;
	private String firstName;
	private String email;
	private String password;
	private String confirmPassword;
	private String phone;
	private String address;
	private String dob;
	private String gstNo;
	private String panNo;
	private String tinNo;
	private String bankName;
	private String accountNo;
	private int balance;
}
