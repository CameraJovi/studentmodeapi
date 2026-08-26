const botaoMenu = document.querySelector(".botao-menu");
const linksDoMenu = document.querySelectorAll(".menu-principal a");
const formulario = document.querySelector("#formulario-contato");
const retornoFormulario = document.querySelector("#retorno-formulario");
const anoAtual = document.querySelector("#ano-atual");

function fecharMenu() {
  document.body.classList.remove("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu de navegação");
}

botaoMenu.addEventListener("click", () => {
  const menuEstaAberto = document.body.classList.toggle("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
  botaoMenu.setAttribute(
    "aria-label",
    menuEstaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação",
  );
});

linksDoMenu.forEach((link) => link.addEventListener("click", fecharMenu));

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) fecharMenu();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = new FormData(formulario).get("nome").trim();

  retornoFormulario.textContent = `Obrigado, ${nome}! A mensagem foi validada nesta demonstração.`;
  formulario.reset();
});

anoAtual.textContent = new Date().getFullYear();
