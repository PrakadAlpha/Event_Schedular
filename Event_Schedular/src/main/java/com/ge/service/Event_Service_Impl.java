package com.ge.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ge.bean.Event;
import com.ge.repository.Event_Repo;


@Service
public class Event_Service_Impl implements Event_Service_I{

	@Autowired
	Event_Repo repo;
	
	@Override
	public List<Event> GetAll() {

		List<Event> events = new ArrayList<Event>();
				
		Iterable<Event> itr = repo.findAll();
		
		itr.forEach(events::add);
		
		return events;
		
	}
	
	public Event GetById(Integer id) {
		
		return repo.findById(id).orElse(new Event());	
		}

	@Override
	public Event Add(Event event) {
		return repo.save(event);
	}

	@Override
	public Event Update(Event event) {
		return repo.save(event);
	}
	
	@Override
	public void Delete(Integer id) {
		 repo.deleteById(id);
	}

	@Override
	public List<Event> dateRange(Date sDate, Date eDate) {
		return repo.getByDate(sDate, eDate);
	}
	
}
