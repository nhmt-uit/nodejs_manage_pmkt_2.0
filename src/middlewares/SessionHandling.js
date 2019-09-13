import session from "express-session"
import connectMongo from "connect-mongo"

import MongoDb from "../databases/MongoDb"
import Session from "../utils/Session"
import SessionConfig from "../configs/SessionConfig"

const MongoStore = connectMongo(session)
const MongoOpts = MongoDb.getOptions()
// Remove unnecessary value
delete MongoOpts["useCreateIndex"]
delete MongoOpts["useFindAndModify"]

const mongoSessionStore = new MongoStore({
    url: MongoDb.getUri(),
    mongoOptions: MongoOpts
})

const SessionMiddleware = session({
    secret: SessionConfig.SESSION_SECRET_KEY,
    saveUninitialized: true, // don't create session until something stored
    resave: true, //don't save session if unmodified
    store: mongoSessionStore,
    cookie: { maxAge: SessionConfig.SESSION_MAX_AGE },
})

// mongoSessionStore
//                 .on('create', (sessionId) => {
//                     console.log({event: 'create', sessionId});
//                 })
//                 .on('touch', (sessionId) => {
//                     console.log({event: 'touch', sessionId});
//                 })
//                 .on('update', (sessionId) => {
//                     console.log({event: 'update', sessionId});
//                 })
//                 .on('set', (sessionId) => {
//                     console.log({event: 'set', sessionId});
//                 })
//                 .on('connect', (sessionId) => {
//                     console.log({event: 'connect', sessionId});
//                 })
//                 .on('disconnect', (sessionId) => {
//                     console.log({event: 'disconnect', sessionId});
//                 })
//                 .on('destroy', (sessionId) => {
//                     console.log({event: 'destroy', sessionId});
//                 })


const SessionHandling = ( req, res, next) => {
    Session.instance(req.session)
    next()
}


export default SessionMiddleware
export {
    SessionHandling
}