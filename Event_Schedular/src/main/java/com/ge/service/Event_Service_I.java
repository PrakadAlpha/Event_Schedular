package com.ge.service;

import java.util.List;

import com.ge.bean.Event;

public interface Event_Service_I {

	List<Event> GetAll();
	
	Event GetById(Integer id);

	Event Add(Event event);

	Event Update(Event event);

}
