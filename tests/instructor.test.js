const { describe, test, expect } = require('@jest/globals')
const Instructor = require('../src/instructor.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')

const Quinnipiac = { name: 'Quinnipiac University', domain: 'qu.edu' }

function makeOffering (name, dept, number, section, year, quarter) {
    const course = new Course(dept, number, name, 3)
    return new CourseOffering(course, section, year, quarter)
}

describe('Instructor', () => {
    test('should create an instructor with correct values', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')

        // Act

        // Assert
        expect(instructor.lastName).toBe('Nicolini')
        expect(instructor.firstName).toBe('Professor')
        expect(instructor.affiliation).toBe('instructor')
        expect(instructor.course_list).toEqual([])
    })

    test('should return all courses', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        const offering = makeOffering('Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')
        instructor.course_list.push(offering)

        // Act
        const result = instructor.list_courses()

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toContain('Software Quality Assurance')
    })

    test('should return courses filtered by year', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        const offering1 = makeOffering('Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')
        const offering2 = makeOffering('FullStack', 'SER', '341', '01', 2024, 'Spring')
        instructor.course_list.push(offering1, offering2)

        // Act
        const result = instructor.list_courses(2025, null)

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toContain('Software Quality Assurance')
    })

    test('should return courses filtered by semester', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        const offering1 = makeOffering('Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')
        const offering2 = makeOffering('FullStack', 'SER', '341', '01', 2025, 'Fall')
        instructor.course_list.push(offering1, offering2)

        // Act
        const result = instructor.list_courses(null, 'Fall')

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toContain('FullStack')
    })

    test('should return courses filtered by year and semester', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        const offering1 = makeOffering('Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')
        const offering2 = makeOffering('FullStack', 'SER', '341', '01', 2025, 'Fall')
        instructor.course_list.push(offering1, offering2)

        // Act
        const result = instructor.list_courses(2025, 'Spring')

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0]).toContain('Software Quality Assurance')
    })

    test('should return correct string from toString', () => {
        // Arrange
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')

        // Act
        const result = instructor.toString()

        // Assert
        expect(result).toContain('Professor Nicolini')
        expect(result).toContain('Quinnipiac University')
        expect(result).toContain('pnicolini')
    })
})
