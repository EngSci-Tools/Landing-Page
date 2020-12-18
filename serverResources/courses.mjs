import Canvas from 'canvas-student-wrapper'
import config from './config.mjs'

import rxjs from 'rxjs'
const { BehaviorSubject, interval } = rxjs;

export default class Courses {
    constructor () {
        this.onUpdate = new BehaviorSubject()
        interval(1000*60*10).subscribe(() => this.update()) // Refresh the courses every 30 minutes

        const yearStartDate = new Date('2020-07-01')
        this.canvas = new Canvas(config.accessToken, yearStartDate)
        this.update()
    }

    async update() {
        await this.canvas.update()
        const activeCourses = this.canvas.getCourses({ active: true })
        const courses = []
        for (const course of Object.values(activeCourses)) {
            const { id, name, code, calendarLink, term, courseImg, totalStudents, teachers, tabs} = course

            const announcements = []
            for (const announcement of course.announcements) {
                const { position, title, message, created, author, link } = announcement
                announcements.push({ position, title, message, created, author, link })
            }

            const assignments = []
            for (const assignment of course.assignments) {
                const { position, name, description, dueDate, unlockDate, counts, link } = assignment
                const { possiblePoints, gradedDate } = assignment.submission
                assignments.push({ position, name, description, dueDate, unlockDate, counts, link, possiblePoints, gradedDate })
            }

            courses.push({
                id, name, code, calendarLink, term, courseImg, totalStudents, teachers, tabs,
                announcements, assignments
            })
        }
        console.log("Updated courses")
        this.onUpdate.next(courses)
    }
}