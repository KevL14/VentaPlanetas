export function contactPage() {
  const contact = document.createElement("div");
  contact.id = "contactUs";
  contact.dataset.aos = 'fade';
  contact.dataset.aosDuration = '1000';

  contact.innerHTML = `
    <section id="cont_infoContactUs">
      <p data-aos="fade-down" data-aos-delay="300">¿Quieres conocernos mejor?</p>
      <h1 data-aos="fade-down" data-aos-delay="400">Contáctanos</h1>
      <h2 data-aos="fade-down" data-aos-delay="500">
        En Spacelots estamos comprometidos con nuestros clientes<br> 
        Brindamos asesorías para tus futuros proyectos y solución de problemas de la plataforma
      </h2>

      <div id="cont_CardsInfoContactUs">
        <span class="cardsInfo" data-aos="fade-left" data-aos-delay="850" data-aos-duration="800">
          <img src="/Frontend/images/Pages/contactUs/locate-svg.svg" class="iconsInfoContact">
          <h1>Dirección</h1>
          <p>Puntarenas Centro, Costa Rica</p>
          <a href="https://maps.app.goo.gl/WWDRQf1kL5yRzejN8" target="_blank">Abrir en Google Maps</a>
        </span>
        <span class="cardsInfo" data-aos="fade-down" data-aos-delay="600">
          <img src="/Frontend/images/Pages/contactUs/calendar-svg.svg" class="iconsInfoContact">
          <h1>Horario</h1>
          <p>Lunes / Viernes</p>
          <p>De 7am a 9pm</p>
        </span>
        <span class="cardsInfo" data-aos="fade-right" data-aos-delay="850" data-aos-duration="800">
          <img src="/Frontend/images/Pages/contactUs/callPhone-svg.svg" class="iconsInfoContact">
          <h1>Teléfono</h1>
          <p>call / 6X45X499X</p>
          <p>call / 67X4839X4</p>
        </span>
      </div>
    </section>

    <section id="cont_formContactUs" data-aos="fade" data-aos-delay="200">
      <h1>Envíanos un Mensaje</h1>
      <form id="formContactUs" action="https://formspree.io/f/mvgrnyyp" method="POST">
        <span>
          <img src="/Frontend/images/Pages/contactUs/user-svg.svg" alt="Nombre" class="iconsFormContact">
          <input type="text" id="nameContact" name="name" placeholder="Nombre" required>
        </span>

        <span>
          <img src="/Frontend/images/Pages/contactUs/email-svg.svg" alt="Email" class="iconsFormContact">
          <input type="email" id="emailContact" name="email" placeholder="Correo" required>
        </span>

        <span>
          <textarea id="menssageContact" name="message" placeholder="Asunto" required></textarea>
        </span>

        <button type="submit" id="btnSendForm">Enviar</button>
      </form>
    </section>
  `;

  setTimeout(() => {
    const form = contact.querySelector("#formContactUs");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          form.reset();
          alert("✅ Tu mensaje fue enviado exitosamente.");
        } else {
          alert("❌ Ocurrió un error al enviar el mensaje.");
        }
      }).catch(() => {
        alert("❌ Error de red. Intenta de nuevo.");
      });
    });
  }, 0);

  return contact;
}
