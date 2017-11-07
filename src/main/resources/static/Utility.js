var filters=[];
var checkedStatus = [];
var AllData=[];
var filteredData=[];
var sortChecked=null;
var globalData=[]
var removalData=[]
var fleets=[];
var subfleets=[];
var atas=[];
var tails=[];
var cpns=[];
var mfgs=[];
var loadvalue=[];
var filterID;

	

/* Function Name: functionFromDate
 * Return Type : void
 * Description: 
 * Author: Suman Pandey
 * Date:18-10-2016
 */	


function functionFromDate(){
	var fromDate=document.getElementById("fromDate").value;       
	var toDate=document.getElementById("toDate").value;
	clearData();
	getComponent(fromDate,toDate); 	
}


var check= function(){
	$.ajax({
		url : "/check",
		success : function(data) {                     
		}

	});
}


var removalReport= function(){
	
	////////////////////alert('hi I m nin removal report');
	$.ajax({
		url : "/splashScreen",
		success : function(data) {  
			removalData=data;
			////////////////////alert(JSON.stringify(data));
		}

	});
	
	////////////////////alert( "length"+removalData.length)
}


/* Function Name: getComponent
 * Return Type : void
 * Description: 
 * Author: Suman Pandey
 * Date:18-10-2016
 */	
var getComponent = function(start,end){
////////////////////////alert('I m in getcomponent');

	$.ajax({
		url : "/loadComponent/" + start + "/" + end,
		success : function(data) {
		
			AllData=data;
			filteredData=data;
			////////////alert("filteredData "+filteredData.length+"actuall data"+data.length);
			////////////alert("load length"+loadvalue.length)
			if(checkedStatus != 0){
				filterStatus();
				if(loadvalue.length !=0)
				populateSavedFilterdData();
				
			}else{
				if(loadvalue.length !=0)
					populateSavedFilterdData();
					
			}	
		}
	});
}




/* Function Name: PushToSelectedList
 * Return Type : void
 * Description: This method is used to selected and move the data from the first select box to second
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */	
function PushToSelectedList(SelectId,pushId){
	var SelectedId=document.getElementById(SelectId);	

	 var result = [];
var options = SelectedId && SelectedId.options;
var opt;

for (var i=0, iLen=options.length; i<iLen; i++) {
  opt = options[i];

  if (opt.selected) {
    result.push(opt.value || opt.text);
  }	
}



var x=document.getElementById(pushId);
	for (var i = 0; i < result.length; i++){
		
	
				
				 var option = document.createElement("option");
				 option.text = result[i];
				
				 x.add(option);
			}
	
	
	
	var y=document.getElementById(SelectId);
	for (var i = 0; i < y.length; i++){
		
		for(var j = 0; j < result.length; j++){
		  if (y.options[i].value == result[j]){
		

			  y.remove(i);
		  }
		}
		  }
	
	
		
	} 
	
/* Function Name: ClearSelectedList
 * Return Type : void
 * Description: This method is used to selected and move the data from the second select box to first select box
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */	
function ClearSelectedList(SelectId,pushId){
	var SelectedId=document.getElementById(SelectId);	

	 var result = [];
var options = SelectedId && SelectedId.options;
var opt;

for (var i=0, iLen=options.length; i<iLen; i++) {
  opt = options[i];

  if (opt.selected) {
    result.push(opt.value || opt.text);
  }	
}	

var x=document.getElementById(SelectId);
	for (var i = 0; i < x.length; i++){
		
		for(var j = 0; j < result.length; j++){
		  if (x.options[i].value == result[j]){
		
			  x.remove(i);
		  }
		}
		  }
	
	
	var y=document.getElementById(pushId);
	for (var i = 0; i < result.length; i++){
		
	
				
				 var option = document.createElement("option");
				 option.text = result[i];
				
				 y.add(option);
			}		
	} 

/* Function Name: disableAfterSubmit
 * Return Type : void
 * Description: Disabling after submit
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function disableAfterSubmit(listValues){
	
	
	for(i=0;i<listValues.length;i++){
	
	document.getElementById(listValues[i]).disabled = true;
	}
	} 


/* Function Name: getFleets
 * Return Type : void
 * Description: When Fleet Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getFleets(){

	
	
	var fleetSelected=document.getElementById("fleetValue");	
	var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var result = [];
	


	var temp=filteredData;
	filteredData=[];
	

	
	var result = [];
    
    for (var i = 0; i < fleetSelected.length; i++) {
    	result.push(fleetSelected.options[i].value);
    }
   
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].subfleetNo){
				filteredData.push(temp[j]);
				}
	}
    
    disableAfterSubmit(listFleet);
}

/* Function Name: getSubFleets
 * Return Type : void
 * Description: When Sub Fleet Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getSubFleets(){

	
	var subFleetSelected=document.getElementById("subfleetValue");	
	var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var listSubFleet= ["subfleetNo", "subfleetValue", "subfleetPush", "subfleetClear", "subfleetSubmit"];
	var result = [];
	////////////////////alert(filteredData.length+"length");
	var temp=filteredData;
	filteredData=[];
	////////////////////alert(filteredData.length+"length after empty");
	
	var result = [];
    
    for (var i = 0; i < subFleetSelected.length; i++) {
    	result.push(subFleetSelected.options[i].value);
    }
    ////////////////////alert("Result value"+result)
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].subfleetNo){
				filteredData.push(temp[j]);
				}
	}

    ////////////////////alert("sublfeet length" +filteredData.length )
    disableAfterSubmit(listFleet);
	disableAfterSubmit(listSubFleet);
	
}



/* Function Name: getTailNo
 * Return Type : void
 * Description: When Tail Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getTailNo(){
	var fleetSelected=document.getElementById("tailValue");	
	var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var listSubFleet= ["subfleetNo", "subfleetValue", "subfleetPush", "subfleetClear", "subfleetSubmit"];
	var listTail= ["tailNo", "tailValue", "tailPush", "tailClear", "tailSubmit"];
	
	////////////////////alert(filteredData.length+"length");
	var temp=filteredData;
	filteredData=[];
	////////////////////alert(filteredData.length+"length after empty");
	
	var result = [];
    
    for (var i = 0; i < fleetSelected.length; i++) {
    	result.push(fleetSelected.options[i].value);
    }
    ////////////////////alert("Result value"+result)
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].tailNo){
				filteredData.push(temp[j]);
				}
	}
    
    disableAfterSubmit(listFleet);
	disableAfterSubmit(listSubFleet);
	disableAfterSubmit(listTail);
	
}

/* Function Name: getATASystemNo
 * Return Type : void
 * Description: When ATA System Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getATASystemNo(){
	var fleetSelected=document.getElementById("ataValue");
	var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var listSubFleet= ["subfleetNo", "subfleetValue", "subfleetPush", "subfleetClear", "subfleetSubmit"];
	var listata= ["ataSystemNo", "ataValue", "ataPush", "ataClear", "ataSubmit"];
	var listTail= ["tailNo", "tailValue", "tailPush", "tailClear", "tailSubmit"];
	
	////////////////////alert(filteredData.length+"length");
	var temp=filteredData;
	filteredData=[];
	////////////////////alert(filteredData.length+"length after empty");
	
	var result = [];
    
    for (var i = 0; i < fleetSelected.length; i++) {
    	result.push(fleetSelected.options[i].value);
    }
    ////////////////////alert("Result value"+result)
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].ataSystemNo){
				filteredData.push(temp[j]);
				}
	}
    
    disableAfterSubmit(listFleet);
	disableAfterSubmit(listSubFleet);
	disableAfterSubmit(listTail);
	disableAfterSubmit(listata);
}



/* Function Name: getCompanyPartNo
 * Return Type : void
 * Description: When Company Part Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getCompanyPartNo(){
	var cpnSelected=document.getElementById("companyValue");	
    var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var listSubFleet= ["subfleetNo", "subfleetValue", "subfleetPush", "subfleetClear", "subfleetSubmit"];
	var listTail= ["tailNo", "tailValue", "tailPush", "tailClear", "tailSubmit"];
	var listATA= ["ataSystemNo", "ataValue", "ataPush", "ataClear", "ataSubmit"];	
	var listCPN= ["companyPartNo", "companyValue", "companyPush", "companyClear", "companySubmit"];
	var result = [];
	
	
	////////////////////alert(filteredData.length+"length");
	var temp=filteredData;
	filteredData=[];
	////////////////////alert(filteredData.length+"length after empty");
	
    
    for (var i = 0; i < cpnSelected.length; i++) {
    	result.push(cpnSelected.options[i].value);
    }
    ////////////////////alert("Result value"+result)
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].companyPartNo){
				filteredData.push(temp[j]);
				}
	}
    
    disableAfterSubmit(listFleet);
	disableAfterSubmit(listSubFleet);
	disableAfterSubmit(listTail);
	disableAfterSubmit(listATA);
	disableAfterSubmit(listCPN);
}



/* Function Name: getMFGPartNo
 * Return Type : void
 * Description: When MFG Part Number values are selected and submitted
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
function getMFGPartNo(){

	var mfgSelected=document.getElementById("mfgValue");	
	var listFleet = ["fleetNo", "fleetValue", "fleetPush", "fleetClear", "fleetNoSubmit"];
	var listSubFleet= ["subfleetNo", "subfleetValue", "subfleetPush", "subfleetClear", "subfleetSubmit"];
	var listTail= ["tailNo", "tailValue", "tailPush", "tailClear", "tailSubmit"];
	var listATA= ["ataSystemNo", "ataValue", "ataPush", "ataClear", "ataSubmit"];	
	var listCPN= ["companyPartNo", "companyValue", "companyPush", "companyClear", "companySubmit"];
	var listMFG= ["mfgPartNo", "mfgValue", "mfgPush", "mfgClear", "mfgSubmit"];
	
	////////////////////alert(filteredData.length+"length");
	var temp=filteredData;
	filteredData=[];
	////////////////////alert(filteredData.length+"length after empty");
	
	var result = [];
    
    for (var i = 0; i < mfgSelected.length; i++) {
    	result.push(mfgSelected.options[i].value);
    }
    ////////////////////alert("Result value"+result)
	
		for(var i = 0; i < result.length; i++)
			for(var j=0;j<temp.length;j++){
				if(result[i] == temp[j].mfgPartNo){
				filteredData.push(temp[j]);
				}
	}
    
    disableAfterSubmit(listFleet);
	disableAfterSubmit(listSubFleet);
	disableAfterSubmit(listTail);
	disableAfterSubmit(listATA);
	disableAfterSubmit(listCPN);
	disableAfterSubmit(listMFG);
	
	

	
}





/* Function Name: clearData
 * Return Type : void
 * Description: used to clear all value when data range is selected
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */

function clearData()
{
	var selectBox=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
	var selectValue=["fleetValue", "subfleetValue", "ataValue", "tailValue", "companyValue", "mfgValue"];
	for(var i=0;i<selectBox.length;i++){
	document.getElementById(selectBox[i]).options.length=0
	document.getElementById(selectValue[i]).options.length=0
	document.getElementById(selectValue[i]).disabled=false;
}

}


/*function getFilterValue(){
	
	var  filterID = $('#filterId').val();
	var  filterName = $('#filterName').val();
	var fromDate =  $('#fromDate').val();
	var toDate =  $('#toDate').val();
	//var sortByEle = document.getElementById("sortBy");
	//var sortBySelected = sortByEle.options[sortByEle.selectedIndex].value;
	
	var installedUnit= document.getElementById("installedUnit").checked ? true:false;
	var newUnit =  document.getElementById("newUnit").checked ? true:false;
	var removedUnit =   document.getElementById("removedUnit").checked ? true:false;
	
	//////////////////////alert(removedUnit);
	//var problemUnit =  document.getElementById("problemUnit").checked ? true:false;
	//var overhauledUnit =   document.getElementById("overhauledUnit").checked ? true:false;
   	 var filterJson = {"filterID" :filterID, "filterName":filterName, "fromDate":fromDate,"toDate":toDate, "sortBy": sortChecked, "filterBy":{ "newUnit":newUnit, "removedUnit":removedUnit, "installedUnit":installedUnit, "problemUnit" :problemUnit , "overhauledUnit":overhauledUnit} };
	 return  JSON.stringify(filterJson)
}



 Function Name: saveFilter
 * Return Type : void
 * Description: Save the filter into database
 * Author: Suman Pandey
 * Date:18-10-2016
 
var saveFilter = function(){
	var info=''
		var msgType="msg";
	
	if(isValidSaveForm())
		{
	var  filterName = $('#filterName').val();
	var  fromDate = $('#fromDate').val();
	var toDate =  $('#toDate').val();
//////////////////////alert(JSON.stringify(getFilterValue()));
		$.ajax({
			 type : "POST",
			 contentType : "application/json",
			 url : "/saveFilter",
			 data : getFilterValue(),
			 dataType : 'json',
	         success : function(data) { 
	         }
	         
	  });
		 info="Filter saved successfully"
			
	display(info,msgType);

	}

} */


/*//Suman
var saveAsDefaultFilter = function(){
	//////////////////////////////alert(getFilterValue());
	$.ajax({
		 type : "POST",
		 contentType : "application/json",
		 url : "/saveAsDefaultFilter",
		 data : getFilterValue(),
		 dataType : 'json',
         success : function(data) {
                
                
         }
         
  });
	
}*/


var getFilters = function(){
//////////////////////alert('hi');
	$.ajax({
		url : "/getFilters",
		success : function(data) {
			//////////////////////////////alert(data);
			filters=data;
			//////////////////////alert(JSON.stringify(data));
		}

	});

}







/* Function Name: loadFilterList
 * Return Type : void
 * Description: list the filters into popups those are already saved in the database
 * Author: Manwar Singh
 * Date:17-10-2016
 */
/*function loadFilterList()
{
	$("#filterListTable tr").remove(); // clear all the data from the filterlist table for creating the fresh tables
	$.ajax({
		url: '/getFilters',             
	}).done(function (filterList) {
		filters=filterList
		var tr=[];
		tr.push('<tr style="color:#009688;">');
		tr.push("<th>Filter Name</th>");
		tr.push("<th>Start Date (yyyy-mm-dd)</th>");
		tr.push("<th>End  Date (yyyy-mm-dd)</th>");
		tr.push('</tr>');
	
		var preText= "onclick=loadFilter('"
			var postText="')>"
				for (var i = 0; i < filterList.length; i++) {
					var filter=filterList[i].filterName;
					tr.push('<tr">');
					tr.push("<td><a href='#'"+preText+filter+postText+filter + "</a></td>");  //onclick=loadFilter('selectedFilter');
					tr.push("<td>"+filterList[i].fromDate+"</td>");
					tr.push("<td>"+filterList[i].toDate+"</td>");
					tr.push('</tr>');
				}
		$('table[id=filterListTable]').append($(tr.join('')));
	});
}

*/
/* Function Name: loadRecentFilter
 * Return Type : void
 * Description: load the filter into the unitbased filter editor, selected by user from the filters list which is showed in popups
 * Author: Manwar Singh
 * Date:17-10-2016
 
function loadFilter(filterName){
	document.getElementById("modelClose").click(); //close the filter list tables popup
	
	var components=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
	var radioId=["fleetRdio", "subFleetRdio", "ataRdio", "tailRdio", "cpnRdio", "mfgRdio"];
	
	
	var filterName;
	clearAll();
	
	for (var i = 0; i < filters.length; i++) {
		var filter=filters[i].filterName;
		if (filter==filterName)
		{
			
			document.getElementById("filterName").value=filterName
			document.getElementById("fromDate").value=filters[i].fromDate;
			document.getElementById("toDate").value=filters[i].toDate;
			//document.getElementById("sortBy").value=filters[i].sortBy
			
		
			
			document.getElementById("installedUnit").checked=filters[i].filterBy.installedUnit;
			document.getElementById("newUnit").checked=filters[i].filterBy.newUnit;
			document.getElementById("removedUnit").checked=filters[i].filterBy.removedUnit;
			//document.getElementById("problemUnit").checked=filters[i].filterBy.problemUnit;
		//	document.getElementById("overhauledUnit").checked=filters[i].filterBy.overhauledUnit;
		}
	}
	

functionsort();

	filterByStatus();
	
	
}

 */


/* Function Name: loadRecentFilter
 * Return Type : void
 * Description: load the last saved filter into the 'Unit based filter editor' screen
 * Author: Manwar Singh
 * Date:17-10-2016
 */
/*function loadRecentFilter()
{
	
	var componentNos=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
	//var radioId=["fleetRdio", "subFleetRdio", "ataRdio", "tailRdio", "cpnRdio", "mfgRdio"];
	var radioValue;
	$.ajax({
		url: '/getFilters',             
	}).done(function (filterList) {
		var filters1=filterList
		filters=filterList
            i=filterList.length-1;
		checkedStatus=[]
		document.getElementById("filterName").value=filters1[i].filterName
		document.getElementById("fromDate").value=filters1[i].fromDate;
		document.getElementById("toDate").value=filters1[i].toDate;
		
		document.getElementById("installedUnit").checked=filters1[i].filterBy.installedUnit;
		document.getElementById("newUnit").checked=filters1[i].filterBy.newUnit;
		document.getElementById("removedUnit").checked=filters1[i].filterBy.removedUnit;
		if(filters1[i].filterBy.installedUnit || filters1[i].filterBy.newUnit || filters1[i].filterBy.removedUnit){
			checkedStatus.push("true");
			
		}
		
		fleetString=filters1[i].selectedFleets;
		subfleetString=filters1[i].selectedSubfleets;
		tailString=filters1[i].selectedTails;
		ataString=filters1[i].selectedATAs;
		mfgString=filters1[i].selectedMFGs;
		cpnString=filters1[i].selectedCPNs;
		
		if(fleetString!=null){
			fleets =fleetString.split(',');
			loadvalue.push(fleets);
		}
		if(subfleetString!=null){
			subfleets =subfleetString.split(',');
			loadvalue.push("fleets");
		}
		if(subfleetString!=null){
			atas =ataString.split(',');
			loadvalue.push("subfleet");
		}
		if(tailString!=null){
			tails =tailString.split(',');
			loadvalue.push("tails");
		}
		if(cpnString!=null){
			cpns =cpnString.split(',');
			loadvalue.push("cpn");
		}
		if(mfgString!=null){
				mfgs =mfgString.split(',');
				loadvalue.push("mfgs");
		}
		
		functionFromDate();
		
		
	});

	

}
*/

 
/* Function Name: isUniqueFilterName
 * Return Type : boolean
 * Description: check filter name with the existing filters list whether it is unique or not 
 * Author: Manwar Singh 
 * Date:17-10-2016
 */
/*function isUniqueFilterName(filterName)
{
	

	for(i=0; i<filters.length; i++)
		{
		 if(filterName==filters[i].filterName)
			 {
			   return false;
			  
			 }
		}
	
    return true;
    
}
*/


/* Function Name: clearAll
 * Return Type : void
 * Description: clear all the data of fields of text boxes, searchboxes, radio buttons, check boxes and lists
 * Author: Manwar Singh
 * Date:17-10-2016
 */
function clearAll()
{
	var submitValues = ["fleetNo", "subfleet", "ata", "tail", "company", "mfg"];
	var btnValues = ["fleet", "subfleet", "ata", "tail", "company", "mfg"];
	var radioBtn= ["fleetRdio", "subFleetRdio", "tailRdio", "ataRdio", "cpnRdio", "mfgRdio"];
	var makeEmpty=["filterName", "fromDate", "toDate", "fleet", "fleet1", "subFleet","subFleet1", "tail", "tail1","ataNo", "ataNo1", "cpnNo","cpnNo1", "mfgNo", "mfgNo1"];
	var selectBox=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
	var selectValue=["fleetValue", "subfleetValue", "ataValue", "tailValue", "companyValue", "mfgValue"];
	fleet = document.getElementById("fleet")
	document.getElementById("filterID").value="";
	
	for(var i=0;i<makeEmpty.length;i++){
		document.getElementById(makeEmpty[i]).value=""
	}
	
	document.getElementById("installedUnit").checked=false
	document.getElementById("newUnit").checked=false
	document.getElementById("removedUnit").checked=false

	for(var i=0;i<selectBox.length;i++){
	document.getElementById(selectBox[i]).options.length=0
	document.getElementById(selectValue[i]).options.length=0
	document.getElementById(selectValue[i]).disabled=false;
	document.getElementById(selectBox[i]).disabled=false;
}
		

	for(var i=0;i<submitValues.length;i++){
		var temp;
		temp=submitValues[i]+'Submit';
		document.getElementById(temp).disabled=false;
		}
	for(var i=0;i<btnValues.length;i++){
		var temp;
		temp=btnValues[i]+'Push';
		document.getElementById(temp).disabled=false;
		
		}
	for(var i=0;i<btnValues.length;i++){
		var temp;
		temp=btnValues[i]+'Clear';
		document.getElementById(temp).disabled=false;
		
		}

	 AllData=[];
	 sortChecked=null;
	 filteredData=[];
	 loadvalue=[];
}


/*
function clearSelectList(list) {
    // when length is 0, the evaluation will return false.
	i=0
    while (i<list.options.length) {
        // continue to remove the first option until no options remain.
        list.remove(i);
    }
}*/



/* Function Name: isValidDisplayReport
 * Return Type : void
 * Description:  check if user is submit the display the report without 
 * Author: Manwar Singh
 * Date:17-10-2016
 */  
function isValidDisplayReport()
{
	fromDate=document.getElementById("fromDate").value
	toDate=document.getElementById("toDate").value
	if(fromDate=='' || toDate=='')
		{
		 display("Please enter the date range","error")
		 return false;
		
		}
		
	return true;
}




/* Function Name: isValidSaveForm
 * Return Type : boolean
 * Description: Validation for save filter form
 * Author: Manwar Singh
 * Date:17-10-2016
 */
 

/*function isValidSaveForm()
{
	
   var errorMsg=""
	   var msgType="error";
   var filterName=document.getElementById("filterName").value
   var fromDate=document.getElementById("fromDate").value
   var toDate=document.getElementById("toDate").value
   if(filterName=='')
   {
   errorMsg="Please enter filter Name"
    display(errorMsg,msgType)
	   
    return false
   }
   else if(/\s/g.test(filterName))
   	{
		errorMsg="No spaces are allowed in filter name"
			display(errorMsg,msgType)
		return false
   	}
   
   if(!isUniqueFilterName(filterName))
	   { 
	   		errorMsg="Please choose different filter name. This name is already exist in database"
	   		 display(errorMsg,msgType)
		    return false
	   }
   if(fromDate=='')
	   {
	   		errorMsg="Please enter From date"
	   		 display(errorMsg,msgType)
		    return false
	   }
   if(toDate=='')
   {
   		errorMsg="Please enter To date"
   		 display(errorMsg,msgType)
	    return false
   }
return true

}*/


/* Function Name: display
 * Return Type : void
 * Description: display the error or information message into popup box
 * Author: Manwar Singh
 * Date:17-10-2016
 */
 
/*
function display(msg,msgType)
{
	
	var modal = document.getElementById('msgModal');
	document.getElementById(msgType).innerHTML=msg;
	var span = document.getElementById("close");
	    modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		document.getElementById(msgType).innerHTML=''
	    modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	    	document.getElementById(msgType).innerHTML=''
	        modal.style.display = "none";
	    }
	}
	
}*/


function searchData(id)
{
	
	
	var idValues = ["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
     if(id==idValues[0]){
    	
    	 fleetData();
     }else if(id==idValues[1]){
    	 subFleetData();
     }else if(id==idValues[2]){
    	 ataData();
     }else if(id==idValues[3]){
    	 tailData();
     }else if(id==idValues[4]){
    	 cpnData();
     }else if(id==idValues[5]){
    	 mfgData();
     }
}


function fleetData()
{
		document.getElementById("fleetNo").options.length=0
		 var searchValue=document.getElementById("fleet").value;
		var text="";
	     var x=document.getElementById("fleetNo");
	     var option = document.createElement("option");
		var r=new Array();
		
		 if(searchValue == "*All" || searchValue == "*all")
			 {  
			 f:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 if(filteredData[i].subfleetNo != "null"){ 
				 for(var z = 0; z < r.length; z++){  
					
					 /* change for fleet model*/
					 
			            /*if(r[z]==filteredData[i].fleetNo) continue f;}  
			        r[r.length] = filteredData[i].fleetNo;
				   option.text = filteredData[i].fleetNo;*/
			            if(r[z]==filteredData[i].subfleetNo) continue f;}  
			        r[r.length] = filteredData[i].subfleetNo;
				   option.text = filteredData[i].subfleetNo;
				   x.add(option);
				 }
				   }
			 }else if(searchValue == ""){
				 document.getElementById("fleetNo").options.length=0;
			 }else{
				 searchValue="^"+searchValue;
				 var patt = new RegExp(searchValue);
				  f1:for(var i=0; i<filteredData.length; i++)
				   {
					  
					  if(patt.test(filteredData[i].subfleetNo)){
			    	 var option = document.createElement("option");
			    	 if(filteredData[i].subfleetNo != "null"){ 
			    	 for(var z = 0; z < r.length; z++){  
			    		
			    		 /* change for fleet model*/
			    			/*if(r[z]==filteredData[i].fleetNo) continue f1;}  
			    						        r[r.length] = filteredData[i].fleetNo;
			    						   option.text = filteredData[i].fleetNo;*/
			    					    	 
				            if(r[z]==filteredData[i].subfleetNo) continue f1;}  
				        r[r.length] = filteredData[i].subfleetNo;
				   option.text = filteredData[i].subfleetNo;
				   x.add(option);
					  }
					  }
				   }
			 }
}


function subFleetData()
{

		document.getElementById("subfleetNo").options.length=0
		 var searchValue=document.getElementById("subFleet").value;
		var text="";
		var r=new Array();
	     var x=document.getElementById("subfleetNo");
	     var option = document.createElement("option");
		
		 if(searchValue == "*All" || searchValue == "*all")
			 {  
			 s:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var z = 0; z < r.length; z++){  
			            if(r[z]==filteredData[i].subfleetNo) continue s;}  
			        r[r.length] = filteredData[i].subfleetNo;
				   option.text = filteredData[i].subfleetNo;
				   x.add(option);
				 
				   }
			 }else if(searchValue == ""){
				 document.getElementById("subfleetNo").options.length=0;
			 }else{
				 searchValue="^"+searchValue;
				 var patt = new RegExp(searchValue);
				  s1:for(var i=0; i<filteredData.length; i++)
				   {
					  
					  if(patt.test(filteredData[i].subfleetNo)){
			    	 var option = document.createElement("option");
			    	 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].subfleetNo) continue s1;}  
				        r[r.length] = filteredData[i].subfleetNo;
				   option.text = filteredData[i].subfleetNo;
				   x.add(option);
					  }
				   }
			 }
}


function ataData()
{
	document.getElementById("ataSystemNo").options.length=0
	 var searchValue=document.getElementById("ataNo").value;
	var text="";
	var r=new Array();
     var x=document.getElementById("ataSystemNo");
     var option = document.createElement("option");
	
	 if(searchValue == "*All" || searchValue == "*all")
		 {  
		 //////////////////////alert("in all")
		 a:for(var i=0; i<filteredData.length; i++){	 
			 var option = document.createElement("option");
			 for(var z = 0; z < r.length; z++){  
		            if(r[z]==filteredData[i].ataSystemNo) continue a;}  
		        r[r.length] = filteredData[i].ataSystemNo;
			   option.text = filteredData[i].ataSystemNo;
			   x.add(option);
			 
			   }
		 }else if(searchValue == ""){
			 document.getElementById("ataSystemNo").options.length=0;
		 }else{
			 searchValue="^"+searchValue;
			 var patt = new RegExp(searchValue);
			 a1:for(var i=0; i<filteredData.length; i++)
			   {
				  if(patt.test(filteredData[i].ataSystemNo)){
		    	 var option = document.createElement("option");
		    	 for(var z = 0; z < r.length; z++){  
			            if(r[z]==filteredData[i].ataSystemNo) continue a1;}  
			        r[r.length] = filteredData[i].ataSystemNo;
			   option.text = filteredData[i].ataSystemNo;
			   x.add(option);
				  }
			   }
		 }
}


function tailData(){
	document.getElementById("tailNo").options.length=0
	 var searchValue=document.getElementById("tail").value;
	var text="";
	var r=new Array();
     var x=document.getElementById("tailNo");
     var option = document.createElement("option");
	
	 if(searchValue == "*All" || searchValue == "*all")
		 {  
		 t:for(var i=0; i<filteredData.length; i++){	 
			 var option = document.createElement("option");
			 for(var z = 0; z < r.length; z++){  
		            if(r[z]==filteredData[i].tailNo) continue t;}  
		        r[r.length] = filteredData[i].tailNo;
			   option.text = filteredData[i].tailNo;
			   x.add(option);
			   }
		 }else if(searchValue == ""){
			 document.getElementById("tailNo").options.length=0;
		 }else{
			 searchValue="^"+searchValue;
			 var patt = new RegExp(searchValue);
			  t1:for(var i=0; i<filteredData.length; i++)
			   { 
				  if(patt.test(filteredData[i].tailNo)){
		    	 var option = document.createElement("option");
		    	 for(var z = 0; z < r.length; z++){  
			            if(r[z]==filteredData[i].tailNo) continue t1;}  
			        r[r.length] = filteredData[i].tailNo;
		    	 option.text = filteredData[i].tailNo;
			   x.add(option);
				  }
			   }
		 }
}


function cpnData()
{
	 document.getElementById("companyPartNo").options.length=0
	 var searchValue=document.getElementById("cpnNo").value;
	var text="";
	var r=new Array();
     var x=document.getElementById("companyPartNo");
     var option = document.createElement("option");
	 if(searchValue == "*All" || searchValue == "*all")
		 {  
		 c:for(var i=0; i<filteredData.length; i++){	 
			 var option = document.createElement("option");
			 for(var z = 0; z < r.length; z++){  
		            if(r[z]==filteredData[i].companyPartNo) continue c;}  
		        r[r.length] = filteredData[i].companyPartNo;
			   option.text = filteredData[i].companyPartNo;
			   x.add(option);
			   }
		 }else if(searchValue == ""){
			 document.getElementById("companyPartNo").options.length=0;
		 }else{
			 searchValue="^"+searchValue;
			 var patt = new RegExp(searchValue);
			  c1:for(var i=0; i<filteredData.length; i++)
			   {
				  if(patt.test(filteredData[i].companyPartNo)){
		    	 var option = document.createElement("option");
		    	 for(var z = 0; z < r.length; z++){  
			            if(r[z]==filteredData[i].companyPartNo) continue c1;}  
			        r[r.length] = filteredData[i].companyPartNo;
			   option.text = filteredData[i].companyPartNo;
			   x.add(option);
				  }
			   }
		 }
}
function mfgData(){
	 document.getElementById("mfgPartNo").options.length=0
	 var searchValue=document.getElementById("mfgNo").value;
	var text="";
	var r=new Array();
     var x=document.getElementById("mfgPartNo");
     var option = document.createElement("option");
	
	 if(searchValue == "*All" || searchValue == "*all")
		 {  
		 m:for(var i=0; i<filteredData.length; i++){	 
			 var option = document.createElement("option");
			 for(var z = 0; z < r.length; z++){  
		            if(r[z]==filteredData[i].mfgPartNo) continue m;}  
		        r[r.length] = filteredData[i].mfgPartNo;
			   option.text = filteredData[i].mfgPartNo;
			   x.add(option);
			   }
		 }else if(searchValue == ""){
			 document.getElementById("mfgPartNo").options.length=0;
		 }else{
			 searchValue="^"+searchValue;
			 var patt = new RegExp(searchValue);
			  m1:for(var i=0; i<filteredData.length; i++){
				  if(patt.test(filteredData[i].mfgPartNo)){
		    	 var option = document.createElement("option");
		    	 for(var z = 0; z < r.length; z++){  
			            if(r[z]==filteredData[i].mfgPartNo) continue m1;}  
			        r[r.length] = filteredData[i].mfgPartNo;
			   option.text = filteredData[i].mfgPartNo;
			   x.add(option);
				  }
			   }
		 }
}


/* Function Name: filterStatus
 * Return Type : void
 * Description: Method used to filter data based on check boxes
 * Author: Balaji Veerappan
 * Date:18-10-2016
 */
 
function filterStatus(){
	filteredData=[];
	checkedStatus=[];
	var installedUnit= document.getElementById("installedUnit")
	var newUnit=document.getElementById("newUnit")
	var removedUnit=document.getElementById("removedUnit")	
	if(installedUnit.checked || newUnit.checked){
			removedUnit.setAttribute("disabled", "true");
		}
	else{
			document.getElementById("removedUnit").disabled= false;
	  }
	if(installedUnit.checked){
		checkedStatus.push( "Installed Unit"); 
	for(var i=0;i<AllData.length;i++){
		 var temp=AllData[i].status;
	//////////////////////alert(" in installed"+AllData[i].status)
		if(AllData[i].status == "Installed Unit"){
			
		filteredData.push(AllData[i])
		}
	}		
	}
	////////////////////alert(" filterdata "+filteredData.length+" checked value "+checkedStatus);
	if(newUnit.checked){
		checkedStatus.push("New Unit"); 
		for(var i=0;i<AllData.length;i++){
			var temp=AllData[i].status;
			var nullCheckMPN = AllData[i].mfgPartNo;
			var nullCheckATA = AllData[i].ataSystemNo;
			if(temp == "New Unit"&& nullCheckMPN != 'null' && nullCheckATA != 'null' )
			filteredData.push(AllData[i])
		}
	}

	if(removedUnit.checked){
		checkedStatus.push("Inactive"); 
		for(var i=0;i<AllData.length;i++){
			var temp=AllData[i].status;
			var nullCheckMPN = AllData[i].mfgPartNo;
			var nullCheckATA = AllData[i].ataSystemNo;
			if(temp == "Inactive" && nullCheckMPN != 'null' && nullCheckATA != 'null' )
			filteredData.push(AllData[i])
			
		}
		installedUnit.setAttribute("disabled", "true");
		newUnit.setAttribute("disabled", "true");
	}
	else
		{
		document.getElementById("installedUnit").disabled= false;
		document.getElementById("newUnit").disabled= false;
		}
	if(checkedStatus.length == 0){
		filteredData=AllData;
	}
	
	////////////alert(" filterdata "+filteredData.length+" checked value "+checkedStatus);
	
}
	 


/* Final return filtered data */

/*function getFilteredData()
{

   ////////////////////alert(filteredData.length)
   return  filteredData;

}
	 */
	 

/*

function getFilterValue(){
	
	var  filterID = $('#filterId').val();
	var  filterName = $('#filterName').val();
	var fromDate =  $('#fromDate').val();
	var toDate =  $('#toDate').val();
	var selectedFleets=document.getElementById("fleetValue");;
	var selectedSubfleets=document.getElementById("subfleetValue");;
	var selectedTails=document.getElementById("tailValue");
	var selectedATAs=document.getElementById("ataValue");
	var selectedCPNs=document.getElementById("companyValue");;
	var selectedMFGs=document.getElementById("mfgValue");;
	var fleets=''
	var subfleets=''
	var tails='';
	var atas=''
	var cpns=''
	var mfgs=''
		
		
		
	
		for(var i=0; i<selectedFleets.length; i++)
		{
		
			fleets=selectedFleets[i].innerHTML+','+fleets
		}
		for(var i=0; i<selectedSubfleets.length; i++)
		{
		
			subfleets=selectedSubfleets[i].innerHTML+','+subfleets
		}
		for(var i=0; i<selectedATAs.length; i++)
		{
		
		    atas=selectedATAs[i].innerHTML+','+atas
		}			
		
	for(var i=0; i<selectedTails.length; i++)
		{
		tails=selectedTails[i].innerHTML+','+tails
		}
	
	for(var i=0; i<selectedCPNs.length; i++)
	{
	
		cpns=selectedCPNs[i].innerHTML+','+cpns
	}
	for(var i=0; i<selectedMFGs.length; i++)
	{
	
		mfgs=selectedMFGs[i].innerHTML+','+mfgs
	}

	
	
	//var sortByEle = document.getElementById("sortBy");
	//var sortBySelected = sortByEle.options[sortByEle.selectedIndex].value;
	
	var installedUnit= document.getElementById("installedUnit").checked ? true:false;
	var newUnit =  document.getElementById("newUnit").checked ? true:false;
	var removedUnit =   document.getElementById("removedUnit").checked ? true:false;
	
	//////////////////////alert(removedUnit);
	//var problemUnit =  document.getElementById("problemUnit").checked ? true:false;
	//var overhauledUnit =   document.getElementById("overhauledUnit").checked ? true:false;
   	 var filterJson = {"filterID" :filterID, "filterName":filterName, "fromDate":fromDate,"toDate":toDate, "sortBy": sortChecked,
   			          "filterBy":{ "newUnit":newUnit, "removedUnit":removedUnit, "installedUnit":installedUnit, "problemUnit" :problemUnit , "overhauledUnit":overhauledUnit},
   	                 "selectedFleets":fleets,"selectedSubfleets":subfleets,"selectedTails":tails,"selectedATAs":atas,"selectedCPNs":cpns,"selectedMFGs":mfgs};
   	 
	 return  JSON.stringify(filterJson)
}
*/


/* Function Name: saveFilter
 * Return Type : void
 * Description: Save the filter into database
 * Author: Suman Pandey
 * Date:18-10-2016
 */
/*var saveFilter = function(){
	var info=''
		var msgType="msg";
	
	if(isValidSaveForm())
		{
	var  filterName = $('#filterName').val();
	var  fromDate = $('#fromDate').val();
	var toDate =  $('#toDate').val();
////////////////////alert(JSON.stringify(getFilterValue()));
		$.ajax({
			 type : "POST",
			 contentType : "application/json",
			 url : "/saveFilter",
			 data : getFilterValue(),
			 dataType : 'json',
	         success : function(data) { 
	         }
	         
	  });
		 info="Filter saved successfully"
			
	      display(info,msgType);

	}

} 



 Function Name: loadFilter
 * Return Type : void
 * Description: load the filter into the unitbased filter editor, selected by user from the filters list which is showed in popups
 * Author: Manwar Singh
 * Date:17-10-2016
 
function loadFilter(filterName)
{
	document.getElementById("modelClose").click(); //close the filter list tables popup
	var components=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
	var radioId=["fleetRdio", "subFleetRdio", "ataRdio", "tailRdio", "cpnRdio", "mfgRdio"];
	var filterName;
	clearAll();
	for (var i = 0; i < filters.length; i++) {
		var filter=filters[i].filterName;
		if (filter==filterName)
		{
			checkedStatus=[]
			document.getElementById("filterName").value=filterName
			document.getElementById("fromDate").value=filters[i].fromDate;
			document.getElementById("toDate").value=filters[i].toDate;
			
			document.getElementById("installedUnit").checked=filters[i].filterBy.installedUnit;
			document.getElementById("newUnit").checked=filters[i].filterBy.newUnit;
			document.getElementById("removedUnit").checked=filters[i].filterBy.removedUnit;
			if(filters[i].filterBy.installedUnit || filters[i].filterBy.newUnit || filters[i].filterBy.removedUnit){
				checkedStatus.push("true");
				
			}
			
			fleetString=filters[i].selectedFleets;
			subfleetString=filters[i].selectedSubfleets;
			tailString=filters[i].selectedTails;
			ataString=filters[i].selectedATAs;
			mfgString=filters[i].selectedMFGs;
			cpnString=filters[i].selectedCPNs;
			
			if(fleetString!=null){
				fleets =fleetString.split(',');
				loadvalue.push(fleets);
			}
			if(subfleetString!=null){
				subfleets =subfleetString.split(',');
				loadvalue.push("fleets");
			}
			if(subfleetString!=null){
				atas =ataString.split(',');
				loadvalue.push("subfleet");
			}
			if(tailString!=null){
				tails =tailString.split(',');
				loadvalue.push("tails");
			}
			if(cpnString!=null){
				cpns =cpnString.split(',');
				loadvalue.push("cpn");
			}
			if(mfgString!=null){
					mfgs =mfgString.split(',');
					loadvalue.push("mfgs");
			}
			
			functionFromDate();
			
			
			//populateSavedFilterdData(fleets,subfleets,atas,tails,cpns,mfgs);
			
			
			
			
			
			//document.getElementById("problemUnit").checked=filters[i].filterBy.problemUnit;
		//	document.getElementById("overhauledUnit").checked=filters[i].filterBy.overhauledUnit;
			
	}
}
	////////////////////alert(" filterdata"+filteredData)
}*/


function populateSavedFilterdData()
{
////////////////////alert("populateSavedFilterdData()");


   if(fleets!=null)
    	{
	   populateSavedFleets();
    	
    	}
    if(subfleets!=null)
	{
	 populateSavedSubFleets();
	
	}
    if(atas!=null)
	{
	  populateSavedATAs();
	
	}
    if(tails!=null)
	{
	  populateSavedTails();
	
	}
    if(cpns!=null)
	{
	  populateSavedCPNs();
	
	}

    if(mfgs!=null)
	{
	  populateSavedMFGs();
	
	}
    loadvalue=[];
    $(".loader").hide();
}

function populateSavedFleets()
{
	
	
	//////////////////////alert("Hi I amin fleet populateFleets")
	x=document.getElementById("fleetValue");
	//////////////////////alert('Fleets length'+fleets.length)
	//////////////////////alert('Fleetdata  length'+filteredData.length)
	//////////////////////alert('tempdata  length'+fleets.length)
	
	/* change for fleet model*/
	/*	var r=new Array();
  
			f:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < fleets.length-1; j++){  
				 if(filteredData[i].fleetNo == fleets[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].fleetNo) continue f;}  
				        r[r.length] = filteredData[i].fleetNo;
					 
					  option.text = filteredData[i].fleetNo;
					   x.add(option);
				 }
				
			 }
	
			}
	
	*/
	var r=new Array();
	  
	s:for(var i=0; i<filteredData.length; i++){	 
		 var option = document.createElement("option");
		 for(var j = 0; j < fleets.length-1; j++){  
		 if(filteredData[i].subfleetNo == fleets[j]){
			 for(var z = 0; z < r.length; z++){  
		            if(r[z]==filteredData[i].subfleetNo) continue s;}  
		        r[r.length] = filteredData[i].subfleetNo;
			 
			  option.text = filteredData[i].subfleetNo;
			   x.add(option);
		 }
		
	 }

	}

	
	
}


function populateSavedSubFleets()
{
	
	
	////////////////////alert("Hi I amin fleet populatesubFleets")
	x=document.getElementById("subfleetValue");
	////////////////////alert('subfleet length'+subfleets.length)
	////////////////////alert('datalength  length'+filteredData.length)
	////////////////////alert('subfleetValue  length'+subfleets.length)
		var r=new Array();
  
			s:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < subfleets.length-1; j++){  
				 if(filteredData[i].subfleetNo == subfleets[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].subfleetNo) continue s;}  
				        r[r.length] = filteredData[i].subfleetNo;
					 
					  option.text = filteredData[i].subfleetNo;
					   x.add(option);
				 }
				
			 }
	
			}
	
	
	
	
	
}


function populateSavedATAs()
{
	

	x=document.getElementById("ataValue");

		var r=new Array();
  
			a:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < atas.length-1; j++){  
				 if(filteredData[i].ataSystemNo == atas[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].ataSystemNo) continue a;}  
				        r[r.length] = filteredData[i].ataSystemNo;
					 
					  option.text = filteredData[i].ataSystemNo;
					   x.add(option);
				 }
				
			 }
	
			}
	
	
	
	
	
}


function populateSavedTails()
{
	
	
	
	x=document.getElementById("tailValue");

		var r=new Array();
  
			t:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < tails.length-1; j++){  
				 if(filteredData[i].tailNo == tails[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].tailNo) continue t;}  
				        r[r.length] = filteredData[i].tailNo;
					 
					  option.text = filteredData[i].tailNo;
					   x.add(option);
				 }
				
			 }
	
			}
	

	
	
}


function  populateSavedCPNs()
{
	
	

	x=document.getElementById("companyValue");
	
		var r=new Array();
  
			c:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < cpns.length-1; j++){  
				 if(filteredData[i].companyPartNo == cpns[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].companyPartNo) continue c;}  
				        r[r.length] = filteredData[i].companyPartNo;
					 
					  option.text = filteredData[i].companyPartNo;
					   x.add(option);
				 }
				
			 }
	
			}
	
	
	
	
	
}


function populateSavedMFGs()
{
	
	
	////////////////////alert("Hi I amin fleet populateSavedFleets")
	x=document.getElementById("mfgValue");
	////////////////////alert('Fleets length'+fleets.length)
	////////////////////alert('Fleetdata  length'+filteredData.length)
	////////////////////alert('tempdata  length'+fleets.length)
		var r=new Array();
  
			m:for(var i=0; i<filteredData.length; i++){	 
				 var option = document.createElement("option");
				 for(var j = 0; j < mfgs.length-1; j++){  
				 if(filteredData[i].mfgPartNo == mfgs[j]){
					 for(var z = 0; z < r.length; z++){  
				            if(r[z]==filteredData[i].mfgPartNo) continue m;}  
				        r[r.length] = filteredData[i].mfgPartNo;
					 
					  option.text = filteredData[i].mfgPartNo;
					   x.add(option);
				 }
				
			 }
	
			}
	
	
	
	
	
}
/*
function getFilteredData()
{
	var fromDate=document.getElementById("fromDate").value;       
	var toDate=document.getElementById("toDate").value;
  componentIds=[];
   //alert("in get fiterdate"+filteredData.length)
  
   for(i=0; i<filteredData.length; i++)
	   {
    

         componentIds[i]=filteredData[i];
         
         
        if(i == 300){
        	 break;
         }
	   }
   comp=filteredData;
   //alert("in get fiterdate"+componentIds.length)
            

           $.ajax({
  			 type : "POST",
  			 contentType : "application/json",
  			 url : "/postComponentIds/"+componentIds+ "/" +fromDate+ "/" +toDate,
  			data : JSON.stringify(componentIds),
  			 dataType : 'json',
  	         success : function(data) { 
  	         //alert("Sucess")
  	         }
  	         
  	  });
  
  

       
      
   $.ajax({
		 type : "POST",
		 url : "/postComponentIds",
		 data : JSON.stringify(componentIds),
		 contentType: "application/json; charset=utf-8",
         success : function(data) { 
         //alert("Sucess")
         }
         
  });
   
   
   $.ajax({
	   type : "POST",
	   contentType : "application/json",
		url : "/testUnitFilter/"+fromDate+ "/" +toDate+ "/" +componentIds, 
		 data : JSON.stringify(componentIds),
			 dataType : 'json',
		   success : function(data) { 
	  	         ////alert("Sucess")
	  	         }
           //////////alert(JSON.stringify(componentIds))
   });

   
}


*/




function getFilteredData()
{
	var fromDate=document.getElementById("fromDate").value;       
	var toDate=document.getElementById("toDate").value;
	var  filterName = $('#filterName').val();
  componentIds=[];
   ////////alert(filteredData.length)
   for(i=0; i<filteredData.length; i++)
	   {
         ////////alert(filteredData[i].componentID)
         componentIds[i]=filteredData[i];
         componentIds[i].ataSystemNo='';
         componentIds[i].tailNo='';
         componentIds[i].companyPartNo='';
         componentIds[i].mfgPartNo='';
         componentIds[i].statusUpdatedDate='';
         componentIds[i].status=''; 
         componentIds[i].fleetNo='';
         componentIds[i].subfleetNo='';
         if(i==300)
        	 break;  
	   }
          
         //alert('Componetes'+componentIds.length)
/*           $.ajax({
  			 type : "POST",
  			 contentType : "application/json",
  			 url : "/postComponentIds/" +fromDate+ "/" +toDate+"/"+filterName,
  			 data : JSON.stringify(componentIds),
  			 dataType : 'json',
  	         success : function(data) { 
  	          alert("Sucess");
  	         window.open('test.html','_self');
  	         },
  	         error: function(data){
  	        	 //alert("internal server error")
  	         }
  	         
  	  });
  */
   
   
   
              $.ajax({
		 type : "POST",
		 contentType : "application/json",
		 url : "/postComponentIds/" +fromDate+ "/" +toDate+"/"+filterName,
		 data : JSON.stringify(componentIds),
		 dataType : 'json',
         success : function(data) { 
        	 
         window.open('test.html','_self');
         },
         error: function(data){
        	 //alert("internal server error")
         }
         
  });
           
           ////////alert(JSON.stringify(componentIds))
   
   
}



function getFilterValue(){
	
	var  filterID1 = document.getElementById("filterID").value;

	
	
	var  filterName = $('#filterName').val();
	var fromDate =  $('#fromDate').val();
	var toDate =  $('#toDate').val();
	var selectedFleets=document.getElementById("fleetValue");
	var selectedSubfleets=document.getElementById("subfleetValue");
	var selectedTails=document.getElementById("tailValue");
	
	var selectedATAs=document.getElementById("ataValue");
	var selectedCPNs=document.getElementById("companyValue");
	var selectedMFGs=document.getElementById("mfgValue");
	var fleets=''
	var subfleets=''
	var tails='';
	var atas=''
	var cpns=''
	var mfgs=''
		  if(!isExistFilter(filterName))
			{
			  filterID1='';
			}
		 
		
		
	
		for(var i=0; i<selectedFleets.length; i++)
		{
		
			fleets=selectedFleets[i].innerHTML+','+fleets
		}
		for(var i=0; i<selectedSubfleets.length; i++)
		{
		
			subfleets=selectedSubfleets[i].innerHTML+','+subfleets
		}
		for(var i=0; i<selectedATAs.length; i++)
		{
		
		    atas=selectedATAs[i].innerHTML+','+atas
		}			
		
	for(var i=0; i<selectedTails.length; i++)
		{
		tails=selectedTails[i].innerHTML+','+tails
		}
	
	for(var i=0; i<selectedCPNs.length; i++)
	{
	
		cpns=selectedCPNs[i].innerHTML+','+cpns
	}
	for(var i=0; i<selectedMFGs.length; i++)
	{
	
		mfgs=selectedMFGs[i].innerHTML+','+mfgs
	}


	
	var installedUnit= document.getElementById("installedUnit").checked ? true:false;
	var newUnit =  document.getElementById("newUnit").checked ? true:false;
	var removedUnit =   document.getElementById("removedUnit").checked ? true:false;
	
	
	//var problemUnit =  document.getElementById("problemUnit").checked ? true:false;
	//var overhauledUnit =   document.getElementById("overhauledUnit").checked ? true:false;
   	 var filterJson = {"filterID" :filterID1, "filterName":filterName, "fromDate":fromDate,"toDate":toDate, "sortBy": sortChecked,
   			          "filterBy":{ "newUnit":newUnit, "removedUnit":removedUnit, "installedUnit":installedUnit/*, "problemUnit" :problemUnit , 
"overhauledUnit":overhauledUnit*/},
   	                 "selectedFleets":fleets,"selectedSubfleets":subfleets,"selectedTails":tails,"selectedATAs":atas,"selectedCPNs":cpns,"selectedMFGs":mfgs};
   	 
   	
	 return  JSON.stringify(filterJson)
}



/* Function Name: saveFilter
 * Return Type : void
 * Description: Save the filter into database
 * Author: Manwar Singh
 * Date:18-10-2016
 */
 function saveFilter(){
		var info=''
     	var  filterName = $('#filterName').val();   	
	if(isValidSaveForm())
		{
			
			  if(isExistFilter(filterName))
			{  var  fromDat = $('#tailValue').val();
				
					
				updateFilter(getFilterValue());	
			}
			  
			  else{
			var  fromDate = $('#fromDate').val();
			var toDate =  $('#toDate').val();
		$.ajax({
			 type : "POST",
			 contentType : "application/json",
			 url : "/saveFilter",
			 data : getFilterValue(),
			 dataType : 'json',
	         success : function(data) { 
	        	
	     			
	         },
	         error : function(error){
	        	       /*info="Internal Server Error"
		     			var msgType="error";
		     			display(info,msgType);*/
	        	 
	         }

	      });
		    info="Filter saved successfully"
 			var msgType="msg";
 			display(info,msgType);
 
			  }
			
	}

} 


 /* Function Name: loadFilterList
  * Return Type : void
  * Description: list the filters into popups those are already saved in the database
  * Author: Manwar Singh
  * Date:17-10-2016
  */
 function loadFilterList()
 {
 	$("#filterListTable tr").remove(); // clear all the data from the filterlist table for creating the fresh tables
 	$.ajax({
 		url: '/getFilters',             
 	}).done(function (filterList) {
 		filters=filterList
 		var tr=[];
 		tr.push('<tr style="color:#009688;">');
 		tr.push("<th>Filter Name</th>");
 		tr.push("<th>Start Date (yyyy-mm-dd)</th>");
 		tr.push("<th>End  Date (yyyy-mm-dd)</th>");
 		tr.push('</tr>');
 				for (var i = 0; i < filterList.length; i++) {
 					var filter=filterList[i].filterName;
 					tr.push('<tr">');
 					tr.push("<td>"+'<a href="#" onclick="loadFilter(\''+filter+'\')">'+filter+'</a>'+"</td>");
 					tr.push("<td>"+filterList[i].fromDate+"</td>");
 					tr.push("<td>"+filterList[i].toDate+"</td>");
 					tr.push('</tr>');
 				}
 		$('table[id=filterListTable]').append($(tr.join('')));
 	});
 }



 /* Function Name: loadRecentFilter
  * Return Type : void
  * Description: load the last saved filter into the 'Unit based filter editor' screen
  * Author: Manwar Singh
  * Date:17-10-2016
  */

 function loadRecentFilter()
 {
 	
 	var componentNos=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
 	//var radioId=["fleetRdio", "subFleetRdio", "ataRdio", "tailRdio", "cpnRdio", "mfgRdio"];
 	var radioValue;
 	$.ajax({
 		url: '/getFilters',             
 	}).done(function (filter) {
 		$(".loader").show();
 		var filters1=filter
 		filters=filter
 		
 		for(i=0;i<filters1.length;i++){
 		if(filters1[i].defaultFilter == true){
 			
 		
 		checkedStatus=[]
 		
 		document.getElementById("filterID").value=filters1[i].filterID;
 		filterID=filters1.filterID
 		////////alert("inside load filter method" + document.getElementById("filterID").value)
 		document.getElementById("filterName").value=filters1[i].filterName
 		document.getElementById("fromDate").value=filters1[i].fromDate;
 		document.getElementById("toDate").value=filters1[i].toDate;
 		
 		document.getElementById("installedUnit").checked=filters1[i].filterBy.installedUnit;
 		document.getElementById("newUnit").checked=filters1[i].filterBy.newUnit;
 		document.getElementById("removedUnit").checked=filters1[i].filterBy.removedUnit;
 		
 		if(filters1[i].filterBy.installedUnit || filters1[i].filterBy.newUnit || filters1[i].filterBy.removedUnit){
 			checkedStatus.push("true");
 			
 		}
 		
 		fleetString=filters1[i].selectedFleets;
 		subfleetString=filters1[i].selectedSubfleets;
 		tailString=filters1[i].selectedTails;
 		ataString=filters1[i].selectedATAs;
 		mfgString=filters1[i].selectedMFGs;
 		cpnString=filters1[i].selectedCPNs;
 		
 		if(fleetString!=null){
 			fleets =fleetString.split(',');
 			loadvalue.push(fleets);
 		}
 		if(subfleetString!=null){
 			subfleets =subfleetString.split(',');
 			loadvalue.push("fleets");
 		}
 		if(subfleetString!=null){
 			atas =ataString.split(',');
 			loadvalue.push("subfleet");
 		}
 		if(tailString!=null){
 			tails =tailString.split(',');
 			loadvalue.push("tails");
 		}
 		if(cpnString!=null){
 			cpns =cpnString.split(',');
 			loadvalue.push("cpn");
 		}
 		if(mfgString!=null){
 				mfgs =mfgString.split(',');
 				loadvalue.push("mfgs");
 		}
 		
 		functionFromDate();
 		$(".loader").show();
 		
 	break;	
 	}
 }
 		
 		
 		
 	});

 	
 	//getAllFilters();
 }



 /* Function Name: isUniqueFilterName
  * Return Type : boolean
  * Description: check filter name with the existing filters list whether it is unique or not 
  * Author: Manwar Singh 
  * Date:17-10-2016
  */
 function isUniqueFilterName(filterName)
 {
 	
 	for(i=0; i<filters.length; i++)
 		{
 		 if(filterName==filters[i].filterName)
 			 {
 			   return false;
 			  
 			 }
 		}
 	
     return true;
     
 }


 /* Function Name: isValidSaveForm
  * Return Type : boolean
  * Description: Validation for save filter form
  * Author: Manwar Singh
  * Date:17-10-2016
  */
  

 function isValidSaveForm()
 {
 	
    var errorMsg=""
    var msgType="error";
    var filterName=document.getElementById("filterName").value
    var fromDate=document.getElementById("fromDate").value
    var toDate=document.getElementById("toDate").value
    if(filterName=='')
    {
    errorMsg="Please enter filter Name"
     display(errorMsg,msgType)
 	   
     return false
    }/*
    else if(/\s/g.test(filterName))
    	{
 		errorMsg="No spaces are allowed in filter name"
 			display(errorMsg,msgType)
 		return false
    	}*/
    
    /*if(!isUniqueFilterName(filterName))
 	   { 
 	   		errorMsg="Please choose different filter name. This name is already exist in database"
 	   		 display(errorMsg,msgType)
 		    return false
 	   }*/
    if(fromDate=='')
 	   {
 	   		errorMsg="Please enter From date"
 	   		 display(errorMsg,msgType)
 		    return false
 	   }
    if(toDate=='')
    {
    		errorMsg="Please enter To date"
    		 display(errorMsg,msgType)
 	    return false
    }
 return true

 }


 /* Function Name: display
  * Return Type : void
  * Description: display the error or information message into popup box
  * Author: Manwar Singh
  * Date:17-10-2016
  */
  
 function display(msg,msgType)
 {
 	
 	var modal = document.getElementById('msgModal');
 	document.getElementById(msgType).innerHTML=msg;
 	var span = document.getElementById("close");
 	    modal.style.display = "block";
 	// When the user clicks on <span> (x), close the modal
 	span.onclick = function() {
 		document.getElementById(msgType).innerHTML=''
 	    modal.style.display = "none";
 	}
 	// When the user clicks anywhere outside of the modal, close it
 	window.onclick = function(event) {
 	    if (event.target == modal) {
 	    	document.getElementById(msgType).innerHTML=''
 	        modal.style.display = "none";
 	    }
 	}
 	
 }
 
 /* check if filter exist or not in databse */

 function isExistFilter(filterName){
 		for(i=0; i<filters.length; i++){
 		if(filterName==filters[i].filterName){
 			return true;
 		}
 	}
 return false;	
 }




 /*  Update filter */

 function updateFilter(filter)
 {
	 	
	 	$.ajax({
	 			 type : "POST",
	 			 contentType : "application/json",
	 			 url : "/updateFilter",
	 			 data : filter,
	 			 dataType : 'json',
	 	         success : function(data) {
	 					////////alert("filter updated");
	 	        	  	
	 	         
	 	         }
	 	  });
	 	info="Filter updated successfully"
            msgType="msg"
            display(info,msgType); 
	 	
	 }

 /* Function Name: loadFilter
  * Return Type : void
  * Description: load the filter into the unitbased filter editor, selected by user from the filters list which is showed in popups
  * Author: Manwar Singh
  * Date:17-10-2016
  */
 function loadFilter(filterName)
 	{
	 	
	 $(".loader").show();
	 
	        // long code here
		 document.getElementById("modelClose").click(); //close the filter list tables popup
		 	var components=["fleetNo", "subfleetNo", "ataSystemNo", "tailNo", "companyPartNo", "mfgPartNo"];
		 	var radioId=["fleetRdio", "subFleetRdio", "ataRdio", "tailRdio", "cpnRdio", "mfgRdio"];
		 	var filterName;
		 	clearAll();
		 	for (var i = 0; i < filters.length; i++) {
		 		var filter=filters[i].filterName;
		 		if (filter==filterName)
		 		{
		 			checkedStatus=[]
		 			document.getElementById("filterID").value=filters[i].filterID
		 			
		 			filterID=filters[i].filterID
		 			document.getElementById("filterName").value=filterName
		 			document.getElementById("fromDate").value=filters[i].fromDate;
		 			document.getElementById("toDate").value=filters[i].toDate;
		 			
		 			document.getElementById("installedUnit").checked=filters[i].filterBy.installedUnit;
		 			document.getElementById("newUnit").checked=filters[i].filterBy.newUnit;
		 			document.getElementById("removedUnit").checked=filters[i].filterBy.removedUnit;
		 			if(filters[i].filterBy.installedUnit || filters[i].filterBy.newUnit || filters[i].filterBy.removedUnit){
		 				checkedStatus.push("true");
		 				
		 			}
		 			fleetString=filters[i].selectedFleets;
		 			subfleetString=filters[i].selectedSubfleets;
		 			tailString=filters[i].selectedTails;
		 			ataString=filters[i].selectedATAs;
		 			mfgString=filters[i].selectedMFGs;
		 			cpnString=filters[i].selectedCPNs;
		 			/*
		 			if(fleetString!=null){
		 				fleets =fleetString.split(',');
		 				loadvalue.push(fleets);
		 			}*/
		 			if(fleetString!=null){
		 				subfleets =subfleetString.split(',');
		 				loadvalue.push("fleets");
		 			}
		 			if(subfleetString!=null){
		 				atas =ataString.split(',');
		 				loadvalue.push("subfleet");
		 			}
		 			if(tailString!=null){
		 				tails =tailString.split(',');
		 				loadvalue.push("tails");
		 			}
		 			if(cpnString!=null){
		 				cpns =cpnString.split(',');
		 				loadvalue.push("cpn");
		 			}
		 			if(mfgString!=null){
		 					mfgs =mfgString.split(',');
		 					loadvalue.push("mfgs");
		 			}
		 			
		 			functionFromDate();
		 			//document.getElementById("problemUnit").checked=filters[i].filterBy.problemUnit;
		 		//	document.getElementById("overhauledUnit").checked=filters[i].filterBy.overhauledUnit;
		 			
		 	}
		 }
	        
	    
	 	
	}



	 


	 
