export function navbar(){
var nav = document.createElement("nav");
nav.innerHTML=`
<div class="button-container">
  <button class="button" id="homeNav">
    <svg class="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em"
      width="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z">
      </path>
    </svg>
  </button>


  <button class="button" id="shoppingNav">
    <svg class="icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
      stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  </button>


  <h1 id="logoNav">SpaceLots</h1>


  <button class="button" id="contactUsNav">
    <svg class="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em"
      width="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3308 15.9402L15.6608 14.6101C15.8655 14.403 16.1092 14.2384 16.3778 14.1262C16.6465 14.014 16.9347 13.9563 17.2258 13.9563C17.517 13.9563 17.8052 14.014 18.0739 14.1262C18.3425 14.2384 18.5862 14.403 18.7908 14.6101L20.3508 16.1702C20.5579 16.3748 20.7224 16.6183 20.8346 16.887C20.9468 17.1556 21.0046 17.444 21.0046 17.7351C21.0046 18.0263 20.9468 18.3146 20.8346 18.5833C20.7224 18.8519 20.5579 19.0954 20.3508 19.3L19.6408 20.02C19.1516 20.514 18.5189 20.841 17.8329 20.9541C17.1469 21.0672 16.4427 20.9609 15.8208 20.6501C10.4691 17.8952 6.11008 13.5396 3.35083 8.19019C3.03976 7.56761 2.93414 6.86242 3.04914 6.17603C3.16414 5.48963 3.49384 4.85731 3.99085 4.37012L4.70081 3.65015C5.11674 3.23673 5.67937 3.00464 6.26581 3.00464C6.85225 3.00464 7.41488 3.23673 7.83081 3.65015L9.40082 5.22021C9.81424 5.63615 10.0463 6.19871 10.0463 6.78516C10.0463 7.3716 9.81424 7.93416 9.40082 8.3501L8.0708 9.68018C8.95021 10.8697 9.91617 11.9926 10.9608 13.04C11.9994 14.0804 13.116 15.04 14.3008 15.9102L14.3308 15.9402Z" />
    </svg>
  </button>

  <button class="button" id="perfileNav">
    <svg class="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em"
      width="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z">
      </path>
    </svg>
  </button>
</div>

`;  
nav.addEventListener('click', e => {
    const btnHome = e.target.closest('#homeNav');
    const btnShopping = e.target.closest('#shoppingNav');
    const btnContact = e.target.closest('#contactUsNav');
    const btnPerfile = e.target.closest('#perfileNav');

    if (btnHome) location.hash = '/';
    else if (btnShopping) location.hash = '/shopping';
    else if (btnContact) location.hash = '/contactUs';
    else if (btnPerfile) location.hash = '/perfile';
  });

  // Scroll handler, asegurando remover el anterior para evitar duplicados
  const header = document.getElementById("navbar");
  let lastScrollTop = 0;

  function scrollHandler() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) header.classList.add("hidden");
    else header.classList.remove("hidden");
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.removeEventListener("scroll", scrollHandler);
  window.addEventListener("scroll", scrollHandler);

  return nav;

}