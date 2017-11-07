package com.aviation;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.Assert;
//import com.aviation.service.AviationService;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class FilterTest {

	

	@Autowired
	//private AviationService aviationService;
    
	
	@Test
	public void getFilters()
	{
		
		int length=10;
	//  int filtersLength=aviationService.getFilters().size();
	 // assertEquals(length,filtersLength);
	  //Assert.isTrue(length==filtersLength);
		Assert.isTrue(length==9);
		

	  
		
	}
	
	/*@Test
	public void saveFilter()
	{
		
		
	
		
	}
	
	@Test
	public void updateFilter()
	{
		
		
	
		
	}
	
	*/
	
	
	
	
}
