package com.ge.bean;

import java.util.Date;

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
	private String Environment;
	
	@Column
	private Date Date;
	
	@Column
	private String EventName;
	
	@Column
	private String EventDetails;
	
	
	public Event() {
		super();
	}
	
	public Event(Integer id, String appName, Date date, String eventName, String eventDetails, String environment) {
		super();
		Id = id;
		AppName = appName;
		Environment = environment;
		Date = date;
		EventName = eventName;
		EventDetails = eventDetails;
	}
	
	
	
	public String getEnvironment() {
		return Environment;
	}

	public void setEnvironment(String environment) {
		Environment = environment;
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
	public Date getDate() {
		return Date;
	}
	public void setDate(Date date) {
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
