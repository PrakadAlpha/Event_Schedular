package com.ge.service;

import java.util.Date;
import java.util.List;

import com.ge.bean.Event;

public interface Event_Service_I {

	List<Event> GetAll();
	
	Event GetById(Integer id);

	Event Add(Event event);

	Event Update(Event event);

	void Delete(Integer id);

	List<Event> dateRange(Date startDate, Date endDate);

}
