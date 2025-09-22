// importa a biblioteca jwt-decode
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js";
script.onload = () => {
    // Só aqui o jwt_decode já existe
    try {
        // carrega do localstorage o token
        const token = localStorage.getItem("token");

        // decodifica o token
        const decoded = jwt_decode(token);

        // verifica se o tipo é admin ou editor e se não expirou
        const agora = Math.floor(Date.now() / 1000);
        if ((decoded.tipo !== "admin" && decoded.tipo !== "editor") || decoded.exp < agora) {
            window.location.href = "/login.html?unauthorized=true";
        }
    } catch (e) {
        console.error("Token inválido:", e);
        window.location.href = "/login.html?unauthorized=false";
    }
};
document.head.appendChild(script);



document.addEventListener("DOMContentLoaded", ()=> {
    //carrega o header
    fetch("header.html")
        .then((response)=>response.text())
        .then((data)=>{
            document.getElementById("header").innerHTML=data
        })
        .catch((error) => console.error("Erro ao carregar o header", error))    
})

function sair() {
        localStorage.removeItem("token");
        window.location.href = "/login.html";
    
}
