SET SCHEMA blog_web;

INSERT INTO blog(id, bid, title, description, content, pin, views, author_id, author_avatar, category_id, category_name, gmt_create, gmt_update) VALUES
(1, '0001', 'Test blog 1', 'This is for testing...', '<body><h1>Test Blog 1</h1><body>', false, 0, '0001', 'avatar/dummy', '0001', 'Test', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(2, '0002', 'Test blog 2', 'This is for testing...', '<body><h1>Test Blog 2</h1><body>', false, 0, '0001', 'avatar/dummy', '0001', 'Test', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(3, '0003', 'Test blog 3', 'This is for testing...', '<body><h1>Test Blog 3</h1><body>', false, 0, '0001', 'avatar/dummy', '0001', 'Test', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(4, '0004', 'Test blog 4', 'This is for testing...', '<body><h1>Test Blog 4</h1><body>', false, 0, '0002', 'avatar/dummy', '0001', 'Test', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(5, '0005', 'Test blog 5', 'This is for testing...', '<body><h1>Test Blog 5</h1><body>', false, 0, '0002', 'avatar/dummy', '0001', 'Test', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000');