
function alerta_sucesso(mensagm){
    //deve se ter criado no topo da página <div id="alertaLogin"></div>
    document.getElementById('alertaLogin').innerHTML = `
        <div class="alert alert-success	text-center" role="alert">
        ${mensagm}
        </div>
    `;
    // Remove o alerta depois de 5 segundos
    setTimeout(() => {
        document.getElementById('alertaLogin').innerHTML = '';
    }, 5000)

}

function alerta_erro(mensagm){
    //deve se ter criado no topo da página <div id="alertaLogin"></div>
    document.getElementById('alertaLogin').innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
        ${mensagm}
        </div>
    `;
    // Remove o alerta depois de 5 segundos
    setTimeout(() => {
        document.getElementById('alertaLogin').innerHTML = '';
    }, 5000)

}