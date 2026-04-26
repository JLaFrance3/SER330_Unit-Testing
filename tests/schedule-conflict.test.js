const Institution = require("../src/institution.js");
const Student = require("../src/student.js");
const Course = require("../src/course.js");
const CourseOffering = require("../src/course-offering.js");

const Quinnipiac = { name: "Quinnipiac University", domain: "qu.edu" };

describe("Schedule Conflict Resolution", () => {
  let institution, student, cs101, math201;

  beforeEach(() => {
    institution = new Institution("Quinnipiac University", "qu.edu");
    student = new Student("Smith", "John", Quinnipiac, "08-28-2000", "jsmith");
    cs101 = new Course("CS", "101", "Intro to Computer Science", 3);
    math201 = new Course("MATH", "201", "Calculus I", 3);
    institution.add_course(cs101);
    institution.add_course(math201);
    institution.enroll_student(student);
  });

  test("CourseOffering should store timeSlot correctly", () => {
    // Arrange
    const timeSlot = {
      days: ["M", "W", "F"],
      startTime: "09:00",
      endTime: "10:00",
    };

    // Act
    const offering = new CourseOffering(cs101, "01", 2025, "Spring", timeSlot);

    // Assert
    expect(offering.timeSlot).toEqual(timeSlot);
  });

  test("should throw an error when student has a time conflict", () => {
    // Arrange
    const offering1 = new CourseOffering(cs101, "01", 2025, "Spring", {
      days: ["M", "W", "F"],
      startTime: "09:00",
      endTime: "10:00",
    });
    const offering2 = new CourseOffering(math201, "01", 2025, "Spring", {
      days: ["M", "W", "F"],
      startTime: "09:00",
      endTime: "10:00",
    });
    institution.add_course_offering(offering1);
    institution.add_course_offering(offering2);
    institution.register_student_for_course(
      student,
      "Intro to Computer Science",
      "CS",
      "101",
      "01",
      2025,
      "Spring",
    );

    // Act & Assert
    expect(() =>
      institution.register_student_for_course(
        student,
        "Calculus I",
        "MATH",
        "201",
        "01",
        2025,
        "Spring",
      ),
    ).toThrow("Schedule conflict");
  });

  test("should throw an error when course times partially overlap", () => {
    // Arrange
    const offering1 = new CourseOffering(cs101, "01", 2025, "Spring", {
      days: ["T", "Th"],
      startTime: "09:00",
      endTime: "10:30",
    });
    const offering2 = new CourseOffering(math201, "01", 2025, "Spring", {
      days: ["T", "Th"],
      startTime: "10:00",
      endTime: "11:30",
    });
    institution.add_course_offering(offering1);
    institution.add_course_offering(offering2);
    institution.register_student_for_course(
      student,
      "Intro to Computer Science",
      "CS",
      "101",
      "01",
      2025,
      "Spring",
    );

    // Act & Assert
    expect(() =>
      institution.register_student_for_course(
        student,
        "Calculus I",
        "MATH",
        "201",
        "01",
        2025,
        "Spring",
      ),
    ).toThrow("Schedule conflict");
  });
});
