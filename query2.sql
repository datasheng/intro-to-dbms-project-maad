insert into student(studentID, Name, Majors)
values 
(1, 'Aboubacar S Diakite','Computer Scinece'),
(2, 'Alex V','Computer Scinece'),
(3, 'MelV ','Computer Scinece'),
(4, 'Null','Computer Scinece'),
(5, 'Amara Sidibe','Accounting');

insert into course(courseID, courseName, credit)
values 
(1, 'Calculus I',4),
(2, 'Calculus II',4),
(3, 'Calculus III',4),
(4, 'Algoritms',3),
(5, 'Database System',3);


insert into teacher(teacherID, Name)
values 
(1, 'Sheng-Min Chen'),
(2, 'Mohammad Walid Charrwi'),
(3, 'Peter Brass'),
(4, 'Luis Camelo'),
(5, 'Ken Carew');


insert into section(sectionID, Room, Time, Days, semester, courseID, courseName, teacherID)
values 
(1, 102,'12:30:00', 'Monday', 'Fall 2024', 1, 'Calculus I', 5),
(2, 103,'13:00:00', 'Tuesday', 'Summer 2024', 2, 'Calculus II', 2),
(3, 201,'12:00:00', 'Thursday', 'Fall 2024', 4, 'Algoritms', 1),
(4, 202,'17:00:00', 'Monday', 'summer 2024', 5, 'Database System', 1),
(5, 301,'10:30:00', 'Wednesday', 'spring 2025', 3, 'Calculus III',  3);


insert into registration(registrationID, sectionId, StudentID)
values 
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1),
(5,5,1),
(6,1,2),
(7,2,2),
(8,3,2),
(9,4,2),
(10,5,2),
(11,1,3),
(12,2,3),
(13,3,3),
(14,4,3),
(15,5,3),
(16,1,4),
(17,2,4),
(18,3,4),
(19,4,4),
(20,5,4),
(21,1,5),
(22,2,5),
(23,3,5),
(24,4,5),
(25,5,5);

-- course and course information
select course.courseName, section.Room, section.Semester, section.Time
from course, section
where section.courseID = course.courseID;

-- all student and classes they are enrolled in
select student.name, section.courseName, section.days, 
section.time, section.room, section.semester
FROM student, registration, section
where student.studentID = registration.studentID
and section.sectionID = registration.sectionID;


-- all classes of a specific student
select student.name, section.courseName, section.days, 
section.time, section.room, section.semester
FROM student, registration, section
where student.studentID = registration.studentID
and section.sectionID = registration.sectionID
and student.studentID = 1;

-- classes of a student on a specific semester
select student.name, section.courseName, section.days, 
section.time, section.room, section.semester
FROM student, registration, section
where student.studentID = registration.studentID
and section.sectionID = registration.sectionID
and student.studentID = 2
and section.semester = "summer 2024";

-- who is the teacher in each class
select teacher.Name, section.courseName, section.semester
from section, teacher
where section.teacherID = teacher.teacherID;

-- who is teacher a specific class at a specific semester
select teacher.Name, section.courseName, section.semester
from section, teacher
where section.teacherID = teacher.teacherID
and section.courseName = "database system";
							   







