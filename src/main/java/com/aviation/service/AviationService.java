package com.aviation.service;

import java.util.Date;
import java.util.List;

import com.aviation.entity.Component;

import com.aviation.entity.Filter;
import com.aviation.vo.ComponentReport;

public interface AviationService {

	public List<Component> getComponent(final Date fromDate, final Date toDate);

	public void saveFilter(final Filter filter);

	public void saveAsDefaultFilter(final Filter filter);

	public List<Filter> getFilters();

	public Filter getDefaultFilter();

	public Filter loadRecentSavedFilter();
	
	public int updateFilter(Filter filter);
	
	public List<Object> getRemovedComponents(Date fromDate, Date toDate);
	
	public ComponentReport getComponents(List<Long> componentIds,Date fromDate);
	
	public List<Object> getRemovedComponentsMFG(Date fromDate, Date toDate);
	
	public List<Object> getRemovedComponentsCPNSerial(Date fromDate, Date toDate);
	
	public List<Object> getRemovedComponentsTailNoOfRemoval(Date fromDate, Date toDate);
	 
	public List<Object> getRemovedComponentsTail(Date fromDate, Date toDate);
	
	public boolean isValidLogin(String userName, String password);
	
	//public List<Component> getComponentIdMGFSerial(String mfgSerial,Date fromDate,Date toDate);
	
	public List<Long> getComponentIdMGFSerialNo(String mfgSerial,Date fromDate,Date toDate);
	
	public List<Long> getComponentIdMGFPartNo(String mfgPart,Date fromDate,Date toDate);
	
	public List<Long> getComponentIdATASystem(String ataSystem,Date fromDate,Date toDate);
	
	public List<Long> getComponentIdTailNo(String tail,Date fromDate,Date toDate);
	
	public List<Object> getFailureData();
	

}

