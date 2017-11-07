package com.aviation.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.aviation.entity.Login;

public interface LoginRepository extends CrudRepository<Login, Serializable> {
	
	 @Query("SELECT  count(*) FROM Login where  userName= :userName and password= :password ")
     public int getLoginVerified(@Param("userName")final String userName, @Param("password")final String password );

}
