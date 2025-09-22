document.addEventListener("DOMContentLoaded", () => {
    // carrega header primeiro
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            // agora que o header está no DOM, valida a sessão e atualiza botão
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js";
            script.onload = () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("Token não encontrado");

                    const decoded = jwt_decode(token);

                    // valida tipo e expiração
                    const agora = Math.floor(Date.now() / 1000);
                    if ((decoded.tipo !== "admin" && decoded.tipo !== "editor") || decoded.exp < agora) {
                        window.location.href = "/login.html?unauthorized=true";
                        return;
                    }

                    // substitui botão login por usuário logado
                    const btLogin = document.getElementById("btLogin");
                    if (btLogin && decoded.nome) {
                        btLogin.outerHTML = `
                            <div class="d-flex align-items-center gap-2">
                                <i class="bi bi-person-circle fs-4 text-light"></i>
                                <span class="text-light fw-bold">${decoded.nome}</span>
                                <button class="btn btn-outline-light btn-sm" onclick="sair()">Sair</button>
                            </div>
                        `;
                    }
                } catch (e) {
                    console.error("Token inválido:", e);
                    window.location.href = "/login.html?unauthorized=false";
                }
            };
            document.head.appendChild(script);
        })
        .catch(error => console.error("Erro ao carregar o header", error));
});

function sair() {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}
