const Institution = require('../src/institution.js')
const Student = require('../src/student.js')
const Instructor = require('../src/instructor.js')
const Course = require('../src/course.js')
const CourseOffering = require('../src/course-offering.js')

const Quinnipiac = { name: 'Quinnipiac University', domain: 'qu.edu' }

describe('Institution', () => {
    test('should create an institution with correct values', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')

        // Act

        // Assert
        expect(institution.name).toBe('Quinnipiac University')
        expect(institution.domain).toBe('qu.edu')
        expect(institution.studentList).toEqual({})
        expect(institution.facultyList).toEqual({})
        expect(institution.courseCatalog).toEqual({})
        expect(institution.courseSchedule).toEqual({})
    })

    test('should add students to studentList', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')

        // Act
        institution.enroll_student(student)

        // Assert
        expect(institution.studentList['jsmith']).toBe(student)
    })

    test('should throw error for invalid student object', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')

        // Act & Assert
        expect(() => institution.enroll_student({ username: 'jsmith' })).toThrow(Error)
    })

    test('should add instructor to facultyList', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')

        // Act
        institution.hire_instructor(instructor)

        // Assert
        expect(institution.facultyList['pnicolini']).toBe(instructor)
    })

    test('should throw error for invalid instrucor object', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')

        // Act & Assert
        expect(() => institution.hire_instructor({ username: 'pnicolini' })).toThrow(Error)
    })

    test('should add course to courseCatalog', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)

        // Act
        institution.add_course(course)

        // Assert
        expect(institution.courseCatalog['Software Quality Assurance']).toBe(course)
    })

    test('should throw error for invalid course object', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')

        // Act & Assert
        expect(() => institution.add_course({ name: 'Software Quality Assurance' })).toThrow(Error)
    })

    test('should return message when course already in catalog', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        institution.add_course(course)

        // Act
        const result = institution.add_course(course)

        // Assert
        expect(result).toBe('Course has already been added')
    })

    test('should add offering to schedule', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        institution.add_course(course)

        // Act
        institution.add_course_offering(offering)

        // Assert
        expect(institution.courseSchedule['Software Quality Assurance']).toContain(offering)
    })

    test('should return message when course not in catalog', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')

        // Act
        const result = institution.add_course_offering(offering)

        // Assert
        expect(result).toBe('Please create a course before creating course offering')
    })

    test('should throw error for invalid offering', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')

        // Act & Assert
        expect(() => institution.add_course_offering({ course: { name: 'Software Quality Assurance' } })).toThrow(TypeError)
    })

    test('should print message when no offerings listed', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.list_course_schedule(2025, 'Spring')

        // Assert
        expect(spy).toHaveBeenCalledWith('No offerings currently scheduled')
        spy.mockRestore()
    })

    test('should print matching offerings for dept', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        institution.add_course(course)
        institution.add_course_offering(offering)
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.list_course_schedule(2025, 'Spring', 'SER')

        // Assert
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Software Quality Assurance'))
        spy.mockRestore()
    })

    test('should print message if offerings for dept do not contain anything', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        institution.add_course(course)
        institution.add_course_offering(offering)
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.list_course_schedule(2025, 'Spring', 'CS')

        // Assert
        expect(spy).toHaveBeenCalledWith('No offerings during this semester')
        spy.mockRestore()
    })

    test('should print sorted student names', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        institution.enroll_student(new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith'))
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.listStudents()

        // Assert
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Smith'))
        spy.mockRestore()
    })

    test('should print sorted instructor names', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        institution.hire_instructor(new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini'))
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.list_instructors()

        // Assert
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Nicolini'))
        spy.mockRestore()
    })

    test('should print courses in catalog', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        institution.add_course(course)
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.list_course_catalog()

        // Assert
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({ name: 'Software Quality Assurance' }))
        spy.mockRestore()
    })

    test('should assigns instructor to matching offering', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const instructor = new Instructor('Nicolini', 'Professor', Quinnipiac, '1999-09-12', 'pnicolini')
        instructor.courseList = []
        institution.add_course(course)
        institution.add_course_offering(offering)
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

        // Act
        institution.assign_instructor(instructor, 'Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')

        // Assert
        expect(offering.instructor).toBe(instructor)
        spy.mockRestore()
    })

    test('should register student for course', () => {
        // Arrange
        const institution = new Institution('Quinnipiac University', 'qu.edu')
        const course = new Course('SER', '330', 'Software Quality Assurance', 3)
        const offering = new CourseOffering(course, '01', 2025, 'Spring')
        const student = new Student('Smith', 'John', Quinnipiac, '08-28-2000', 'jsmith')
        institution.add_course(course)
        institution.add_course_offering(offering)
        institution.enroll_student(student)

        // Act
        institution.register_student_for_course(student, 'Software Quality Assurance', 'SER', '330', '01', 2025, 'Spring')

        // Assert
        expect(offering.registeredStudents).toContain(student)
    })
})
