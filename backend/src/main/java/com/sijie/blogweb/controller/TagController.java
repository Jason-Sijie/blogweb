package com.sijie.blogweb.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Tuple;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sijie.blogweb.model.Tag;
import com.sijie.blogweb.repository.TagRepository;
import com.sijie.blogweb.repository.TupleWrapper;

@RestController
@RequestMapping(value = "/tags")
public class TagController {
    private static Logger logger = LoggerFactory.getLogger(TagController.class);

    @Autowired
    private TagRepository tagRepository;

    @GetMapping(value = "", produces = {"application/json"}, params = {"topKSize"})
    @Transactional(readOnly = true)
    public List<Tag> getTagsWithTopKSize(@RequestParam(name = "topKSize", required = true) Integer topKSize) {
        List<Tag> topTags = new ArrayList<>();
        List<Tuple> tuples = tagRepository.findTopTagsByBlogNumber(topKSize);
        for (Tuple tuple : tuples) {
            TupleWrapper tupleWrapper = new TupleWrapper(tuple);
            Tag tag = tupleWrapper.toObject(Tag.class); 
            topTags.add(tag);
        }

        return topTags;
    }
}
