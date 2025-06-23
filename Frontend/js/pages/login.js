export function loginPage() {
   var login = document.createElement("div");
   login.id = "login";
   login.innerHTML = `
         <div class="wrapper">
               <div class="card-switch">
                     <label class="switch">
                        <input type="checkbox" class="toggle">
                        <span class="slider"></span>
                        <span class="card-side"></span>
                        
                        <div class="flip-card__inner">
                           <div class="flip-card__front">
                              <div class="title">Log in</div>
                              <form class="flip-card__form">
                                 <input class="flip-card__input" name="email" placeholder="Email" type="email">
                                 <input class="flip-card__input" name="password" placeholder="Password" type="password">
                                 <button id="btnConfirmRegister" class="flip-card__btn">Lets go!</button>
                              </form>
                           </div>
                           <div class="flip-card__back">
                              <div class="title">Sign up</div>
                              <form class="flip-card__form">
                                 <input class="flip-card__input" placeholder="Name" type="name">
                                 <input class="flip-card__input" name="email" placeholder="Email" type="email">
                                 <input class="flip-card__input" name="password" placeholder="Password" type="password">
                                 <button id ="btnConfirmLogin" class="flip-card__btn">Confirm!</button>
                              </form>
                              </div>
                              </div>
                              </label>
               </div>   
            </div>
    `;
    
      login.querySelector('#btnConfirmRegister').addEventListener('click', () => {

         location.hash = '/';  
      });

      login.querySelector('#btnConfirmLogin').addEventListener('click', () => {
         location.hash = '/';  
      });


   return login;
}