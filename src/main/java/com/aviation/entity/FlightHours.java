package com.aviation.entity;

public class FlightHours {
	
	public String tail_no;
	public long Flight_hours;
	public String getTail_no() {
		return tail_no;
	}
	public void setTail_no(String tail_no) {
		this.tail_no = tail_no;
	}
	public long getFlight_hours() {
		return Flight_hours;
	}
	public void setFlight_hours(long flight_hours) {
		Flight_hours = flight_hours;
	}
	@Override
	public String toString() {
		return "FlightHours [tail_no=" + tail_no + ", Flight_hours=" + Flight_hours + "]";
	}
	
	
	

}
