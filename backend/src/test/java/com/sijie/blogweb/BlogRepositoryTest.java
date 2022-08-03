package com.sijie.blogweb;

import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.repository.BlogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.sql.DataSource;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class BlogRepositoryTest {
	private static Logger logger = LoggerFactory.getLogger(BlogRepositoryTest.class);

	@Autowired
	BlogRepository blogRepository;

	@Test
	public void testBlogCreateAndQueryByBid() {
		Blog blog = createDummyBlog();
		blogRepository.save(blog);

		Blog result = blogRepository.findByBid("1");
		logger.info("The result blog id: " + result.getId() + ", bid: " + result.getBid());
		assertEquals(blog.getTitle(), result.getTitle());
	}

	private Blog createDummyBlog() {
		Blog blog = new Blog();
		blog.setBid("1");
		blog.setTitle("foo");
		blog.setDescription("foo");
		blog.setViews(0l);
		blog.setGmtCreate(new Date());
		blog.setGmtUpdate(new Date());
		blog.setLikes(0l);
		blog.setAuthorId("fooId");
		blog.setCategoryId("fooId");

		return blog;
	}

}
