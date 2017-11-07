package com.aviation.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aviation.entity.Component;
import com.aviation.entity.ComponentHistory;

import com.aviation.entity.Filter;

import com.aviation.entity.Login;
import com.aviation.service.AviationService;
import com.aviation.vo.ComponentReport;
//import com.mysql.fabric.xmlrpc.base.Array;

import static com.aviation.util.PathConstants.*;

@RestController
public class AviationController {
	
	
	private List<Long> componentsIds;
	private String removalFromDate;
	private String removalToDate;
	private String optionEnd;
	private String optionStart;
	private String filterName;
	private String pageStatus;
	
	


	@Autowired
	private AviationService aviationService;

	@RequestMapping(value = LOAD_COMPONENT_BY_START_END_DATE, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Component> loadComponentData(@PathVariable final String startDate, @PathVariable final String endDate)
			throws ParseException {

		final String pattern = DATEFORMAT;
		Date sDate = null;
		Date eDate = null;
		try {
			sDate = new SimpleDateFormat(pattern).parse(startDate);
			eDate = new SimpleDateFormat(pattern).parse(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return aviationService.getComponent(sDate, eDate);
	}

	@RequestMapping(value = SAVEFILTER, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void saveFilter(@RequestBody final Filter filter) throws ParseException {
		aviationService.saveFilter(filter);
	}
	
	@RequestMapping(value = UPDATE_FILTER, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void updateFilter(@RequestBody final Filter filter) throws ParseException {
		aviationService.updateFilter(filter);
	}
	

	@RequestMapping(value = SAVE_DEFUALT_FILTER, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void saveAsDefaultFilter(@RequestBody Filter filter) throws ParseException {
		aviationService.saveAsDefaultFilter(filter);
	}

	@RequestMapping(value = GET_FILTERS, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Filter> getFilters() {
		List<Filter> test=aviationService.getFilters();
		for(Filter i:test){
			//system.out.println("hi test"+i);
		}
		
		//system.out.println("hi in load filter"+aviationService.getFilters());
		return aviationService.getFilters();
	}

	@RequestMapping(value = GET_DEFAULT_FILTER, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Filter getDefaultFilter() {
		return aviationService.getDefaultFilter();
	}
	
	
	
	@RequestMapping(value = "/removalReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ComponentReport removalReport() {
		// TODOD:: Remove Hard coding 
	//	long[] components = {2312,2302,1642};
		//system.out.println("step value"+step);
		System.out.println("componentsIds");
		System.out.println("componentsIds"+componentsIds.size());
		System.out.println("componentsIds"+componentsIds.toString());
		System.out.println("componentsIds"+componentsIds.size());
	//   removalFromDate;
	  // removalToDate
		List<Long> compos1=componentsIds;
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	     // System.out.println("fromdate "+fromDate+" to date "+toDate);
	      //optionEnd=toDate;
	   //   optionStart=fromDate;
		  Date frmDate=null;
		  Date tDate=null;
		try {
			frmDate = df.parse(optionStart);
			tDate = df.parse(optionEnd);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
		
      
		ComponentReport componentRemovalRept =  aviationService.getComponents(compos1,frmDate);

		
		
		 
		 return componentRemovalRept;
	}
	
	@RequestMapping(value = "/splashScreen", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Object> showSplashScreen(/*@RequestBody   List<Long> componentIds*/) {
		// TODOD:: Remove Hard coding 
		
		

		String dataIntervalValue=getSplashDate();
		String[] date=dataIntervalValue.split(",");
		
		
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse(date[0]);
			 eDate =  new SimpleDateFormat(pattern).parse(date[1]);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 System.out.println(" Splash from date"+sDate+" todate "+eDate);
		List<Object> componentRemovalRept =  aviationService.getRemovedComponents(sDate, eDate);
		//List<Object> componentRemovalRept =  aviationService.getRemovedComponents(new Date("2014-08-10"), new Date("2016-08-10"));
		//system.out.println(componentRemovalRept);
		
		return componentRemovalRept;
	}
	
	

	
	
	@RequestMapping(value = "/splashScreenMFG", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Object> showSplashScreenCPN(/*@RequestBody   List<Long> componentIds*/) {
		// TODOD:: Remove Hard coding 
		
		

		String dataIntervalValue=getSplashDate();
		String[] date=dataIntervalValue.split(",");
		
		
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse(date[0]);
			 eDate =  new SimpleDateFormat(pattern).parse(date[1]);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 System.out.println(" MFG from date"+sDate+" todate "+eDate);
		List<Object> componentRemovalRept =  aviationService.getRemovedComponentsMFG(sDate, eDate);
		//List<Object> componentRemovalRept =  aviationService.getRemovedComponentsCPN(new Date("2014-08-10"), new Date("2016-08-10"));
		//system.out.println("in cpn"+componentRemovalRept);
		
		return componentRemovalRept;
	}
	
	
	@RequestMapping(value = "/splashScreenCPNSerial", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Object> splashScreenCPNSerial(/*@RequestBody   List<Long> componentIds*/) {
		// TODOD:: Remove Hard coding 
		
		
		
		String dataIntervalValue=getSplashDate();
		String[] date=dataIntervalValue.split(",");
		
		
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse(date[0]);
			 eDate =  new SimpleDateFormat(pattern).parse(date[1]);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 System.out.println(" CPN SERIAL from date"+sDate+" todate "+eDate);
		List<Object> componentRemovalRept =  aviationService.getRemovedComponentsCPNSerial(sDate, eDate);
		//system.out.println("in cpn"+componentRemovalRept);
		
		return componentRemovalRept;
	}
	

	@RequestMapping(value = "/splashScreenTail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Object> splashScreenTail(/*@RequestBody   List<Long> componentIds*/) {
		// TODOD:: Remove Hard coding 
		
		
		
		/*
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse("2014-08-10");
			 eDate =  new SimpleDateFormat(pattern).parse("2016-08-10");
		} catch (ParseException e) {
			e.printStackTrace();
		}

		
		List<Object> sent=new ArrayList<Object>();
		
		
		List<Object> componentRemovalRept =  aviationService.getRemovedComponentsTail(sDate, eDate);
		
		for(Object i:componentRemovalRept){
			
			
			ComponentHistory temp=new ComponentHistory();
	
			temp=(ComponentHistory) i;
			
			Date fromDate=temp.getFromDate();
			Date toDate=temp.getTodate();
			
			if(toDate == null){
			
				toDate=eDate;
		
			}
			
			long diff = toDate.getTime()-fromDate.getTime();
			long diffDays = (diff / ( 60 * 60 * 1000))+1;
			List<Object> tempArr= new ArrayList<Object>();
			tempArr.add(temp.getTailNo());
			tempArr.add(diffDays);
			sent.add(tempArr);

	
	
		}
		
		
	
	
		return sent;*/
		
		

		String dataIntervalValue=getSplashDate();
		String[] date=dataIntervalValue.split(",");
		
		
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse(date[0]);
			 eDate =  new SimpleDateFormat(pattern).parse(date[1]);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		 System.out.println(" tail SERIAL from date"+sDate+" todate "+eDate);
		List<Object> componentRemovalRept =  aviationService.getRemovedComponentsTailNoOfRemoval(sDate, eDate);
		//system.out.println("in cpn"+componentRemovalRept);
		
		return componentRemovalRept;
		
		
		
		
		
		
		
	}
	
    public static String getDate(Calendar cal){
        return "" + cal.get(Calendar.DATE) +"/" +
                (cal.get(Calendar.MONTH)+1) + "/" + cal.get(Calendar.YEAR);
    }
  

    
    

	@RequestMapping(value = LOGIN_VERIFICATON, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Login LoginVerification(@PathVariable final String username, @PathVariable final String password)
			{

		//system.out.println("username "+username+" pass "+password);
	
		boolean loginValidRes =  aviationService.isValidLogin(username, password);
		Login sample=new Login();
		sample.setResult(loginValidRes);
		return sample;
	}
	
    
    
    
	@RequestMapping(value = "/postComponentIds/{fromDate}/{toDate}/{filterName}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public int getComponentsIds(@RequestBody List<Component> components,@PathVariable final String fromDate,@PathVariable final String toDate,  @PathVariable final String filterName) throws ParseException {

		System.out.println("in post");
		
		this.filterName=filterName;
		this.pageStatus="filterPage";
		componentsIds = new ArrayList<Long>();
		//componentsIds=components;
		for (Component component : components) {
			componentsIds.add(component.getComponentID());
			//system.out.println(component.getComponentID());
		}
		System.out.println("in component id"+componentsIds.size());	
		
		
		
		 DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	      System.out.println("fromdate "+fromDate+" to date "+toDate);
	      optionEnd=toDate;
	      optionStart=fromDate;
 		  Date frmDate= df.parse(fromDate);
          Date tDate= df.parse(toDate);
		
		
		//system.out.println("to date and from date"+frmDate+" "+tDate);
		
		 SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		 String  startDate=formatter.format(frmDate);
         String  endDate=formatter.format(tDate);
      //system.out.println("after"+startDate+" "+endDate);
		
      removalFromDate=startDate.replaceAll("-", "/");
      removalToDate=endDate.replaceAll("-", "/");
      return 1;
	}

    
	
	
	
	
	
	
	/*
	  
		@RequestMapping(value = "/postComponentIds", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
		public int getComponentsIds(@RequestBody List<Component> components@RequestBody Long[] comp) throws ParseException {

			System.out.println("in post");
			
			componentsIds = new ArrayList<Long>();
			//componentsIds=components;
			for (Component component : components) {
				componentsIds.add(component.getComponentID());
				//system.out.println(component.getComponentID());
			}
			System.out.println("in component id"+componentsIds.size());	
			System.out.println("in component id"+componentsIds);	
			
			System.out.println("in component id"+comp.toString());	
			System.out.println("in component id"+comp.length);
			
      return 1;
	      
		}

	    
    */
    
    
	
	@RequestMapping(value = "/paginationStatus", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> paginationStatus(/*@PathVariable List<Component> componentIds*/) {
		// TODOD:: Remove Hard coding 

		
		List<String> status =  new ArrayList<String>();
		 
		
		
		System.out.println("in status"+status);
		status.add(removalFromDate);
		status.add(removalToDate);
		status.add(optionEnd);
		status.add(optionStart);
		status.add(filterName);
		status.add(pageStatus);
		System.out.println("in status"+status);
		return status;
	}
	
    
    
    
	@RequestMapping(value = "/getSplashDate", method = RequestMethod.GET/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
	public String getSplashDate() {
		/*Calendar cal = Calendar.getInstance();
		Date today= cal.getTime();
		cal.add(Calendar.YEAR, -2);
		Date prevDate = cal.getTime();
		//"dd/MM/yyyy"
		String fromDate = getFormattedDate("dd/MM/yyyy", today);
		String toDate = getFormattedDate("dd/MM/yyyy", prevDate);
		return toDate + "-" + fromDate;*/
		 Calendar cal = Calendar.getInstance();
         cal.setTimeZone(TimeZone.getTimeZone("GMT"));
         cal.add(Calendar.YEAR, -3);
         String toDate=getDate(cal);
         System.out.println(toDate);
         cal.add(Calendar.YEAR, -2);
         String fromDate=getDate(cal);
         toDate=toDate.replaceAll("/", "-");
         fromDate=fromDate.replaceAll("/", "-");
         DateFormat df = new SimpleDateFormat("dd-MM-yyyy"); 
         String dateRange = null;
     	try {
     		Date frmDate= df.parse(fromDate);
             Date tDate= df.parse(toDate);
             
             //system.out.println("Current date"+toDate+ "30 days back"+fromDate);
             SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
             fromDate=formatter.format(frmDate);
             toDate=formatter.format(tDate);
             dateRange=fromDate;
             dateRange=dateRange+","+toDate;
 	} catch (ParseException e) {
 		e.printStackTrace();
 		
 	}
		return dateRange;
 	
		
		
	}
	
    
    private String getFormattedDate(String pattern, Date date){
    	 SimpleDateFormat formatter = new SimpleDateFormat(pattern);
    	 return formatter.format(date);
       
         
    }
    
    
	@RequestMapping(value = "/testUnitFilter/{fromDate}/{toDate}/{componentIds}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public void test(@PathVariable final String fromDate, @PathVariable final String toDate,@PathVariable final List<String> componentIds) {
		// TODOD:: Remove Hard coding 
		
		/*componentsIds = new ArrayList<Long>();
		for (Component component : components) {
			componentsIds.add(component.getComponentID());
			//system.out.println(component.getComponentID());
		}*/
		System.out.println("components"+fromDate+" "+toDate);
		System.out.println("components"+componentIds.size());
		System.out.println("components"+componentIds.toString());
		//System.out.println("in component id"+componentsIds.size());	
		
	}
    
	
	
	@RequestMapping(value = "/navigationToRemoval/{actualData}/{dataType}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public int navigationToRemoval(@PathVariable final String actualData,@PathVariable final String dataType) throws ParseException {
		// TODOD:: Remove Hard coding 
		
    


		String dataIntervalValue=getSplashDate();
		String[] date=dataIntervalValue.split(",");
		
		
		String pattern = DATEFORMATNEW;
		Date sDate=null;
		Date eDate=null;
		try {
			sDate =  new SimpleDateFormat(pattern).parse(date[0]);
			 eDate =  new SimpleDateFormat(pattern).parse(date[1]);
	} catch (ParseException e) {
		e.printStackTrace();
	}
	 
	
	
	
    
    
		System.out.println("in controlller"+actualData+" type"+dataType);
		List<Long> comp=new ArrayList<Long>();
		if(dataType.equals("MSN")){
		  System.out.println("HI I am in msn ");
			//comp=aviationService.getComponentIdMGFSerial(actualData,sDate,eDate);
			this.filterName="Copmany Serial No-"+actualData;
			comp=aviationService.getComponentIdMGFSerialNo(actualData,sDate,eDate);
			 System.out.println("HI I am in msn "+comp.toString());
		}
		if(dataType.equals("CPN")){
			this.filterName="CPN-"+actualData;
			comp=aviationService.getComponentIdMGFPartNo(actualData,sDate,eDate);
		}
		if(dataType.equals("ATA")){
			
			this.filterName="ATA-"+actualData;
			comp=aviationService.getComponentIdATASystem(actualData,sDate,eDate);
		}
		if(dataType.equals("Tail")){
			this.filterName="TAIL-"+actualData;
		comp=aviationService.getComponentIdTailNo(actualData,sDate,eDate);
		}
		
		
		
		
		
		
		
		
		
		
		
		
		System.out.println("component"+comp.size());
		System.out.println("component"+comp.toString());
		
		componentsIds = new ArrayList<Long>();
	
		
			componentsIds=comp;
		
		
		
		System.out.println("in component id"+componentsIds.size());	
		
		String fromDate=date[0];
		String	toDate=date[1];
		
		
		 DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	      System.out.println("fromdate "+fromDate+" to date "+toDate);
	      optionEnd=toDate;
	      optionStart=fromDate;
		Date frmDate= df.parse(fromDate);
       Date tDate= df.parse(toDate);
		
		
		//system.out.println("to date and from date"+frmDate+" "+tDate);
		
		 SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		 String  startDate=formatter.format(frmDate);
         String  endDate=formatter.format(tDate);
         this.pageStatus="spalashPage";
    //system.out.println("after"+startDate+" "+endDate);
		
    removalFromDate=startDate.replaceAll("-", "/");
    removalToDate=endDate.replaceAll("-", "/");
    
		
		
		return 1;
	
	
	
	}
	@RequestMapping(value = "/getfailureData", method = RequestMethod.GET/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
	public List<Object> getfailureData() {
	
	
	List<Object> actualldata=new ArrayList<Object>();
	
	List<Object> failureData=aviationService.getFailureData();
	int count=0;
	for(Object s:failureData){
		if(count == 6){
			break;
		}else{
		
		actualldata.add(s);
		count++;
		}
	}
	
	return actualldata;
	}
}