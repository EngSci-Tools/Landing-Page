const PORT = 80;

import history from 'connect-history-api-fallback';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

import NewsScraper from './serverResources/newsScraper.mjs'
import Courses from './serverResources/courses.mjs'

class SocketHandler {
    constructor(socket) {
        this.socket = socket;

        this.subjects = {};
    }

    addSubject(eventName, subject) {
        this.socket.on(eventName, () => {
            this.socket.emit(eventName, subject.getValue())
        })
        subject.subscribe(data => {
            this.socket.emit(eventName, data);
        })
    }
}

async function main() {
    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);
    app.use(history());
    app.use(express.static("./dist"));

    const newsScraper = new NewsScraper()
    const courses = new Courses()

    const socketHandlers = [];
    io.on('connect', socket => {
        console.log("New Socket connection");
        const handler = new SocketHandler(socket)
        socketHandlers.push(handler);
        handler.addSubject('news', newsScraper.onNews);
        handler.addSubject('courses', courses.onUpdate);
    })

    server.listen(PORT, () => {
        console.log("Server started at: ", PORT);
    });
}

main();