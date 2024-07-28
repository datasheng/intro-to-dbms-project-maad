CREATE DATABASE enrollment;
 
CREATE TABLE school(
SchoolID VARCHAR(10),
SchoolName VARCHAR(100),
LicenseID INT,
Balance VARCHAR(100),
primary key(SchoolID, SchoolName)
);

CREATE TABLE teacher(
TeacherID INT, 
TeacherName VARCHAR(100),
primary key(TeacherID)
);

CREATE TABLE student(
StudentID INT, 
StudentName VARCHAR(100), 
StudentMajor VARCHAR(100),
SchoolID VARCHAR(10),
SchoolName VARCHAR(100),
primary key(StudentID),
foreign key(SchoolID, SchoolName) references school(SchoolID, SchoolName)
);

CREATE TABLE course(
CourseID INT, 
CourseName VARCHAR(100),
CourseMajor VARCHAR(100),
Credits INT,
SchoolID VARCHAR(10),
SchoolName VARCHAR(100),
primary key(CourseID, CourseName),
foreign key(SchoolID, SchoolName) references school(SchoolID, SchoolName)
);

CREATE TABLE section(
SectionID INT, 
Room INT,
Time TIME,
Days VARCHAR(100),
Semester VARCHAR(100),
CourseID INT,
CourseName VARCHAR(100),
TeacherID INT,
primary key(SectionID),
foreign key(CourseID, CourseName) references course(CourseID, CourseName),
foreign key(TeacherID) references teacher(TeacherID)
);

CREATE TABLE registration(
RegistrationID INT, 
SectionID INT,
StudentID INT,
primary key(RegistrationID),
foreign key(SectionID) references section(SectionID),
foreign key(StudentID) references student(StudentID)
);

CREATE TABLE teach_at(
TeachAtID INT, 
TeacherID INT,
SchoolID VARCHAR(10),
SchoolName VARCHAR(100),
primary key(TeachAtID),
foreign key(TeacherID) references teacher(TeacherID),
foreign key(SchoolID, SchoolName) references school(SchoolID, SchoolName)
);
  