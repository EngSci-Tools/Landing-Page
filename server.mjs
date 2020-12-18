const PORT = 80;

import history from 'connect-history-api-fallback';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import NewsScraper from './serverResources/subjects/newsScraper.mjs'
import Courses from './serverResources/subjects/courses.mjs'
import SkuleDigest from './serverResources/subjects/skuleDigest.mjs'
// TODO: Make https://skule.ca/digest/api.php/:cursor into a socket subject

class SocketHandler {
    constructor(socket) {
        this.socket = socket

        this.subjects = {}
    }

    addSubject(eventName, subject) {
        const observable = subject.onUpdate
        this.socket.on(eventName, () => {
            console.log('Data requested on:', subject.constructor.name)
            this.socket.emit(eventName, observable.getValue())
        })
        observable.subscribe(data => {
            console.log('Pushing data on:', subject.constructor.name)
            this.socket.emit(eventName, data)
        })
    }
}

async function main() {
    const app = express()
    const server = http.createServer(app)
    const io = socketIO(server)
    app.use(history())
    app.use(express.static("./dist"))

    const newsScraper = new NewsScraper({ updateInterval: 1000*60*30, url: 'https://engsci.utoronto.ca/news/' })
    const courses = new Courses({ updateInterval: 1000*60*10, year: '2020', semester: 0 })
    const digest = new SkuleDigest({ updateInterval: 1000*60*10, url: 'https://skule.ca/digest/api.php', depth: 40 })

    const socketHandlers = []
    io.on('connect', socket => {
        console.log("New Socket connection");
        const handler = new SocketHandler(socket)
        socketHandlers.push(handler);
        handler.addSubject('news', newsScraper)
        handler.addSubject('courses', courses)
        handler.addSubject('digest', digest)
    })

    server.listen(PORT, () => {
        console.log("Server started at: ", PORT)
    });
}

main()