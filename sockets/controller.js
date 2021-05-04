const TicketControl = require('../models/ticketControl')

const ticketControl = new TicketControl()

const socketController = (socket) => {
    
    console.log('Cliente conectado', socket.id );


    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}

