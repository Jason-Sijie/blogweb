package com.sijie.blogweb;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.sql.DataSource;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class DataSourceTest {
    private static Logger logger = LoggerFactory.getLogger(DataSourceTest.class);

    @Autowired
    DataSource dataSource;

    @Test
    public void testSchemaInit() {
        logger.debug("DataSource: " + dataSource);
    }

}
