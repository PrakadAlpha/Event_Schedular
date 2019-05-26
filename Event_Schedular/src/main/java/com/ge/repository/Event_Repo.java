package com.ge.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ge.bean.Event;

@Repository
public interface Event_Repo extends CrudRepository<Event, Integer>{
	
}
