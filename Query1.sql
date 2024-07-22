Create Database Enrollment;

create table student (
studentID int, 
Name varchar(100), 
Majors varchar(100),
primary key(studentID)
);

create table teacher (
teacherID int, 
Name varchar(100),
primary key(teacherID)
);

create table course (
courseID int, 
courseName varchar(100),
Credit int,
primary key(courseID, courseName )
);

create table Section (
SectionID int, 
Room int,
Time time,
Days varchar(100),
Semester varchar(100),
courseID int,
courseName varchar(100),
teacherID int,
primary key(SectionID),
foreign key (courseID, courseName) references course(courseID, courseName),
foreign key (teacherID) references teacher(teacherID)
);

create table registration(
registrationID int, 
SectionID int,
studentID int,
primary key(registrationID),
foreign key (SectionID) references Section(SectionID),
foreign key (studentID) references student(studentID)
);

