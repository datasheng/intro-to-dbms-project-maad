-- Inserting values into the school table
INSERT INTO school(SchoolID, SchoolName, LicenseID, Balance) VALUES
('002688', 'City College', 1, '$0');

-- Inserting values into the teacher table
INSERT INTO teacher(TeacherID, TeacherName) VALUES
(1, 'Sheng-Min Chen'),
(2, 'Mohammad Walid Charrwi'),
(3, 'Peter Brass'),
(4, 'Luis Camelo'),
(5, 'Ken Carew');

-- Inserting values into the student table
INSERT INTO student(StudentID, StudentName, StudentMajor, SchoolID, SchoolName) VALUES
(1, 'Aboubacar S Diakite', 'COMPUTER SCIENCE', '002688', 'City College'),
(2, 'Alexandr Voronovich', 'COMPUTER SCIENCE', '002688', 'City College'),
(3, 'Melvin Sierra', 'COMPUTER SCIENCE', '002688', 'City College'),
(4, 'Devin Munoz', 'COMPUTER SCIENCE', '002688', 'City College'),
(5, 'Amara Sidibe', 'BUSINESS', '002688', 'City College');

-- Inserting values into the course table
INSERT INTO course(CourseID, CourseName, CourseMajor, Credits, SchoolID, SchoolName) VALUES
(1, 'Calculus I', 'MATHEMATICS', 4, '002688', 'City College'),
(2, 'Calculus II', 'MATHEMATICS', 4, '002688', 'City College'),
(3, 'Calculus III', 'MATHEMATICS', 4, '002688', 'City College'),
(4, 'Algorithms', 'COMPUTER SCIENCE', 3, '002688', 'City College'),
(5, 'Database Systems', 'COMPUTER SCIENCE', 3, '002688', 'City College');

-- Inserting values into the section table
INSERT INTO section(SectionID, Room, Time, Days, Semester, CourseID, CourseName, TeacherID) VALUES
(1, 102, '12:30:00', 'Monday', 'Fall 2024', 1, 'Calculus I', 5),
(2, 103, '13:00:00', 'Tuesday', 'Summer 2024', 2, 'Calculus II', 2),
(3, 201, '12:00:00', 'Thursday', 'Fall 2024', 4, 'Algorithms', 1),
(4, 202, '17:00:00', 'Monday', 'Summer 2024', 5, 'Database Systems', 1),
(5, 301, '10:30:00', 'Wednesday', 'Spring 2025', 3, 'Calculus III', 3);

-- Inserting values into the registration table
INSERT INTO registration(RegistrationID, SectionID, StudentID) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 1, 2),
(7, 2, 2),
(8, 3, 2),
(9, 4, 2),
(10, 5, 2),
(11, 1, 3),
(12, 2, 3),
(13, 3, 3),
(14, 4, 3),
(15, 5, 3),
(16, 1, 4),
(17, 2, 4),
(18, 3, 4),
(19, 4, 4),
(20, 5, 4),
(21, 1, 5),
(22, 2, 5),
(23, 3, 5),
(24, 4, 5),
(25, 5, 5);

-- Inserting values into the teach_at table
INSERT INTO teach_at(TeachAtID, TeacherID, SchoolID, SchoolName) VALUES
(1, 1, '002688', 'City College'),
(2, 2, '002688', 'City College'),
(3, 3, '002688', 'City College'),
(4, 4, '002688', 'City College'),
(5, 5, '002688', 'City College');
