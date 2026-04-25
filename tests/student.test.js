const { describe, test, expect } = require('@jest/globals')
const Student = require('../src/student.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')

const Quinnipiac = { name: 'Quinnipiac University', domain: 'qu.edu' }

describe('Student', () => {
    test('should create a student with correct values', () => {
        // Arrange
        // Act
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')

        // Assert
        expect(student.lastName).toBe('Smith')
        expect(student.firstName).toBe('John')
        expect(student.affiliation).toBe('student')
        expect(student.courseList).toEqual([])
        expect(student.transcript).toEqual({})
    })

    test('should return 0 credits when not enrolled in course', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')

        // Act
        const credits = student.credits

        // Assert
        expect(credits).toBe(0)
    })

    test('should return total credits from enrolled courses', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        offering.register_students([student])

        // Act
        const credits = student.credits

        // Assert
        expect(credits).toBe(3)
    })

    test('should return 0 GPA when no grades', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')

        // Act
        const gpa = student.gpa

        // Assert
        expect(gpa).toBe(0)
    })

    test('should return list of transcript courses from list_courses', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')
        student.transcript['Software Quality Assurance, SER 330-01 (Spring 2025)'] = 'A'

        // Act
        const courses = student.list_courses()

        // Assert
        expect(courses).toContain('Software Quality Assurance, SER 330-01 (Spring 2025)')
    })

    test('should sort courses by year then quarter', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')
        student.transcript['FullStack, SER 341-01 (Spring 2024)'] = 'B'
        student.transcript['Software Quality Assurance, SER 330-01 (Spring 2025)'] = 'A'
        student.transcript['Algorithms, SER 320-01 (Fall 2025)'] = 'A-'

        // Act
        const courses = student.list_courses()

        // Assert
        expect(courses[0]).toContain('2025')
        expect(courses[courses.length - 1]).toContain('2024')
    })

    test('should return formatted string from toString', () => {
        // Arrange
        const student = new Student('Smith', 'John', Quinnipiac, '2000-05-10', 'jsmith')

        // Act
        const result = student.toString()

        // Assert
        expect(result).toContain('John Smith')
        expect(result).toContain('Quinnipiac University')
        expect(result).toContain('jsmith@qu.edu')
        expect(result).toContain('GPA')
        expect(result).toContain('Credits')
    })
})
