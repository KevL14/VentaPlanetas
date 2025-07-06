export function error404Page() {
   var error404 = document.createElement("section");
   error404.id = "error404";
      error404.dataset.aos = 'fade';
   error404.dataset.aosDuration = '1000';
   error404.innerHTML = `
<div class="container">
    <div class="stars"></div>
    <img src="/Frontend/images/Pages/others/error404/endurance.png" alt="Nave Endurance" class="endurance" />

    <div class="text-content">
      <h1>404</h1>
      <p>Parece que entraste en una órbita desconocida...<br>La página no existe en este sistema.</p>
      <a href="index.html#/" class="btn">Volver a la Tierra</a>
    </div>
  </div>  
`;
    return error404;
}