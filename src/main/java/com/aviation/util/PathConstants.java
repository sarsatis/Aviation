package com.aviation.util;

/**
 * 
 * @author ambansal
 *
 */
public class PathConstants {

	private PathConstants() {
		super();
	}

	public static final String LOAD_COMPONENT_BY_START_END_DATE = "/loadComponent/{startDate}/{endDate}";
	
	public static final String DATEFORMAT = "yyyy-MM-dd";
	
	public static final String SAVEFILTER = "/saveFilter";
	
	public static final String UPDATE_FILTER = "/updateFilter";
	
	public static final String DATEFORMATNEW = "yyyy-MM-dd";
	
	public static final String SAVE_DEFUALT_FILTER = "/saveAsDefaultFilter";
	
	public static final String GET_FILTERS = "/getFilters";
	
	public static final String GET_DEFAULT_FILTER = "/getDefaultFilter";
	
	public static final String LOGIN_VERIFICATON = "/loginVerification/{username}/{password}";
	
	public static final String SUBGROUPORDER = "function (a,b) {return a.subgroupOrder - b.subgroupOrder;}";
}
