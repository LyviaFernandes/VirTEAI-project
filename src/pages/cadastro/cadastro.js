import axios from "axios";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("register-button");

const register = async () => {
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Desativa o botão para evitar múltiplos cliques
  registerButton.disabled = true;

  // Valida os campos
  if (!name || !email || !password) {
    alert("Por favor, preencha todos os campos.");
    registerButton.disabled = false;
    return;
  }

  try {
    // Faz a requisição para o backend usando Axios
    const response = await axios.post("http://localhost:8082/api/auth/register", {
      name,
      email,
      password
    });

    // Trata sucesso
    if (response.status === 200 || response.status === 201) {
      alert("Cadastro realizado com sucesso! Você pode fazer login agora.");
      window.location.href = "/src/pages/login/index.html"; // Redireciona para a página de login
    }
  } catch (error) {
    // Axios já retorna um objeto de erro detalhado
    if (error.response) {
      // Erro vindo do servidor
      const { data, status } = error.response;
      alert(data.message || `Erro ao tentar realizar cadastro. Código do erro: ${status}`);
    } else if (error.request) {
      // A requisição foi enviada, mas não houve resposta do servidor
      console.error("Erro de rede ou servidor não respondeu:", error.request);
      alert("Erro ao se conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.");
    } else {
      // Erro genérico ao configurar a requisição
      console.error("Erro desconhecido:", error.message);
      alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  } finally {
    // Reativa o botão independente do resultado
    registerButton.disabled = false;
  }
};

// Corrigido para tratar a Promise retornada pelo `register()`
registerButton.addEventListener("click", async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário
  await register(); // Agora a Promise será aguardada e tratada
});