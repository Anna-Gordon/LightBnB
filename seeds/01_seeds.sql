
-- USERS TABLE
INSERT INTO users (name, email, password) 
VALUES 
('Casey Sparks', 'dvdotnet@live.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Warren Terry', 'keiji@me.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Morris Norris', 'wagnerch@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- PROPERTIES TABLE
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES 
(1, 'My Dream Home', 'Description', 'https://lingerlonger.brightdoor.com/BrightBase/media/preview/637110547334910165_DJI_0660Straight.jpg', 'https://hamptonsrealestateshowcase.com/wp-content/uploads/2013/10/VillaMaria.jpg', 150, 1, 2, 4, 'Canada', 'Bay', 'Victoria', 'BC', 'A2S1Z7', TRUE),
(2, 'Sand and Sea', 'Description', 'https://lingerlonger.brightdoor.com/BrightBase/media/preview/637073553597446187_1_Front.jpg', 'https://hamptonsrealestateshowcase.com/wp-content/uploads/2013/10/VillaMaria.jpg', 165, 2, 2, 3, 'USA', 'Pima', 'Scottsdale', 'AZ', '98765', TRUE),
(3, 'Real Living', 'Description', 'https://morganmaclean.s3.amazonaws.com/properties/21526065/21526065-LargePhoto-1.jpg', 'https://hamptonsrealestateshowcase.com/wp-content/uploads/2013/10/VillaMaria.jpg', 95, 3, 3, 5, 'Canada', 'Prince Albert', 'Toronto', 'ON', 'A1A4F5', FALSE);

-- RESERVATIONS TABLE
INSERT INTO reservations (start_date, end_date, property_id, guest_id ) 
VALUES 
('2018-02-12T08:00:00.000Z', '2018-04-20T07:00:00.000Z', 2, 1),
('2018-09-24T07:00:00.000Z', '2018-11-30T08:00:00.000Z', 1, 3),
('2018-07-30T07:00:00.000Z', '2018-10-05T07:00:00.000Z', 2, 2);

-- PROPERTY_REVIEWS TABLE
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(1, 1, 1, 5, 'Message'),
(3, 2, 2, 4, 'Message'),
(2, 1, 3, 2, 'Message');