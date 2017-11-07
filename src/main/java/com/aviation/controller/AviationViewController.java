package com.aviation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aviation.service.AviationService;

@Controller
public class AviationViewController {
	@Autowired
	private AviationService aviationService;

	@RequestMapping("/")
	public String viewDetails() {
		// TODO:: Add suffix in application.properties file so that .html need not be added 
	    // Move the constants to Constant file 
		return "index.html";
	}
	
	@RequestMapping("/main")
	public String loginView(@RequestParam("username") String username,@RequestParam("password") String password) {
		// TODO:: Add suffix in application.properties file so that .html need not be added 
	    // Move the constants to Constant file 
		System.out.println("hai in login"+username+" password "+username);
		
		
		//System.out.println("username "+username+" pass "+password);
	
		boolean loginValidRes =  aviationService.isValidLogin(username, password);
		if(loginValidRes == true){
			return "afterLogin.html";
		}else{
			return "index.html";
		}
		
	}
}
