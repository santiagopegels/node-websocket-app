
const lblEscritorio = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')

const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const screen = searchParams.get('escritorio')
lblEscritorio.innerText = screen
divAlert.style.display = 'none'

const socket = io();


socket.on('connect', () => {
    btnAttend.disabled = false
});

socket.on('disconnect', () => {
    btnAttend.disabled = true
});

socket.on('last-ticket', (lastTicket) => {
   // lblNuevoTicket.innerText = 'Ticket ' + lastTicket
})

btnAttend.addEventListener('click', () => {

socket.emit('attend-ticket', {screen}, ({ok, ticket, msg}) => {

    if( !ok ){
        return divAlert.style.display = '';
    }

    lblTicket.innerText = 'Ticket ' + ticket.number

})

});