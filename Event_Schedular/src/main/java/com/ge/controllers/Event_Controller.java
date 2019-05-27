package com.ge.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ge.bean.Event;
import com.ge.service.Event_Service_I;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class Event_Controller {

	@Autowired
	Event_Service_I service;
	
	
	@GetMapping("/events")
	public List<Event> FindAll() {
		List<Event> event = service.GetAll();
		System.out.println(event);
		return event;
	}
	
	@GetMapping("/events/{id}")
	public Event FindById(@PathVariable Integer id) {
		Event event = service.GetById(id);
		System.out.println(event);
		return event;
	}
	
	@PostMapping("/events")
	public Event Add(@RequestBody Event event) {
		Event newEvent = service.Add(event);		
		return newEvent;
	}
	
	@PutMapping("/events")
	public Event Update(@RequestBody Event event) {
		Event newEvent = service.Update(event);		
		return newEvent;
	}
	
	@DeleteMapping("/events/{id}")
	public void Delete(@PathVariable Integer id) {
		
		if(service.GetById(id) != null) {
			 service.Delete(id);		
			 }else {
				
			 }
		
	}
}
