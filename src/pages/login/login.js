import axios from "axios";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

const login = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Desativa o botão para evitar múltiplos cliques
  loginButton.disabled = true;

  // Verifica se os campos estão preenchidos
  if (!email || !password) {
    alert("Por favor, preencha todos os campos.");
    loginButton.disabled = false;
    return;
  }

  try {
    // Faz a requisição para o backend usando Axios
    const response = await axios.post("http://localhost:8082/api/auth/login", {
      email,
      password
    });

    // Trata sucesso
    if (response.status === 200 || response.status === 201) {
      alert("Login realizado com sucesso!");
      window.location.href = "/src/pages/home/index.html"; // Redireciona o usuário para a página principal
    }
  } catch (error) {
    // Trata o erro retornado pelo Axios
    if (error.response) {
      // Resposta do servidor com erro
      const { data, status } = error.response;
      alert(data.message || `Erro ao tentar fazer login. Código do erro: ${status}`);
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
    loginButton.disabled = false;
  }
};

// Evento do botão de login
loginButton.addEventListener("click", async (e) => {
  e.preventDefault(); // Evita o redirecionamento padrão do formulário
  await login(); // Aguarda a execução do login para tratá-lo
});