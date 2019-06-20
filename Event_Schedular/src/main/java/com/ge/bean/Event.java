package com.ge.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.FutureOrPresent;

import org.springframework.format.annotation.DateTimeFormat;

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
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column
	private Date startDate;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column
	private Date endDate;
	
	@Column
	private String EventName;
	
	@Column
	private String EventType;
	
	@Column
	private String EventDetails;
	
	
	public Event() {
		super();
	}
	
	
	public Event(Integer id, String appName, String environment, Date startDate, Date endDate, String eventName,
			String eventType, String eventDetails) {
		super();
		Id = id;
		AppName = appName;
		Environment = environment;
		this.startDate = startDate;
		this.endDate = endDate;
		EventName = eventName;
		EventType = eventType;
		EventDetails = eventDetails;
	}




	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getEventType() {
		return EventType;
	}

	public void setEventType(String eventType) {
		EventType = eventType;
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
		return "Event [Id=" + Id + ", AppName=" + AppName + ", Environment=" + Environment + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", EventName=" + EventName + ", EventType=" + EventType + ", EventDetails="
				+ EventDetails + "]";
	}
		
}
