package com.aviation.repository;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.aviation.entity.Component;


public interface ComponentRepository extends CrudRepository<Component, Serializable>{

	@Query("SELECT comp as comp FROM Component comp where comp.statusUpdatedDate between :fromDate and :toDate")
	public List<Component> getComponent(@Param("fromDate")final Date fromDate, @Param("toDate")final Date toDate);
	
	
	@Query("SELECT comp as comp FROM Component comp where comp.mnfgSerialNo= :mfgSerial and comp.statusUpdatedDate between :fromDate and :toDate" )
	public List<Component> getComponentIdMGFSerialNo(@Param("mfgSerial")String mfgSerial,@Param("fromDate")final Date fromDate, @Param("toDate")final Date toDate);
	

	@Query("SELECT comp as comp FROM Component comp where comp.mfgPartNo= :mfgPart")
	public List<Component> getComponentIdMGFPartNo(@Param("mfgPart")String mfgPart);
	
    @Query("SELECT  comp.componentID,comp.cmpySerialNo,comp.failureProbability as failure,comp.description,comp.mfgPartNo FROM Component  comp GROUP BY comp.componentID ORDER BY failure DESC")
    public List<Object> getFailureProbability();
	

}
