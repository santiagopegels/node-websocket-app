const TicketControl = require('../models/ticketControl')

const ticketControl = new TicketControl()

const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );

    socket.emit('last-ticket', ticketControl.lastTicket)

    socket.on('next-ticket', ( payload, callback ) => {
        
        const nextTicket = ticketControl.nextTicket()

        callback( nextTicket )

    })

}



module.exports = {
    socketController
}

