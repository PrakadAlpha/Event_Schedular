package com.ge.controllers;

import java.io.ByteArrayInputStream;
import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
				System.out.println("Cannot delete null..!");
			 }
	}
	
	@GetMapping("/events/event/{date}")
	public List<Event> GetByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
		List<Event> events = service.getEvents(date);
//		Object[] array = events.toArray();
		return events;
	}
	
	@GetMapping("/events/")
	public List<Event> GetByDat(@RequestParam(name="date", required=false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
		List<Event> events = service.getEvents(date);
		return events;		
	}
	
	
	@GetMapping("/events/report/{startDate}/{endDate}")
	public ResponseEntity<InputStreamResource> generatePdf(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) throws ParseException {
				
		List<Event> events = service.dateRange(startDate, endDate);
		
		ByteArrayInputStream bais = GeneratedPdfReport.eventsReport(events);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename = EventsReport.pdf");
		
		return ResponseEntity
				.ok()
				.headers(headers)
				.contentType(MediaType.APPLICATION_PDF)
				.body(new InputStreamResource(bais));
				
	}
	
	@GetMapping("/events/range/{startDate}/{endDate}")
	public List<Event> getByRange(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate){
		List<Event> events = service.dateRange(startDate, endDate);
		return events;
	}
	
}
