export function contactPage(){
   var contact = document.createElement("div");
   contact.id = "contactUs";
   contact.dataset.aos = 'fade';
   contact.dataset.aosDuration='1000';
   contact.innerHTML = `

      <section id="cont_infoContactUs">
         <p data-aos="fade-down"data-aos-delay="300">¿Quieres conocernos mejor?</p>
         <h1 data-aos="fade-down" data-aos-delay="400">Contactanos</h1>
         <h2 data-aos="fade-down"data-aos-delay="500">En Spacelots estamos comprometidos con nuestros clientes<br> Brindamos asesorias para tus futuros proyectos y solucion de problemas de la plataforma</h2>
      
         <div id="cont_CardsInfoContactUs">
            <span class="cardsInfo"data-aos="fade-left" data-aos-delay="850"data-aos-duration="800">
               <img src="/Frontend/images/Pages/contactUs/locate-svg.svg" class="iconsInfoContact">
               <h1>Direccion</h1>
               <p>Puntarenas Centro, Costa Rica</p>
               <a href="https://maps.app.goo.gl/WWDRQf1kL5yRzejN8">Abrir En GoogleMaps></a>
            </span>
            <span class="cardsInfo" data-aos="fade-down" data-aos-delay="600" >
               <img src="/Frontend/images/Pages/contactUs/calendar-svg.svg" class="iconsInfoContact">
               <h1>Horario</h1>
               <p>Lunes / Viernes</p>
               <p>De 7am a 9pm</p>
            </span>
            <span class="cardsInfo" data-aos="fade-right" data-aos-delay="850" data-aos-duration="800">
               <img src="/Frontend/images/Pages/contactUs/callPhone-svg.svg" class="iconsInfoContact">
               <h1>Telefono</h1>
               <p>call / 6X45X499X</p>
               <p>call / 67X4839X4</p>
            </span>
         </div>
      </section>

      <section id="cont_formContactUs"data-aos="fade" data-aos-delay="200">
         <h1>Envianos un Mensaje</h1>
         <form id="formContactUs">

            <span>
               <img src="/Frontend/images/Pages/contactUs/user-svg.svg" alt="Nombre" class="iconsFormContact">
               <input type="text" id="nameContact" placeholder="Nombre">
            </span>
            

            <span>
               <img src="/Frontend/images/Pages/contactUs/email-svg.svg" alt="Email" class="iconsFormContact">
               <input type="email" id="emailContact" placeholder="Correo">
            </span>
            
            <span>
              <textarea name="" id="menssageContact" placeholder="Asunto"></textarea>
            </span>
            
            
            <input type="button" value="Enviar" id="btnSendForm">
         </form>
      </section>
      
   
   `;
   return contact;
}