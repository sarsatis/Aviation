package com.aviation.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Type;
@Entity
@Table(name = "login")
public class Login {

	
	@Id
	@Column(name = "loginid")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long LoginID;
	
	
	@NotNull
	@Column(name = "username")
	private String userName;
	
	@NotNull
	@Column(name = "password")
	private String password;
	

	private boolean result ;

	public Long getLoginID() {
		return LoginID;
	}

	public void setLoginID(Long loginID) {
		LoginID = loginID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isResult() {
		return result;
	}

	public void setResult(boolean result) {
		this.result = result;
	}
	
	
	
	
}
