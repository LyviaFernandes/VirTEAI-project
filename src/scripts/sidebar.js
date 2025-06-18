document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const notificationButton = document.getElementById("notification-button");
  const closeSidebar = document.getElementById("close-sidebar");

  // Criar o overlay dinamicamente
  let overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  // Abrir sidebar
  notificationButton.addEventListener("click", () => {
    sidebar.classList.add("visible");
    document.body.classList.add("sidebar-open");
    overlay.classList.add("active");
  });

  // Fechar ao clicar no botão X
  closeSidebar.addEventListener("click", closeSidebarFunc);

  // Fechar ao clicar no overlay
  overlay.addEventListener("click", closeSidebarFunc);

  function closeSidebarFunc() {
    sidebar.classList.remove("visible");
    document.body.classList.remove("sidebar-open");
    overlay.classList.remove("active");
  }
});
