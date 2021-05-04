const path = require('path')
const fs = require('fs')

class TicketControl {

    constructor() {
        this.lastTicket = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.lastFourTickets = []

        this.init()
    }

    get toJson() {
        return {
            today: this.today,
            tickets: this.tickets,
            lastTicket: this.lastTicket,
            lastFourTickets: this.lastFourTickets
        }
    }

    init() {
        const { today, lastTicket, tickets, lastFourTickets } = require('../db/data.json')
        if (today === this.today) {
            this.tickets = tickets
            this.lastTicket = lastTicket
            this.lastFourTickets = lastFourTickets
        } else {
            this.saveDB()
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }
}

module.exports = TicketControl