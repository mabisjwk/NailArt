// === Botões de escolha de serviço ===
const botoesServico = document.querySelectorAll(".botoes #botao-roxo");
let servicoSelecionado = "";

botoesServico.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoesServico.forEach((b) => {
      b.style.backgroundColor = "white";
      b.style.color = "black";
    });
    botao.style.backgroundColor = "#35042e";
    botao.style.color = "white";
    servicoSelecionado = botao.textContent;
    atualizarResumo();
  });
});

// === Abrir/fechar listas ===
document.querySelectorAll("#btn-menu, #btn-menu2").forEach((botao) => {
  botao.addEventListener("click", () => {
    const lista = botao.nextElementSibling;
    if (lista) lista.classList.toggle("escondido");
  });
});

// === Selecionar item da lista ===
document.querySelectorAll("ul li").forEach((item) => {
  item.addEventListener("click", () => {
    const lista = item.parentElement;
    lista.querySelectorAll("li").forEach((li) => li.classList.remove("selecionado"));
    item.classList.add("selecionado");
    lista.classList.add("escondido");
  });
});

// === Mostrar/ocultar input com "Sim/Não" ===
document.querySelectorAll(".sn2").forEach((grupo) => {
  const botoes = grupo.querySelectorAll("#sino");
  const campoInput = grupo.querySelector("div.escondido");

  if (!botoes || !campoInput) return;

  botoes[0].addEventListener("click", () => {
    campoInput.classList.remove("escondido");
    botoes[0].style.backgroundColor = "#35042e";
    botoes[1].style.backgroundColor = "";
    atualizarResumo();
  });

  botoes[1].addEventListener("click", () => {
    campoInput.classList.add("escondido");
    botoes[1].style.backgroundColor = "#35042e";
    botoes[0].style.backgroundColor = "";

    // Limpa o input escondido
    const input = campoInput.querySelector("input");
    if (input) input.value = "";

    atualizarResumo();
  });
});

// === Botões "Sim/Não" gerais ===
document.querySelectorAll(".sn").forEach((grupo) => {
  const botoes = grupo.querySelectorAll("#sino");
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoes.forEach((b) => b.style.backgroundColor = "");
      botao.style.backgroundColor = "#35042e";
    });
  });
});

// === Telas ===
const telaAgendamento = document.getElementById('tela-agendamento');
const telaConfirmacao = document.getElementById('tela-confirmacao');
const telaSucesso = document.getElementById('tela-sucesso');

// === Botões ===
const btnConfirmar = document.getElementById('enviar');
const btnSim = document.getElementById('confirmar-sim');
const btnNao = document.getElementById('confirmar-nao');
const btnVoltar = document.getElementById('voltar-agenda');

// === Resumo ===
const resumoDiv = document.getElementById('resumo-agendamento');
const resumoLista = document.getElementById('resumo-lista');

// === Montar resumo e mostrar confirmação ===
btnConfirmar.addEventListener('click', () => {
  resumoLista.innerHTML = "";

  if (servicoSelecionado) {
    resumoLista.innerHTML += `<li><strong>Serviço:</strong> ${servicoSelecionado}</li>`;
  }

  const tratamento = document.querySelector(".sn #sino[style*='rgb(154, 16, 136)']");
  if (tratamento) {
    resumoLista.innerHTML += `<li><strong>Tratamento especial:</strong> ${tratamento.nextElementSibling.textContent}</li>`;
  }

  const esmalte = document.querySelectorAll(".selecao")[0].querySelector("li.selecionado");
  if (esmalte) {
    resumoLista.innerHTML += `<li><strong>Esmaltação:</strong> ${esmalte.textContent}</li>`;
  }

  const formato = document.querySelectorAll(".selecao")[1].querySelector("li.selecionado");
  if (formato) {
    resumoLista.innerHTML += `<li><strong>Formato de unha:</strong> ${formato.textContent}</li>`;
  }

  const gelInput = document.querySelectorAll("#campo-gel input")[0];
  if (gelInput && gelInput.value.trim()) {
    resumoLista.innerHTML += `<li><strong>Estilização:</strong> ${gelInput.value}</li>`;
  }

  const cor = document.getElementById("cor-esmalte").value;
  if (cor.trim()) {
    resumoLista.innerHTML += `<li><strong>Cor desejada:</strong> ${cor}</li>`;
  }

  const dia = document.querySelectorAll(".bloco")[0].querySelector("li.selecionado");
  const horario = document.querySelectorAll(".bloco")[1].querySelector("li.selecionado");
  if (dia && horario) {
    resumoLista.innerHTML += `<li><strong>Dia:</strong> ${dia.textContent}</li>`;
    resumoLista.innerHTML += `<li><strong>Horário:</strong> ${horario.textContent}</li>`;
  }

  const atendenteInput = document.querySelectorAll("#campo-gel input")[1];
  if (atendenteInput && atendenteInput.value.trim()) {
    resumoLista.innerHTML += `<li><strong>Atendente:</strong> ${atendenteInput.value}</li>`;
  }

  const observacoes = document.getElementById("livre").value;
  if (observacoes.trim()) {
    resumoLista.innerHTML += `<li><strong>Observações:</strong> ${observacoes}</li>`;
  }

  resumoDiv.classList.remove("escondido");
  telaAgendamento.style.filter = 'blur(6px)';
  telaAgendamento.style.pointerEvents = 'none';
  telaConfirmacao.style.display = 'flex';
});

// === Confirmação ===
btnSim.addEventListener('click', () => {
  console.log('Agendamento confirmado!');
  showSuccessScreen();
});

btnNao.addEventListener('click', () => {
  console.log('Agendamento cancelado.');
  hideConfirmScreen();
  telaAgendamento.style.filter = 'none';
  telaAgendamento.style.pointerEvents = 'auto';
});

btnVoltar.addEventListener('click', () => {
  telaSucesso.style.display = 'none';
  telaAgendamento.style.filter = 'none';
  telaAgendamento.style.pointerEvents = 'auto';
});

function showSuccessScreen() {
  telaSucesso.style.display = 'flex';
  telaConfirmacao.style.display = 'none';
}

function hideConfirmScreen() {
  telaConfirmacao.style.display = 'none';
}

function atualizarResumo() {
  const resumoLista = document.getElementById("resumo-lista");
  resumoLista.innerHTML = "";

  // Serviço
  const servico = Array.from(document.querySelectorAll(".botoes #botao-roxo"))
    .find((b) => b.style.backgroundColor === "rgb(154, 16, 136)");
  if (servico) {
    resumoLista.innerHTML += `<li><strong>Serviço:</strong> ${servico.textContent}</li>`;
  }

  // Tratamento especial
  const tratamento = document.querySelector(".sn #sino[style*='rgb(154, 16, 136)']");
  if (tratamento) {
    resumoLista.innerHTML += `<li><strong>Tratamento especial:</strong> ${tratamento.nextElementSibling.textContent}</li>`;
  }

  // Esmaltação
  const esmalte = document.querySelectorAll(".selecao")[0].querySelector("li.selecionado");
  if (esmalte) {
    resumoLista.innerHTML += `<li><strong>Esmaltação:</strong> ${esmalte.textContent}</li>`;
  }

  // Formato de unha
  const formato = document.querySelectorAll(".selecao")[1].querySelector("li.selecionado");
  if (formato) {
    resumoLista.innerHTML += `<li><strong>Formato de unha:</strong> ${formato.textContent}</li>`;
  }

  // Gel ou acrílico
  const gelInput = document.querySelectorAll("#campo-gel input")[0];
  if (gelInput && gelInput.value.trim()) {
    resumoLista.innerHTML += `<li><strong>Estilização:</strong> ${gelInput.value}</li>`;
  }

  // Cor
  const cor = document.getElementById("cor-esmalte").value;
  if (cor.trim()) {
    resumoLista.innerHTML += `<li><strong>Cor desejada:</strong> ${cor}</li>`;
  }

  // Dia e horário
  const dia = document.querySelectorAll(".bloco")[0].querySelector("li.selecionado");
  const horario = document.querySelectorAll(".bloco")[1].querySelector("li.selecionado");
  if (dia && horario) {
    resumoLista.innerHTML += `<li><strong>Dia:</strong> ${dia.textContent}</li>`;
    resumoLista.innerHTML += `<li><strong>Horário:</strong> ${horario.textContent}</li>`;
  }

  // Atendente
  const atendenteInput = document.querySelectorAll("#campo-gel input")[1];
  if (atendenteInput && atendenteInput.value.trim()) {
    resumoLista.innerHTML += `<li><strong>Atendente:</strong> ${atendenteInput.value}</li>`;
  }

  // Observações
  const obs = document.getElementById("livre").value;
  if (obs.trim()) {
    resumoLista.innerHTML += `<li><strong>Observações:</strong> ${obs}</li>`;
  }

  document.getElementById("resumo-agendamento").classList.remove("escondido");
}

// Atualizar resumo ao digitar nos inputs
document.getElementById("cor-esmalte").addEventListener("input", atualizarResumo);
document.getElementById("livre").addEventListener("input", atualizarResumo);

document.querySelectorAll("#campo-gel input").forEach((input) => {
  input.addEventListener("input", atualizarResumo);
});

// Atualizar resumo ao selecionar item das listas
document.querySelectorAll("ul li").forEach((item) => {
  item.addEventListener("click", () => {
    const lista = item.parentElement;
    lista.querySelectorAll("li").forEach((li) => li.classList.remove("selecionado"));
    item.classList.add("selecionado");
    lista.classList.add("escondido");
    atualizarResumo();
  });
});

// Atualizar resumo ao clicar em botões "Sim/Não" gerais
document.querySelectorAll(".sn #sino").forEach((botao) => {
  botao.addEventListener("click", () => {
    atualizarResumo();
  });
});