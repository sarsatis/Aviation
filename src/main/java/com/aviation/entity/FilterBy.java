package com.aviation.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "filter_by")
public class FilterBy implements Serializable {

	private static final long serialVersionUID = 8962186185912836733L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long filterID;

	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean installedUnit;

	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean newUnit;

	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean removedUnit;

	@Type(type = "org.hibernate.type.NumericBooleanType")
	private boolean overhauledUnit;

	public Long getFilterID() {
		return filterID;
	}

	public void setFilterID(Long filterID) {
		this.filterID = filterID;
	}

	public boolean isInstalledUnit() {
		return installedUnit;
	}

	public void setInstalledUnit(boolean installedUnit) {
		this.installedUnit = installedUnit;
	}

	public boolean isNewUnit() {
		return newUnit;
	}

	public void setNewUnit(boolean newUnit) {
		this.newUnit = newUnit;
	}

	public boolean isRemovedUnit() {
		return removedUnit;
	}

	public void setRemovedUnit(boolean removedUnit) {
		this.removedUnit = removedUnit;
	}

	public boolean isOverhauledUnit() {
		return overhauledUnit;
	}

	public void setOverhauledUnit(boolean overhauledUnit) {
		this.overhauledUnit = overhauledUnit;
	}

}
