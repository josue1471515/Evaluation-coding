create DATABASE test_2;

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	PRIMARY KEY (`id`)
);


CREATE TABLE `courses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(255),
	`last_name` VARCHAR(255),
	`ic` VARCHAR(255),
	`email` VARCHAR(255),
	`phone` VARCHAR(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE category_course (
   `id` INT NOT NULL AUTO_INCREMENT,
    category_id int,
	course_id int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (category_id) REFERENCES categories(id),
	FOREIGN KEY (course_id) REFERENCES courses(id)
);


CREATE TABLE course_user(
   `id` INT NOT NULL AUTO_INCREMENT,
    user_id int,
	course_id int,
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (course_id) REFERENCES courses(id)
);