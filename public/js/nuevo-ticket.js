
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')

const socket = io();



socket.on('connect', () => {

    btnCrear.disabled = false

});

socket.on('disconnect', () => {
    btnCrear.disabled = true
});

socket.on('last-ticket', (lastTicket) => {
    lblNuevoTicket.innerText = 'Ticket ' + lastTicket
})

btnCrear.addEventListener('click', () => {

    socket.emit('next-ticket', null, (nextTicket) => {
        lblNuevoTicket.innerText = nextTicket
    });

});