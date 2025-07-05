export function home(){
    var homePage = document.createElement("div");
    homePage.id="home";
    homePage.innerHTML=`
        <section id="sec_infoMain" class="sectionHome" data-aos="fade" data-aos-duration="1500">
            <h1 class="sec1_titles">Comprar y Vender</h1>
            <h2 class="sec1_titles">Lotes en Planetas y Lunas</h2>
            <p>Spacelot es una plataforma para comprar y vender terrenos virtuales en planetas y lunas, combinando tecnología, exploración espacial y propiedad digital en una experiencia única.</p>

            <div class="marquee">
            <div class="marquee_header">Descubre</div>
                <div class="marquee__inner">
                    <div class="marquee__group">
                    <span>🪐 Planetas</span>
                    <span>🌕 Lunas</span>
                    <span>🗺️ Lugares</span>
                    <span>🌟 Oportunidades</span>
                    <span>🚀 Viajes</span>
                    </div>

                    <div class="marquee__group">
                    <span>🪐 Planetas</span>
                    <span>🌕 Lunas</span>
                    <span>🗺️ Lugares</span>
                    <span>🌟 Oportunidades</span>
                    <span>🚀 Viajes</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="sec_infoDescription" class="sectionHome">
             <div data-aos="fade-right" data-aos-delay="400" data-aos-duration="700">
                <h1>
                    Descripcion
                </h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error neque laudantium quod, soluta praesentium ipsam voluptatibus nesciunt. Delectus est sed ipsum id consequatur labore fugiat laboriosam asperiores praesentium maxime rem sunt dolor, sapiente aliquid dolorum ad. Quisquam voluptate voluptas corrupti?
                </p>
            </div>
            <div data-aos="fade" data-aos-delay="500" data-aos-duration="900">
                <img src="/Frontend/images/Pages/home/sec_infoDescriptionImage.png" alt="SaturnoImage">
            </div>
        </section>

        <section id="sec_infoWeOffer" class="sectionHome">
            <h1>Ofrecemos</h1>
            <p  data-aos="fade-down">Contamos con multiples lugares en diversos planetas donde puedes planear tu vida futura o crear lugares donde descansar</p>
            <div class="parent">
            <div class="weOffer1 weOfferImages" data-aos="fade" data-aos-delay="600"> <h1>Lunas</h1></div>
            <div class="weOffer2 weOfferImages" data-aos="fade" data-aos-delay="300"> <h1>Planetas</h1></div>
            <div class="weOffer3 weOfferImages" data-aos="fade" data-aos-delay="600"> <h1>Galaxias</h1></div>
            </div>
        </section>
    `;
    return homePage;
}