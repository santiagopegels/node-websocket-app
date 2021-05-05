const TicketControl = require('../models/ticketControl')

const ticketControl = new TicketControl()

const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    socket.emit('last-ticket', ticketControl.lastTicket)
    socket.emit('actual-state', ticketControl.lastFourTickets)
    socket.emit('pending-tickets', ticketControl.tickets.length)

    socket.on('next-ticket', (payload, callback) => {

        const nextTicket = ticketControl.nextTicket()

        callback(nextTicket)
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)


    })

    socket.on('attend-ticket', ({ screen }, callback) => {


        if (!screen) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicket(screen)

        socket.broadcast.emit('actual-state', ticketControl.lastFourTickets)
        socket.emit('pending-tickets', ticketControl.tickets.length)
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)


        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            })
        } else {
            return callback({
                ok: true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

