USE blog_web;

INSERT INTO blog(id, bid, title, description, views, likes, author_id, category_id, gmt_create, gmt_update) VALUES
(1, '0001', 'Test blog 1', 'This is for testing...', 0, 0, '0001', '0001', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(2, '0002', 'Test blog 2', 'This is for testing...', 0, 0, '0001', '0001', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(3, '0003', 'Test blog 3', 'This is for testing...', 0, 0, '0001', '0001', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(4, '0004', 'Test blog 4', 'This is for testing...', 0, 0, '0002', '0001', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000'),
(5, '0005', 'Test blog 5', 'This is for testing...', 0, 0, '0002', '0001', '2020-07-02 06:14:00.742000000', '2020-07-02 06:14:00.742000000');