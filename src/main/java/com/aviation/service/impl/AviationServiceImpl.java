package com.aviation.service.impl;

import static com.aviation.util.PathConstants.DATEFORMAT;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.aviation.entity.Component;
import com.aviation.entity.ComponentHistory;

import com.aviation.entity.Filter;
import com.aviation.repository.ComponentHistoryRepository;
import com.aviation.repository.ComponentRepository;
import com.aviation.repository.FilterRepository;
import com.aviation.repository.LoginRepository;
import com.aviation.service.AviationService;
import com.aviation.vo.ComponentHistoryGroupVO;
import com.aviation.vo.ComponentReport;
import com.aviation.vo.HisotryComponenItemVO;

@Service
public class AviationServiceImpl implements AviationService {

	@Autowired
	private ComponentRepository compRepository;

	@Autowired
	private FilterRepository filterRepository;

	@Autowired
	private ComponentHistoryRepository compHisRepository;
	@Autowired
	private LoginRepository loginRepository;

	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void persistFillter(Filter filter) {
		filterRepository.save(filter);
	}

	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public List<Component> getComponent(Date fromDate, Date toDate) {

		final List<Component> component = compRepository.getComponent(fromDate, toDate);
		return component;
	}
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void saveFilter(Filter filter) {
		long defaultFilterId=0;
		System.out.println(filter.toString());
		Filter deafault_filter=filterRepository.getDefaultFilter();
		if(deafault_filter!=null){
		defaultFilterId=deafault_filter.getFilterID();
		filterRepository.updateDefaultFilter(defaultFilterId);
		}
		filter.setDefaultFilter(true);
		filterRepository.save(filter);	
	}
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void saveAsDefaultFilter(Filter filter) {
		Filter defaultFilter = getDefaultFilter();
		if (defaultFilter != null) {
			System.out.println("no deafault filter exist");
			defaultFilter.setDefaultFilter(false);
			filterRepository.save(defaultFilter);

		}

		filter.setDefaultFilter(true);
		filterRepository.save(filter);

	}

	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public List<Filter> getFilters() {
		return filterRepository.getFilters();
	}

	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Filter getDefaultFilter() {
		return filterRepository.getDefaultFilter();
	}

	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public Filter loadRecentSavedFilter() {

		Long maxVal = filterRepository.loadRecentSavedFilter();
		return null;
	}



	public ComponentReport getComponents(List<Long> componentIds, Date fromDate) {
		
		 List<ComponentHistory> componentHisList = compHisRepository.getComponents(componentIds);
		
		 List<HisotryComponenItemVO> itemList = new ArrayList<HisotryComponenItemVO>();
		 Map<String, List<String>> serialNumberMap = new HashMap<String, List<String>> ();
		 
		 ComponentReport componentList = new ComponentReport();
		 Set<ComponentHistoryGroupVO> groupSet = new HashSet<ComponentHistoryGroupVO>();
		 ////system.out.println("length of report"+componentHisList.size());
		 int count=0;
		 SimpleDateFormat  outputFormatter = new SimpleDateFormat(DATEFORMAT);
		 String startDate = null;
		 String endDate = null;
		 String popup = null;
		 String removalImage = null;
		 String installationDate=null;
		 //boolean flag= true;
		
		 for(ComponentHistory componentHistory : componentHisList){
			 ComponentHistoryGroupVO group = new ComponentHistoryGroupVO();
			 HisotryComponenItemVO item = new HisotryComponenItemVO();
			////system.out.println(componentHistory.getStatus() + " "+componentHistory.getComponent().getComponentID());
			 
			 if(componentHistory.getComponent().getComponentID()==null){
				 group.setId("");
			 }else{
				 group.setId(componentHistory.getComponent().getComponentID().toString());
			 }
			 
			 if(componentHistory.getComponent().getCmpySerialNo()==null){
				 group.setContent("");
			 }else{
				 group.setContent(componentHistory.getComponent().getCmpySerialNo().toString());
			 }
			 
			 if(componentHistory.getComponent().getCmpySerialNo()==null){
				 group.setCmpySerialNo("");
			 }else{
				 group.setCmpySerialNo(componentHistory.getComponent().getCmpySerialNo().toString());
			 }
			 
			 if(componentHistory.getComponent().getMfgPartNo()==null){
				 group.setMfgPartNo("");
			 }else{
				 group.setMfgPartNo(componentHistory.getComponent().getMfgPartNo().toString());
			 }
			 
			 if(componentHistory.getComponent().getCompanyPartNo()==null){
				 group.setCompanyPartNo("");
			 }else{
				 group.setCompanyPartNo(componentHistory.getComponent().getCompanyPartNo().toString());
			 }
			
			 
			 
			 if(componentHistory.getComponent().getMnfgSerialNo()==null){
				 group.setMnfgSerialNo("");
			 }else{
				 group.setMnfgSerialNo(componentHistory.getComponent().getMnfgSerialNo().toString());
			 }
			 
			 if(componentHistory.getComponent().getClassification()==null){
				 group.setClassification("");
			 }else{
				 group.setClassification(componentHistory.getComponent().getClassification().toString());
			 }
			 
			 
			 
			 if(componentHistory.getComponent().getDescription()==null){
				 group.setDescription("");
			 }else{
				 group.setDescription(componentHistory.getComponent().getDescription().toString());
			 }
			 
			 
			 
			 if(componentHistory.getComponent().getTailNo()==null){
				 group.setTailNo("");
			 }else{
				 group.setTailNo(componentHistory.getComponent().getTailNo().toString());
			 }
			 
			 
			 
			 if(componentHistory.getComponent().getFleetNo()==null){
				 group.setFleetNo("");
			 }else{
				 group.setFleetNo(componentHistory.getComponent().getFleetNo().toString());
			 }
			 
			 
			 
			 if(componentHistory.getComponent().getSubfleetNo()==null){
				 group.setSubfleetNo("");
			 }else{
				 group.setSubfleetNo(componentHistory.getComponent().getSubfleetNo().toString());
			 }
			 
			 
			 
			 if(componentHistory.getComponent().getStatus()==null){
				 group.setStatus("");
			 }else{
				 group.setStatus(componentHistory.getComponent().getStatus().toString());
			 }
			 
			 
			 
			 
			 

		 //group.setTitle("I will show details");
			 groupSet.add(group);
			
			 startDate = outputFormatter.format(componentHistory.getFromDate());
			 installationDate=componentHistory.getFromDate().toString();

			 if(componentHistory.getFromDate().before(fromDate))
			 {
				 startDate = outputFormatter.format(fromDate);
				componentHistory.setFromDate(fromDate);
					 componentHistory.setStatus("Installed Unit");

				 
			 }

			 item.setId(String.valueOf(count++));
			 item.setContent("");
			
			 if(componentHistory.getTodate()!=null){
				 endDate = outputFormatter.format(componentHistory.getTodate()) ;
			 }else{
				 endDate = outputFormatter.format(new Date());
			 }
			 if(componentHistory.getStatus().toString().equalsIgnoreCase("Removed")){
				 item.setClassName("negative");
				// item.setType("background");
				 item.setType("range");
				 popup = "Classification : "+componentHistory.getComponent().getClassification().toString();
				 popup = popup +"<br/>Description : "+ componentHistory.getComponent().getDescription().toString();
				 popup = popup +"<br/>Tail No : "+ componentHistory.getComponent().getTailNo().toString();
//				 popup = popup +"<br/>HI_DTE : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HI_STA : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HI_DEPT : "+ componentHistory.getComponent().getDescription().toString();
				 popup = popup +"<br/>Removal Date : "+ componentHistory.getFromDate().toString();
				 popup = popup +"<br/>Removal Station : "+ componentHistory.getMaint_stn().toString();
				 popup = popup +"<br/>Removal Department : "+ componentHistory.getDept().toString();
				 String removalreason = null;
				 if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("01")){
					 removalImage = "redTriangle";
					 removalreason = "SCHEDULED REMOVAL / INSTALLATION";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("02")){
					 removalImage = "yellowTriangle";
					 removalreason = "PREMATURE REMOVAL / INSTALLATION";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("03")){
					 removalImage = "Others";
					 removalreason = "PART REMOVED FOR CONVENIENCE";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("04")){
					 removalImage = "Others";
					 removalreason = "CANNED PART TO INST ON ANOTHER A/C";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("05")){
					 removalImage = "Others";
					 removalreason = "INSTALLATION ONLY   ** NO PART REMOVED **";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("06")){
					 removalImage = "Others";
					 removalreason = "REMOVAL ONLY    ** NO PART INSTALLED **";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("07")){
					 removalImage = "Others";
					 removalreason = "SWAP COMPONENT POSITIONS";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("08")){
					 removalImage = "Others";
					 removalreason = "REPLACEMENT OF CANNIBALIZED PART";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("09")){
					 removalImage = "Others";
					 removalreason = "EO, AD, FCD, INSP \"P\" PREFACED CPNS ONLY";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("10")){
					 removalImage = "Others";
					 removalreason = "SUB-ASSY REMOVED WITH ASSY";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("12")){
					 removalImage = "Others";
					 removalreason = "FOUND AT LINE / HANGAR";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("13")){
					 removalImage = "Others";
					 removalreason = "FAILED OPS CK & REPLACED WITH SERVICEABLE";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("14")){
					 removalImage = "Others";
					 removalreason = "FAILED OPS CK & ORIGINAL UNIT REINSTALLED";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("17")){
					 removalImage = "Others";
					 removalreason = "MISCELLANEOUS";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("18")){
					 removalImage = "Others";
					 removalreason = "SUB COMP REMOVED FROM AN UNINST MAJOR ASSY";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("23")){
					 removalImage = "Others";
					 removalreason = "INSTALL BORROWED PART AND REMOVED FEDEX PART";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("24")){
					 removalImage = "Others";
					 removalreason = "REMOVE BORROWED PART AND INSTALL FEDEX PART";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("25")){
					 removalImage = "Others";
					 removalreason = "BORROWED PART   ** INSTALLATION ONLY **";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("26")){
					 removalImage = "Others";
					 removalreason = "BORROWED PART   ** REMOVAL ONLY **";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("27")){
					 removalImage = "Others";
					 removalreason = "INSTALL ONLY FOR LOG CORRECTION";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("28")){
					 removalImage = "Others";
					 removalreason = "REMOVAL ONLY FOR LOG CORRECTION";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("29")){
					 removalImage = "Others";
					 removalreason = "CANNIBALIZED SUB-ASSY FOR ANOTHER A/C OR ASSY";
				 }else if(componentHistory.getStatus_reason().toString().equalsIgnoreCase("70")){
					 removalImage = "Others";
					 removalreason = "DAMAGED DURING INSTALLATION";
				 }else{
					 removalImage = "Others";
					 removalreason = "NO REASON";
				 }
				 popup = popup +"<br/>Removal Reason : "+ removalreason;
//				 popup = popup +"<br/>HS_STA : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_DEPT : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_REPAIR_TYPE : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_REPAIR_ODR_NBR : "+ componentHistory.getComponent().getDescription().toString();
				 
				 int getRepairindex = componentHisList.indexOf(componentHistory);
//				 System.out.println(getRepairindex + " "+componentHisList.size());
//				 System.out.println(componentHisList.get(getRepairindex) + " "+componentHistory);
				 if((componentHisList.size()-1)!=getRepairindex){
					 if(componentHisList.get(getRepairindex+1).getStatus().toString().contains("Repair")){
						 
						 popup = popup +"<br/>Repair Date : "+ componentHisList.get(getRepairindex+1).getTodate().toString();
						 popup = popup +"<br/>Repair Station : "+ componentHisList.get(getRepairindex+1).getMaint_stn().toString();
						 popup = popup +"<br/>Repair Department : "+ componentHisList.get(getRepairindex+1).getDept().toString();
						 popup = popup +"<br/>Repair Service Order Number : "+ componentHisList.get(getRepairindex+1).getStatus_reason().toString();
						 String RepairReason = null;
						 if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair A")){
							 RepairReason = "Altered";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair B")){
							 RepairReason = "Beyond Econ.Repair";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair C")){
							 RepairReason = "Calibration";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair D")){
							 RepairReason = "Rebuild";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair G")){
							 RepairReason = "Recharge";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair H")){
							 RepairReason = "Hydrostatic";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair I")){
							 RepairReason = "Inspection";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair M")){
							 RepairReason = "Modification";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair N")){
							 RepairReason = "New";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair O")){
							 RepairReason = "Overhaul";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair P")){
							 RepairReason = "Prototype";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair R")){
							 RepairReason = "Repair";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair T")){
							 RepairReason = "Bench Check (Test)";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair W")){
							 RepairReason = "Weight Check";
						 }else if(componentHisList.get(getRepairindex+1).getStatus().toString().equalsIgnoreCase("Repair X")){
							 RepairReason = "Exhange Unit";
						 }else{
							 RepairReason = "No Reason Available";
						 }
						 
						 
						 
						 popup = popup +"<br/>Repair Type : "+ RepairReason;
						 
					 } 
				 }
//				 if(componentHisList.size()!=getRepairindex){
//				 if(componentHisList.get(getRepairindex+1).getStatus().toString().contains("Repair")){
//					 System.out.println("Add repair in removal");
//				 }
//				 }
				 item.setContent("<div style=\"height: 15px;\"><img class='"+removalImage+"' title=\""+popup+"\" src=\"img/"+removalImage+".png\" style=\"width: 15px; position : absolute; height: 15px;\"></div>");
//				 item.setContent("<div style=\"height: 15px;\"><img title=\"<span style='color:blue'>That's what this widget is<br/> test</span>\" src=\"img/triangle.png\" style=\"width: 15px; height: 15px;\"></div>");
//				 item.setTitle("this is test title");
			 }else if(componentHistory.getStatus().toString().equalsIgnoreCase("Installed Unit")){
				 item.setClassName("positive");
				 //item.setType("background");
				 popup = "Classification : "+componentHistory.getComponent().getClassification().toString();
				 popup = popup +"<br/>Description : "+ componentHistory.getComponent().getDescription().toString();
				 popup = popup +"<br/>Sub Fleet No : "+ componentHistory.getComponent().getSubfleetNo().toString();
				 if(componentHistory.getComponent().getMfgPartNo() != null){
				 popup = popup +"<br/>Manufacturing Part No : "+ componentHistory.getComponent().getMfgPartNo().toString();
				 }
				 popup = popup +"<br/>Tail No : "+ componentHistory.getComponent().getTailNo().toString();
				 popup = popup +"<br/>Installation Date : "+ installationDate;
				 popup = popup +"<br/>Installation Station : "+ componentHistory.getMaint_stn().toString();
				 popup = popup +"<br/>Installation Department : "+ componentHistory.getDept().toString();
//				 popup = popup +"<br/>HR_DTE : "+ componentHistory.getFromDate().toString();
//				 popup = popup +"<br/>HR_STA : "+ componentHistory.getMaint_stn().toString();
//				 popup = popup +"<br/>HR_DEPT : "+ componentHistory.getDept().toString();
//				 popup = popup +"<br/>HR_REASON : "+ componentHistory.getStatus_reason().toString();
//				 popup = popup +"<br/>HS_STA : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_DEPT : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_REPAIR_TYPE : "+ componentHistory.getComponent().getDescription().toString();
//				 popup = popup +"<br/>HS_REPAIR_ODR_NBR : "+ componentHistory.getComponent().getDescription().toString();
				 item.setTitle(popup);;
			 }
			 
			 item.setStart(startDate);
			 item.setEnd(endDate);
			 item.setGroup(componentHistory.getComponent().getComponentID().toString());
			 if(!componentHistory.getStatus().toString().contains("Repair")){
				 itemList.add(item);
			 }
		 }
		 
		 List<ComponentHistoryGroupVO> groupList = new ArrayList<ComponentHistoryGroupVO>(groupSet);
		 componentList.setGroupList(groupList);
		 componentList.setItemList(itemList);
		 return componentList;
		 
		
		
		
	}
	
	
	public List<Object> getRemovedComponents(Date fromDate, Date toDate){
		String status = "Removed";
		String ataValAsNull ="null";
		
		List<Object>  compHis = compHisRepository.getRemovedComponents(fromDate, toDate,status,ataValAsNull);
		
		List<Object>  compHisATA = new ArrayList<Object>();
		int i=0;
		for(Object temp:compHis){
			if(i == 10){
				break;
			}
			compHisATA.add(temp);
			i++;
	
		}
		//system.out.println("From date"+fromDate+"to date "+toDate);
		
		
		return compHisATA;
	}
	
	
	
	

	public List<Object> getRemovedComponentsMFG(Date fromDate, Date toDate){
		String status = "Removed";
		String mfgValAsNull ="null";
			
		List<Object>  compHis = compHisRepository.getRemovedComponentsMFG(fromDate, toDate,status,mfgValAsNull);
		
		List<Object>  compHisCPN = new ArrayList<Object>();
		int i=0;
		for(Object temp:compHis){
			if(i == 10){
				break;
			}
			compHisCPN.add(temp);
			i++;
	
		}
		//system.out.println("value"+compHisCPN.size());
		
		
		
		
		
		return compHisCPN;
	}

	

	
	public List<Object> getRemovedComponentsCPNSerial(Date fromDate, Date toDate){
		String status = "Removed";
		String cpnSerialValAsNull ="null";
			
		List<Object>  compHis = compHisRepository.getRemovedComponentsCPNSerial(fromDate, toDate,status,cpnSerialValAsNull);
		List<Object>  compHisCPNSerial = new ArrayList<Object>();
		int i=0;
		for(Object temp:compHis){
			if(i == 10){
				break;
			}
			

			compHisCPNSerial.add(temp);
			i++;
	
		}
		//system.out.println("value"+compHisCPNSerial.size());
		return compHisCPNSerial;
	}
	
	
	
	
	public List<Object> getRemovedComponentsTailNoOfRemoval(Date fromDate, Date toDate){
		String status = "Removed";
		String tailRemovalValAsNull ="null";
			
		List<Object>  compHis = compHisRepository.getRemovedComponentstailRemoval(fromDate, toDate,status,tailRemovalValAsNull);
		List<Object>  compHisCPNSerial = new ArrayList<Object>();
		int i=0;
		for(Object temp:compHis){
			if(i == 10){
				break;
			}
			

			compHisCPNSerial.add(temp);
			i++;
	
		}
		//system.out.println("value"+compHisCPNSerial.size());
		return compHisCPNSerial;
	}
	
	
	public List<Object> getRemovedComponentsTail(Date fromDate, Date toDate){
		String status = "Installed Unit";
		String tailValAsNull ="null";
			
		//system.out.println("From Date "+fromDate+" To Date"+toDate);
		
		List<Object>  compHis = compHisRepository.getRemovedComponentsTail(fromDate, toDate,status,tailValAsNull);
		
		//system.out.println("in service"+compHis);
		for(int i=0;i<compHis.size();i++){
			//system.out.println("single object"+compHis.getClass());
			
			
		}
/*		for(ComponentHistory emp:compHis){
			//system.out.println("single object"+emp);
		}
	*/
		List<Object>  compHisTail = new ArrayList<Object>();
		int i=0;
		for(Object temp:compHis){
			if(i == 10){
				break;
			}
			compHisTail.add(temp);
			
			
			//system.out.println("in service"+temp);
			i++;
	
		}
		//system.out.println("value"+compHisTail.size());
		
		
		return compHisTail;
	}
	public boolean isValidLogin(String userName, String password){
		
		//system.out.println("username "+userName+" password "+password);
		int  loginCount = loginRepository.getLoginVerified(userName, password);
		//System.out.println("login resulty"+loginCount);
		if(loginCount == 1){
			return true;	
		}
		return false;	
	}
	
	
	public int updateFilter(Filter filter) {
		long defaultFilterId;
		//system.out.println("Update Filter "+filter.getFilterID());
		
		defaultFilterId=filterRepository.getDefaultFilter().getFilterID();
		System.out.println("default id :"+defaultFilterId);
		System.out.println("fetch id :"+filter.getFilterID());
		
		filterRepository.updateDefaultFilter(defaultFilterId);
		filterRepository.updateFilter(filter.getFromDate(),filter.getToDate(),filter.getSelectedFleets(),filter.getSelectedSubfleets(),
				filter.getSelectedTails(),filter.getSelectedCPNs(),filter.getSelectedMFGs(),filter.getSelectedATAs(), filter.getFilterName());
   //system.out.println("Update Filter "+filter.getFilterID());
		
		return filterRepository.updateFilterBy(filter.getFilterBy().isInstalledUnit(),filter.getFilterBy().isNewUnit(),filter.getFilterBy().isRemovedUnit(),filter.getFilterID());

		
	}


	public List<Component> getComponentIdMGFSerial(String mfgSerial,Date fromDate, Date toDate) {

		final List<Component> component = compRepository.getComponentIdMGFSerialNo(mfgSerial,fromDate,toDate);
		return component;
	}
	
	
	
	

	public List<Component> getComponentIdMGFPart(String mfgPart) {

		final List<Component> component = compRepository.getComponentIdMGFPartNo(mfgPart);
		return component;
	}

	@Override
	public List<Long> getComponentIdMGFSerialNo(String mfgSerial, Date fromDate, Date toDate) {
		// TODO Auto-generated method stub
		String status = "Removed";
		
		
		final List<Long> component = compHisRepository.getComponentIdMGFSerialNo(mfgSerial, status, fromDate, toDate);
	
		
		return component;
	}

	@Override
	public List<Long> getComponentIdMGFPartNo(String mfgPart, Date fromDate, Date toDate) {
		// TODO Auto-generated method stub
String status = "Removed";
		
		
		final List<Long> component = compHisRepository.getComponentIdMGFPartNo(mfgPart, status, fromDate, toDate);
	
		
		return component;
	}

	@Override
	public List<Long> getComponentIdATASystem(String ataSystem, Date fromDate, Date toDate) {
		// TODO Auto-generated method stub
String status = "Removed";
		
		
		final List<Long> component = compHisRepository.getComponentIdATASystem(ataSystem, status, fromDate, toDate);
	
		
		return component;
	}

	@Override
	public List<Long> getComponentIdTailNo(String tail, Date fromDate, Date toDate) {
		// TODO Auto-generated method stub
String status = "Removed";
		
		
		final List<Long> component = compHisRepository.getComponentIdTailNo(tail, status, fromDate, toDate);
		return component;
	}

	@Override
	public List<Object> getFailureData() {
		List<Object> failureData=compRepository.getFailureProbability();
		return failureData;
	}


	

}
