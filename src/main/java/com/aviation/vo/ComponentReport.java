package com.aviation.vo;

import java.util.List;

public class ComponentReport {
	private  List<ComponentHistoryGroupVO> groupList ;
	
	List<HisotryComponenItemVO> itemList ;

	public List<ComponentHistoryGroupVO> getGroupList() {
		return groupList;
	}

	public void setGroupList(List<ComponentHistoryGroupVO> groupList) {
		this.groupList = groupList;
	}

	public List<HisotryComponenItemVO> getItemList() {
		return itemList;
	}

	public void setItemList(List<HisotryComponenItemVO> itemList) {
		this.itemList = itemList;
	}

}
