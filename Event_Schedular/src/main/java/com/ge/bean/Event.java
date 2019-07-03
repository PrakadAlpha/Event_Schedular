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

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "Event")		
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Integer id;
	
	@Column
	private String appName;
	
	@Column
	private String environment;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column
	private Date startDate;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	@Column
	private Date endDate;
	
	@Column
	private String eventName;
	
	@Column
	private String eventType;
	
	@Column
	private String eventDetails;
	
	@DateTimeFormat(pattern = "HH:MM")
    @Temporal(TemporalType.TIME)
	@Column
	private Date startTime;

	@DateTimeFormat(pattern = "HH:MM")
    @Temporal(TemporalType.TIME)
	@Column
	private Date endTime;
	
	@Column
	private String level;	

	public Event() {
		super();
	}
	
	public Event(Integer id, String appName, String environment, Date startDate, Date endDate, String eventName,
			String eventType, String eventDetails, Date startTime, Date endTime, String level) {
		super();
		this.id = id;
		this.appName = appName;
		this.environment = environment;
		this.startDate = startDate;
		this.endDate = endDate;
		this.eventName = eventName;
		this.eventType = eventType;
		this.eventDetails = eventDetails;
		this.startTime = startTime;
		this.endTime = endTime;
		this.level = level;
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
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

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getEventDetails() {
		return eventDetails;
	}

	public void setEventDetails(String eventDetails) {
		this.eventDetails = eventDetails;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}


	@Override
	public String toString() {
		return "Event [id=" + id + ", appName=" + appName + ", environment=" + environment + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", eventName=" + eventName + ", eventType=" + eventType + ", eventDetails="
				+ eventDetails + ", startTime=" + startTime + ", endTime=" + endTime + ", level=" + level + "]";
	}
	
}
