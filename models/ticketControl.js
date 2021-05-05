const path = require('path')
const fs = require('fs')

class Ticket {
    constructor(number, screen){
        this.number = number
        this.screen = screen
    }
}

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

    nextTicket(){
        this.lastTicket += 1
        const ticket = new Ticket(this.lastTicket, null)      
        this.tickets.push(ticket) 
        this.saveDB()
        return 'Ticket ' + ticket.number
    }

    attendTicket( screen ){
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift()
        ticket.screen = screen

        this.lastFourTickets.unshift(ticket)

        if(this.lastFourTickets.length > 4){
            this.lastFourTickets.splice(-1,1)
        }

        this.saveDB()

        return ticket
    }
}

module.exports = TicketControl