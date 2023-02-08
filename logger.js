// const date = require('date-fns')
// const uuid = require('uuid')
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path')


const createLogItem = (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    return `${uuid()}\t${dateTime}\t${message}\n`
}

const saveLogItem = (logItem) => {
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdir(path.join(__dirname, 'logs'), (err) => {
            if(err) console.error(err)
        })
    }
    
    fs.appendFile(path.join(__dirname, 'logs', 'log-events.txt'),
        logItem, (err) => {
            if(err) console.error(err)
    })
}

const logEvent = (message) => saveLogItem(createLogItem(message))

module.exports = {logEvent}