let participantes = [
  {
    nome: 'Esther',
    email: 'esther@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 10),
  },
  {
    nome: 'Matheus',
    email: 'matheus@gmail.com',
    dataInscricao: new Date(2024, 2, 24, 21, 50),
    // dataCheckIn: new Date(2024, 2, 27, 17, 45),
    dataCheckIn: null,
  },
  {
    nome: 'Joana',
    email: 'joana@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 28, 9, 15),
  },
  {
    nome: 'Lucas',
    email: 'lucas@gmail.com',
    dataInscricao: new Date(2024, 2, 26, 15, 40),
    dataCheckIn: new Date(2024, 2, 29, 12, 30),
  },
  {
    nome: 'Victor',
    email: 'victor@gmail.com',
    dataInscricao: new Date(2024, 2, 28, 9, 0),
    // dataCheckIn: new Date(2024, 2, 30, 14, 20),
    dataCheckIn: null,
  },
  {
    nome: 'Pedro',
    email: 'pedro@gmail.com',
    dataInscricao: new Date(2024, 2, 29, 18, 10),
    dataCheckIn: new Date(2024, 3, 1, 8, 30),
  },
  {
    nome: 'Ana',
    email: 'ana@gmail.com',
    dataInscricao: new Date(2024, 2, 25, 12, 20),
    dataCheckIn: new Date(2024, 3, 2, 10, 45),
  },
  {
    nome: 'Gabriel',
    email: 'gabriel@gmail.com',
    dataInscricao: new Date(2024, 2, 27, 16, 0),
    // dataCheckIn: new Date(2024, 3, 3, 11, 55),
    dataCheckIn: null,
  },
  {
    nome: 'Julia',
    email: 'julia@gmail.com',
    dataInscricao: new Date(2024, 2, 30, 14, 30),
    dataCheckIn: new Date(2024, 3, 1, 8, 40),
  },
  {
    nome: 'Rafael',
    email: 'rafael@gmail.com',
    dataInscricao: new Date(2024, 3, 1, 11, 20),
    dataCheckIn: new Date(2024, 3, 1, 15, 20),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>`;
  }

  return `
    <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = '';
  // repetição
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  document.querySelector('tbody').innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email,
  );

  if (participanteExiste) {
    alert('Email já cadastrado!');
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  // limpar formulario
  event.target.querySelector('[name="nome"]').value = '';
  event.target.querySelector('[name="email"]').value = '';
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?';
  if (confirm(mensagemConfirmacao) == false) return;

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};
