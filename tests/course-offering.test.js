const { describe, test, expect } = require('@jest/globals')
const CourseOffering = require('../src/course-offering.js')
const Course = require('../src/course.js')
const Student = require('../src/student.js')
const Instructor = require('../src/instructor.js')

const Quinnipiac = { name: 'Quinnipiac University', domain: 'qu.edu' }

describe('CourseOffering', () => {
    test('should create an offering with correct values', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')

        // Act

        // Assert
        expect(offering.sectionNumber).toBe('01')
        expect(offering.year).toBe(2025)
        expect(offering.quarter).toBe('Spring')
        expect(offering.instructor).toBeNull()
        expect(offering.registeredStudents).toEqual([])
        expect(offering.grades).toEqual({})
    })

    test('should register students to offering and offering to courseList', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')

        // Act
        offering.register_students([student])

        // Assert
        expect(offering.registeredStudents).toContain(student)
        expect(student.courseList).toContain(offering)
    })

    test('should return registered students', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')
        offering.register_students([student])

        // Act
        const students = offering.get_students()

        // Assert
        expect(students).toContain(student)
    })

    test('should store correct student grade and update transcript', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')
        offering.register_students([student])

        // Act
        offering.submit_grade(student, 'A')

        // Assert
        expect(offering.grades['jsmith']).toBe('A')
        expect(Object.values(student.transcript)).toContain('A')
    })

    test('should return error for invalid grade', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')

        // Act
        const result = offering.submit_grade(student, 'Z')

        // Assert
        expect(result).toBe('Please enter a valid grade')
    })

    test('should return error for invalid student object', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')

        // Act
        const result = offering.submit_grade({ username: 'Smith' }, 'A')

        // Assert
        expect(result).toBe('Please enter a valid grade')
    })

    test('should return a student grade from student object', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')
        offering.register_students([student])
        offering.submit_grade(student, 'B+')

        // Act
        const grade = offering.get_grade(student)

        // Assert
        expect(grade).toBe('B+')
    })

    test('should return a student grade from username', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')
        offering.register_students([student])
        offering.submit_grade(student, 'B+')

        // Act
        const grade = offering.get_grade('jsmith')

        // Assert
        expect(grade).toBe('B+')
    })

    test('should return correct string from toString', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        offering.instructor = instructor

        // Act
        const result = offering.toString()

        // Assert
        expect(result).toContain('Professor Nicolini')
        expect(result).toContain('Software Quality Assurance')
    })
})
