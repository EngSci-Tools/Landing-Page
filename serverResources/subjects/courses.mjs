import Subject from '../subject.mjs'

import Canvas from 'canvas-student-wrapper'
import config from './config.mjs'
export default class Courses extends Subject {
    initialize (params) {
        const { year, semester } = params
        const month = semester === 0 ? '07' : '12'
        const yearStartDate = new Date(`${year}-${month}-01`)
        this.canvas = new Canvas(config.accessToken, yearStartDate)
    }

    async update (params) {
        const { year, semester } = params
        const month = semester === 0 ? '07' : '12'
        const yearStartDate = new Date(`${year}-${month}-01`)
        console.log("Updating courses after:", yearStartDate)

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
        return courses
    }
}