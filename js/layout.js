document.addEventListener("DOMContentLoaded", ()=> {

    // carrega header
    fetch("../header.html")
        .then((response)=>response.text())
        .then((data)=>{
            document.getElementById("header").innerHTML=data;

            // agora que o header está no DOM, verifica o login
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js";
            script.onload = () => {
                try {
                    const token = localStorage.getItem("token");
                    if (token) {
                        const decoded = jwt_decode(token);
                        if (decoded && decoded.nome) {
                            const btLogin = document.getElementById("btLogin");
                            if (btLogin) {
                                btLogin.outerHTML = `
                                <div class="d-flex align-items-center gap-2">
                                    <i class="bi bi-person-circle fs-4 text-light"></i>
                                    <span class="text-light fw-bold">${decoded.nome}</span>
                                    <button class="btn btn-outline-light btn-sm" onclick="sair()">Sair</button>
                                </div>
                                `;
                            }
                        }
                    }
                } catch (e) {
                    console.error("Token inválido:", e);
                }
            };
            document.head.appendChild(script);

        })
        .catch((error) => console.error("Erro ao carregar o header", error));

    // carrega footer
    fetch("../footer.html")
        .then((response)=>response.text())
        .then((data)=>{
            document.getElementById("footer").innerHTML=data
        })
        .catch((error) => console.error("Erro ao carregar o footer", error))

});

function sair() {
    localStorage.removeItem("token");
    window.location.href = "/";
}
