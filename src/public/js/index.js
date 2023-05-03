(async () => {
    const boton = document.getElementById('boton-mail');
    const msg = document.getElementById('mensaje');
    const nada = document.getElementById('nada');
    const mensajeDiv = document.getElementById('divMensajes');

    socket = io();

    boton.addEventListener('click', (e) => {
        e.preventDefault();
        if (msg.value == '') {
            return
        }
        buttonSubmit();
    })

    const user = await fetch(`/api/user/current`)
    const userParsed = await user.json()

    const buttonSubmit = async () => {


        socket.emit('mensajes', {
            message: msg.value,
            email: userParsed.email,
            name: userParsed.name,
            lastname: userParsed.lastname
        })
        msg.value = '';
    }

    socket.on('mensajesCompleto', (data) => {
        mensajeDiv.innerHTML = '';
        renderMsg(data);
    })


    const renderMsg = (data) => {
        nada.classList.add('hide');
        data.forEach(e => {
            const divMsg = document.createElement('div');
            if (e.email == userParsed.email) {
                divMsg.classList.add('mensaje-derecha');
            }
            else {
                divMsg.classList.add('mensaje-izquierda');
            }
            const p_name = `<p class="mensaje-autor centrar">${e.name} ${e.lastname}</p>`
            const p_msg = `<p class="mensaje-texto centrar">${e.message}</p>`
            const p_date = `<div class="div-date"><p class="mensaje-date centrar">${e.date}</p></div>`
            divMsg.innerHTML = p_name + p_msg + p_date;
            mensajeDiv.appendChild(divMsg);
        });
    }
})()

