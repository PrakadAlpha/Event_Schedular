package com.ge.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Event")		
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer Id;
	
	@Column
	private String AppName;
	
	@Column
	private String Date;
	
	@Column
	private String EventName;
	
	@Column
	private String EventDetails;
	
	
	public Event() {
		super();
	}
	
	public Event(Integer id, String appName, String date, String eventName, String eventDetails) {
		super();
		Id = id;
		AppName = appName;
		Date = date;
		EventName = eventName;
		EventDetails = eventDetails;
	}
	
	public Integer getId() {
		return Id;
	}
	public void setId(Integer id) {
		Id = id;
	}
	public String getAppName() {
		return AppName;
	}
	public void setAppName(String appName) {
		AppName = appName;
	}
	public String getDate() {
		return Date;
	}
	public void setDate(String date) {
		Date = date;
	}
	public String getEventName() {
		return EventName;
	}
	public void setEventName(String eventName) {
		EventName = eventName;
	}
	public String getEventDetails() {
		return EventDetails;
	}
	public void setEventDetails(String eventDetails) {
		EventDetails = eventDetails;
	}
	
	@Override
	public String toString() {
		return "Event [Id=" + Id + ", AppName=" + AppName + ", Date=" + Date + ", EventName=" + EventName
				+ ", EventDetails=" + EventDetails + "]";
	}
	
	
}
