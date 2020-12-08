import { teamsList, getData, cardsCreator, createRow, rower } from "./cards.js";
import {
  beginPagination,
  teamsPagination,
  checkArrangement,
} from "./pagination.js";
import {
  leadToDetails,
  openRandomTeam,
  currentTeam,
  teamDetails,
} from "./teamDetails.js";

let container = document.getElementById("content");
let pagination = document.getElementById("pagination");
let homePage = document.getElementById("home");
let teamsPage = document.getElementById("teams");
let teamsDetails = document.getElementById("teamDet");
let backbtn = document.getElementById("back-home");
let brand = document.querySelector(".navbar-brand");
let paginationState = false;
let paginationNumbers = false;
let lang = "EN";
let currentPage = homePage;
let dictionaryEN = {
  home: "Home",
  teams: "Teams",
  teamDet: "Team Details",
  capacity: "Capacity",
  location: "Location",
  description: "Description",
  leagues: "Leagues",
  year: "Year Founded",
  about: "About",
  previous: "Previous",
  next: "Next",
  title: "England Leauge",
};
let dictionaryES = {
  home: "Pagina Principal",
  teams: "Los Equipos",
  teamDet: "Detalles del Equipo",
  capacity: "Capacidad",
  location: "Ubicación",
  description: "Descripción",
  leagues: "Ligas",
  year: "Año de Fundación",
  about: "Acerca de",
  previous: "Previo",
  next: "Próximo",
  title: "Liga de Inglaterra",
};
let dictionary = dictionaryEN;

(function init() {
  getData();
  getHome();
  navigation();
  changeLang();
})();

function langMenu() {
  homePage.innerText = dictionary.home;
  teamsPage.innerText = dictionary.teams;
  teamsDetails.innerText = dictionary.teamDet;
  brand.innerText = dictionary.title;
}

function navigation() {
  langMenu();
  backbtn.addEventListener("click", () => {
    getHome();
    setCurrentPage("home");
  });
  homePage.addEventListener("click", () => {
    getHome();
    setCurrentPage("home");
  });
  teamsPage.addEventListener("click", () => {
    arrangeCards();
    checkArrangement();
    setCurrentPage("teams");
  });
  teamsDetails.addEventListener("click", () => {
    openRandomTeam();
    setCurrentPage("teamDet");
  });
}

function setCurrentPage(id) {
  let allLinks = document.querySelectorAll(".nav-link");
  allLinks.forEach((link) => {
    link.classList.remove("active");
  });
  currentPage = document.getElementById(id);
  currentPage.classList.add("active");
}

function getHome() {
  let homeLayout = `<div class="home">
  <p>You are currently on the homepage of a test project built using: JavaScript, CSS, HTML, Bootstrap, FontAwesome.</p>
  <p>To proceed press Teams.</p>
  </div>`;
  container.innerHTML = homeLayout;
  deletePagination();
}

function deletePagination() {
  pagination.innerHTML = "";
  paginationNumbers = false;
  paginationState = false;
}

function arrangeCards() {
  beginPagination();
  paginationState = true;
  container.innerHTML = "";
  rower();
  paginationNumbers = true;
  let rowNr = 1;
  teamsList.forEach((team, i) => {
    cardsCreator(team, rowNr);
    if ((i + 1) % 6 == 0) {
      rowNr++;
    }
  });
  teamsPagination();
  leadToDetails();
}

function changeLang() {
  let btnEN = document.getElementById("english");
  let btnES = document.getElementById("spanish");
  btnEN.addEventListener("click", () => {
    lang = "EN";
    btnES.classList.remove("title");
    btnEN.classList.add("title");
    dictionary = dictionaryEN;
    langMenu();
    langReload();
  });
  btnES.addEventListener("click", () => {
    lang = "ES";
    btnEN.classList.remove("title");
    btnES.classList.add("title");
    dictionary = dictionaryES;
    langMenu();
    langReload();
  });
}

function langReload() {
  if (currentPage.id == "home" || currentPage.id == "teams") {
    deletePagination();
    arrangeCards();
    checkArrangement();
  } else {
    teamDetails(currentTeam);
  }
}

export {
  teamsList,
  container,
  paginationState,
  dictionary,
  paginationNumbers,
  lang,
  setCurrentPage,
  deletePagination,
};
