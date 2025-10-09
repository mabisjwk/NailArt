// === Botões de escolha de serviço (Manicure / Pedicure / Ambos) ===
const botoesServico = document.querySelectorAll(".botoes #botao-roxo");

botoesServico.forEach((botao) => {
  botao.addEventListener("click", () => {
    // Remove o destaque de todos os botões
    botoesServico.forEach((b) => {
      b.style.backgroundColor = "white";
      b.style.color = "black";
    });

    // Destaca o botão clicado
    botao.style.backgroundColor = "#9A1088";
    botao.style.color = "white";
  });
});


// === Função para abrir/fechar listas ===
document.querySelectorAll("#btn-menu, #btn-menu2").forEach((botao) => {
  botao.addEventListener("click", () => {
    const lista = botao.nextElementSibling;
    if (lista && lista.classList.contains("escondido")) {
      lista.classList.remove("escondido");
    } else if (lista) {
      lista.classList.add("escondido");
    }
  });
});

// === Função para esconder a lista ao clicar em um item ===
document.querySelectorAll("ul li").forEach((item) => {
  item.addEventListener("click", () => {
    const lista = item.parentElement;
    lista.classList.add("escondido");
  });
});

// === Mostrar/ocultar input quando o usuário escolhe "Sim" ou "Não" ===
document.querySelectorAll(".sn2").forEach((grupo) => {
  const botoes = grupo.querySelectorAll("#sino");
  const listaInput = grupo.querySelector("ul");

  if (!botoes || !listaInput) return;

  const [botaoSim, botaoNao] = botoes;

  botaoSim.addEventListener("click", () => {
    listaInput.classList.remove("escondido");
    botaoSim.style.backgroundColor = "#9A1088";
    botaoNao.style.backgroundColor = "";
  });

  botaoNao.addEventListener("click", () => {
    listaInput.classList.add("escondido");
    botaoNao.style.backgroundColor = "#9A1088";
    botaoSim.style.backgroundColor = "";
  });
});

// === Botões de "Sim" e "Não" gerais (sem input) ===
document.querySelectorAll(".sn").forEach((grupo) => {
  const botoes = grupo.querySelectorAll("#sino");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoes.forEach((b) => (b.style.backgroundColor = ""));
      botao.style.backgroundColor = "#9A1088";
    });
  });
});

// Referências das telas
const telaAgendamento = document.getElementById('tela-agendamento');
const telaConfirmacao = document.getElementById('tela-confirmacao');
const telaSucesso = document.getElementById('tela-sucesso');

// Referência dos botões
const btnConfirmar = document.getElementById('enviar');
const btnSim = document.getElementById('confirmar-sim');
const btnNao = document.getElementById('confirmar-nao');
const btnVoltar = document.getElementById('voltar-agenda');

// Quando clicar em "Confirmar agendamento"
btnConfirmar.addEventListener('click', () => {
  telaAgendamento.style.display = 'none';
  telaConfirmacao.style.display = 'flex';
});

// Se confirmar (Sim)
btnSim.addEventListener('click', () => {
  telaConfirmacao.style.display = 'none';
  telaSucesso.style.display = 'flex';
});

// Se desistir (Não)
btnNao.addEventListener('click', () => {
  telaConfirmacao.style.display = 'none';
  telaAgendamento.style.display = 'block';
});

// Voltar à agenda depois do sucesso
btnVoltar.addEventListener('click', () => {
  telaSucesso.style.display = 'none';
  telaAgendamento.style.display = 'block';
});

