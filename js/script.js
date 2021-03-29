// SECTIONS
const home = document.getElementById("home");
const about = document.getElementById("about");
const services = document.getElementById("services");
const menu = document.getElementById("menu");
const app = document.getElementById("app");
const contactus = document.getElementById("contactus");
const footer = document.getElementById("footer");

// BUTTONS
const themeChangeBtn = document.getElementById('change-theme');
const toggleMenuBtn = document.getElementById('toggle-menu');
const showContactFormBtn = document.getElementById('show-contact-form');
const closeContactFormBtn = document.getElementById('close-contact-form')
const hideNotificationBtn = document.getElementById('hide-notification');


// ELEMENTS
const contactForm =document.getElementById('contact-form'); 
const formParent = document.getElementById('form-parent');



// FUNCTIONS

// set theme to default after reloading the page. 
const changeTheme = () => {
  const mode = localStorage.getItem('mode');
  const body = document.body;
  const modeIcon = document.getElementById('mode-icon');
  if(mode === 'dark_mode') {
    // add dark-theme class to body
    body.classList.add('dark-theme');

    // change modeIcon to light icon
    modeIcon.textContent = "light_mode";
  }
}

const fixedHeader = () => {
  const header = document.getElementById('header');
  if(window.scrollY > 6) {
    header.classList.add('fixed');
  }else {
    header.classList.remove('fixed');
  }
}

const closeContactForm = () => {
  const formBlock = document.getElementById('contact-form-modal');
  formBlock.classList.remove('active');
}

const animateChildren = container => {
  const childElements = [...container.children];
  childElements.forEach((child, i) => {
    if(i === 0) {
      child.classList.add('fadeY')
    }else {
      setTimeout(() => {
        child.classList.add('fadeX')
      }, 300);
    }
  });
}


const animateHome = () => {
  const windowPostionTop = window.innerHeight / 2;
  const homePostionTop = home.getBoundingClientRect().top;
  if(windowPostionTop > homePostionTop && homePostionTop >= -329) {
    // console.log("animate Home");
    animateChildren(home);
  }
}

const animateAbout = () => {
  const windowPostionTop = window.innerHeight / 2;
  const aboutPostionTop = about.getBoundingClientRect().top;
  if(windowPostionTop > aboutPostionTop && aboutPostionTop >= -329) {
    animateChildren(about);
  }
}

const animateServices = () => {
  const windowPostionTop = window.innerHeight / 2;
  const servicesPostionTop = services.getBoundingClientRect().top;
  if(windowPostionTop > servicesPostionTop && servicesPostionTop >= -329) {
    animateChildren(services.children[2]);

  }
}

const animateMenu = () => {
  const windowPostionTop = window.innerHeight / 2;
  const menuPostionTop = menu.getBoundingClientRect().top;
  if(windowPostionTop > menuPostionTop && menuPostionTop >= -329) {
    animateChildren(menu.children[2]);
    // console.log(menu.children[2]);
  }
}

const animateApp = () => {
  const windowPostionTop = window.innerHeight / 2;
  const appPostionTop = app.getBoundingClientRect().top;
  if(windowPostionTop > appPostionTop && appPostionTop >= -329) {
    animateChildren(app.children[0]);

  }
}



const animateContactus = () => {
  const windowPostionTop = window.innerHeight / 2;
  const contactusPostionTop = contactus.getBoundingClientRect().top;
  if(windowPostionTop > contactusPostionTop && contactusPostionTop >= -329) {
    animateChildren(contactus);
  }
}

const animateFooter = () => {
  const windowPostionTop = window.innerHeight / 2;
  const footerPostionTop = footer.getBoundingClientRect().top;
  if(windowPostionTop > footerPostionTop && footerPostionTop >= -329) {
    animateChildren(footer.firstElementChild);
    // console.log();
  }
}

const validateInput = input => {
  let regex;
    if(input.value) {
      input.classList.remove('invalid');
      if(input.id === 'name') {
        regex = /[0-9~`!@#$%^&*_-]/;
        if(!regex.test(input.value)) {
          input.classList.remove('invalid');
          return true;
        }else {
          input.classList.add('invalid')
          return false;
        }
      }else if(input.id === "email") {
        regex = /^([a-zA-Z0-9_-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z\.]+)/;
    
        if(regex.test(input.value)) {
          input.classList.remove('invalid');
          return true;
        }else {
          input.classList.add('invalid')
          return false;
        }
      }else {
        return true;
      }
    }else {
      input.classList.add('invalid')
      return false;
    }

    
}

showNotification = () => {
  const notification = document.getElementById('notification');
  notification.classList.add('show');

  setTimeout(() => {
    hideNotification();
  }, 5000);
}

const hideNotification = () => {
  const notification = document.getElementById('notification');
  notification.classList.remove('show');

}



// EVENT_LISTENERS

// CHANGE THEME
themeChangeBtn.addEventListener("click", () => {
  const body = document.querySelector('body');
  body.classList.toggle('dark-theme');
  let modeIcon = document.getElementById('mode-icon');
  if(modeIcon.textContent === 'dark_mode') {
    modeIcon.textContent = 'light_mode'
    localStorage.setItem('mode', 'dark_mode')
  }
  else {
    modeIcon.textContent = "dark_mode"
    localStorage.setItem('mode', 'light_mode')
  }
});

// TOGGLE MENU
toggleMenuBtn.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active')
});

// show contact form
showContactFormBtn.addEventListener("click", function() {
  const formBlock = document.getElementById('contact-form-modal');
  formBlock.classList.add('active');
});

// hide contact form when click the close btn
closeContactFormBtn.addEventListener('click', closeContactForm)

// hide contact form when click the blur background
formParent.addEventListener('click', function(e) {
  if(e.target === this) {
    closeContactForm();
  }
});

contactForm.addEventListener('submit', e => {
  e.preventDefault()
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  if(validateInput(nameInput) && validateInput(emailInput) && validateInput(messageInput)) {
    closeContactForm();
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    showNotification();
  }else {
    console.log("INVALID FORM");
  }
});

hideNotificationBtn.addEventListener('click', hideNotification)

window.addEventListener('scroll', () => {
  fixedHeader();
  animateHome();
  animateAbout();
  animateMenu();
  animateServices();
  animateApp();
  animateContactus();
  animateFooter();
});
window.addEventListener('load', () => {
  changeTheme();
  fixedHeader();
  animateHome();
  animateAbout();
  animateServices();
  animateMenu();
  animateApp();
  animateContactus();
  animateFooter();
});



// console.log("window " + window.innerHeight / 2);
// console.log("home " + home.getBoundingClientRect().top)