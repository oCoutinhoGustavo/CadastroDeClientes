const form = document.querySelector('#formulario')
const nome = document.querySelector('#nome')
const idade = document.querySelector('#idade')
const email = document.querySelector('#email')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const verificaSeJaExiste = email.value
  if (nome.value && idade.value && email.value && !clientes[verificaSeJaExiste]) {
    criaCliente(nome.value, idade.value, email.value)
    idade.value = ''
    nome.value = ''
    email.value = ''
    alert('Cliente cadastrado')
  } else {
    if (clientes[verificaSeJaExiste]) {
      alert('Cliente com email ja cadastrado')
    } else {
      alert('Cadastro incorreto')

    }
  }
  salvarTudo();

})


let clientes = {}
const criaCliente = (nome, idade, email) => {
  const novaPessoa = { nome, idade, email }

  clientes[email] = novaPessoa;
  console.log(clientes[email]);
}
/////////////////////////////////////////////////////////


const pesquisa = document.querySelector('#pesquisa'); //input
const btnPesquisar = document.querySelector('#btnPesquisar'); // botão pesquisar
const secaoPesquisa = document.querySelector('#secaoPesquisa') // seção do pesquisa

btnPesquisar.addEventListener('click', function (e) {
  e.preventDefault()
  fazPesquisa()
  // alert('oi')
})

/* function verificaEmail(texto) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(texto);
} */

const fazPesquisa = () => {
  let nomeEmail = pesquisa.value
  let psq = clientes[nomeEmail]

  if (psq) {
    const div = criaDiv()
    div.innerText = `Nome: ${psq.nome} \n Idade: ${psq.idade} \n Email: ${psq.email}`
    div.classList.add('bad')
    secaoPesquisa.appendChild(div)
    pesquisa.value = ""
    const button = criaBtnDelete()
    button.id = nomeEmail;
    div.appendChild(button)

  } else alert('Email não cadastrado')
}


const criaDiv = () => {
  const div = document.createElement('div')
  return div
}

const criaBtnDelete = () => {
  const button = document.createElement('button')
  button.innerText = 'Deletar cliente'
  button.classList.add('btnDelete')
  // button.style.backgroundColor('red')
  return button
}

document.addEventListener('click', function (e) {
  const click = e.target;
  const idEmail = click.id;
  if (click.classList.contains('btnDelete')) {
    click.parentElement.remove();
    deletaConta(idEmail)
  }
})

const deletaConta = (email) => {
  delete clientes[email]
  salvarTudo();
}


const salvarTudo = () => {
  const clientesJSON = JSON.stringify(clientes);
  localStorage.setItem('clientesDoGustavo', clientesJSON)
}

const adicionarClientesNovamente = () => {
  const clientesSalvos = localStorage.getItem('clientesDoGustavo');
  if (clientesSalvos) {
    const clientesCarregados = JSON.parse(clientesSalvos);
    // Verifica se existem clientes carregados e se o objeto não está vazio
    if (clientesCarregados && Object.keys(clientesCarregados).length !== 0) {
      // Atualiza o objeto 'clientes' com os clientes carregados
      clientes = clientesCarregados;
    }
  }
};
adicionarClientesNovamente()