package com.aviation.repository;

import java.io.Serializable;

import org.springframework.data.repository.CrudRepository;

import com.aviation.entity.FilterBy;

public interface FilterByRepository extends CrudRepository<FilterBy, Serializable> {

}
