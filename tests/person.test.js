const { describe, test, expect } = require('@jest/globals')
const Person = require('../src/person.js')

const Quinnipiac = { name: 'Quinnipiac University', domain: 'qu.edu' }

describe('Person', () => {
    test('should create a person with correct values', () => {
        // Arrange
        const person = new Person('Smith', 'John', Quinnipiac, '1999-09-12', 'jsmith', 'student')

        // Act

        // Assert
        expect(person.lastName).toBe('Smith')
        expect(person.firstName).toBe('John')
        expect(person.school).toBe(Quinnipiac)
        expect(person.userName).toBe('jsmith')
        expect(person.affiliation).toBe('student')
        expect(person.dateOfBirth).toBeInstanceOf(Date)
    })

    test('should return correct email', () => {
        // Arrange
        const person = new Person('Smith', 'John', Quinnipiac, '1999-09-12', 'jsmith', 'student')

        // Act
        const email = person.email

        // Assert
        expect(email).toBe('jsmith@qu.edu')
    })

    test('should return correct string from toString', () => {
        // Arrange
        const person = new Person('Smith', 'John', Quinnipiac, '1999-09-12', 'jsmith', 'student')

        // Act
        const result = person.toString()

        // Assert
        expect(result).toContain('John Smith')
        expect(result).toContain('Quinnipiac University')
        expect(result).toContain('jsmith')
        expect(result).toContain('student')
    })
})
