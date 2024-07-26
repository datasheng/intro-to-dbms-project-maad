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

create table school(
schoolID varchar(10),
schoolName VARCHAR(100),
LicenseID Int,
Balance varchar(100),
primary key(schoolID, schoolName)
);

create table teach_at(
teachaidt int, 
teacherID int,
schoolID varchar(10),
schoolName VARCHAR(100),
primary key(teach_at),
foreign key (teacherID) references teacher(teacherID),
foreign key (schoolID,schoolName) references school(schoolID,schoolName)
);

-- altering tableS to add foreign key (schoolID, schoolName)
ALTER table student
add schoolID varchar(10);

alter table student
add schoolName VARCHAR(100);

ALTER table student
add foreign key (schoolID, schoolName) references school(schoolID, schoolName);

ALTER table course
add schoolID varchar(10);

alter table course
add schoolName VARCHAR(100);
alter table course
add foreign key (schoolID, schoolName) references school(schoolID, schoolName);
