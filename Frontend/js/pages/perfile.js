export function perfilePage() {
   var perfile = document.createElement("div");
   perfile.id = "perfile";
   perfile.innerHTML = `
   
        <section id="cont_InfoPerfile">

          <div id="infoOwn" class="cardPerfiles"data-aos="fade-right" data-aos-delay="300" data-aos-duration="500">
            <img id="photoPerfileUser" src="/Frontend/images/Pages/perfile/PhotosPerfile/perfile1.png" alt="PerfilePhoto">
            <h1 id="userName"> Kevin Leal</h1>
            <h2 id="ages">19</h2>
              <table id="tbCountLots">
                  <tr>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Compras</td>
                    <td>Favoritos</td>
                  </tr>
              </table>

          </div>

          <div id="cont_InfoFinancesLots" >

            <div id="infoFinanceUser" class="cardPerfiles" data-aos="fade-left" data-aos-delay="500" data-aos-duration="500">
                <table>
                  <tr>
                    <td>CreditoActual</td>
                    <td>C 1000</td>
                  </tr>
                  <tr>
                    <td>Invertido</td>
                    <td>200</td>
                  </tr>
                </table>
            </div>
            <div id="infoLotsListOptions">
              <a class="cardPerfiles" onclick="document.getElementById('cont_ListLotsUser').scrollIntoView({ behavior: 'smooth' });"
                data-aos="fade-up" data-aos-delay="900" data-aos-duration="500"
              >
              <img src="/Frontend/images/Pages/perfile/heart-svg.svg" class="iconsListLots">
                Ver Favoritos
              </a>
              <a class="cardPerfiles"  onclick="document.getElementById('cont_ListLotsUser').scrollIntoView({ behavior: 'smooth' });"
                data-aos="fade-up" data-aos-delay="700" data-aos-duration="500"
              >
                <img src="/Frontend/images/Pages/perfile/shoppingbag-svg.svg" class="iconsListLots">
                Ver Comprados
              </a>
              
            </div>
          </div>
        </section>
   
        <section id="cont_ListLotsUser">


          <h1>No se Encuentran Lotes Guardados</h1>

        </section>


   
   `;
   return perfile;

}