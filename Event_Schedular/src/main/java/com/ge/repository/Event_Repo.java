package com.ge.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ge.bean.Event;


@Repository
public interface Event_Repo extends CrudRepository<Event, Integer>{
	
	@Query("FROM Event e WHERE e.startDate BETWEEN :sDate AND :eDate")
	List<Event> getByDate(@Param("sDate") Date sDate, @Param("eDate") Date eDate);
}
