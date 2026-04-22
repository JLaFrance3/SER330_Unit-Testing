const { describe, test, expect } = require('@jest/globals')
const Course = require('../src/course.js')

describe('Course', () => {
    test('should create a course with correct values', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)

        // Act
        // None

        // Assert
        expect(course.department).toBe('SER')
        expect(course.number).toBe('330')
        expect(course.name).toBe('Software Quality Assurance')
        expect(course.credits).toBe(3)
    })

    test('should return correct string from toString', () => {
        // Arrange
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)

        // Act
        const result = course.toString()

        // Assert
        expect(result).toBe('Software Quality Assurance, SER 330 (3 credits)')
    })
})
