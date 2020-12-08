import {
  setCurrentPage,
  lang,
  dictionary,
  container,
  deletePagination,
} from "./index.js";

import { teamsList } from "./cards.js";

let currentTeam;

export function leadToDetails() {
  let team;
  let detailsBtn = document.querySelectorAll(".details");
  detailsBtn.forEach((btn) => {
    let id = parseInt(btn.id.substring(8, btn.id.length));
    btn.addEventListener("click", () => {
      setCurrentPage("teamDet");
      fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          team = data.teams[0];
        })
        .then(() => {
          teamDetails(team);
        });
    });
  });
}

export function teamDetails(team) {
  currentTeam = team;
  let theTeam = team;
  let description;
  if (lang == "EN") {
    description = theTeam.strDescriptionEN;
  } else if (theTeam.strDescriptionES != null) {
    description = theTeam.strDescriptionES;
  } else {
    description = "No hay descripción en español";
  }

  let leagues = [
    theTeam.strLeague,
    theTeam.strLeague1,
    theTeam.strLeague2,
    theTeam.strLeague3,
    theTeam.strLeague4,
    theTeam.strLeague5,
    theTeam.strLeague6,
    theTeam.strLeague7,
  ];

  let filteredLeagues = leagues.filter(
    (league) => league != null && league != undefined && league != ""
  );

  let capacitySeparate = thousandsSeparators(theTeam.intStadiumCapacity);
  let layout = `
  <div id="team-details" class="row">
    <div id="column-left" class="col-lg-6 col-md-12">
      <div>
        <p class="title">${theTeam.strTeam}</p>
        <img class="details-stadium-image" src="${theTeam.strStadiumThumb}" alt="No image" />
        <p><span class="title">${dictionary.capacity}:</span> ${capacitySeparate}</p>
        <p><span class="title">${dictionary.location}:</span>  ${theTeam.strStadiumLocation}</p>
        <p><span class="title">${dictionary.description}:</span> ${theTeam.strStadiumDescription}</p>
      </div>
    </div>
    <div id="column-right" class="col-lg-6 col-md-12">
      <p><span class="title">${dictionary.leagues}:</span>
        ${filteredLeagues}

      </p>
      <p><span class="title">${dictionary.year}:</span> ${theTeam.intFormedYear}</p>
      
      <div>
        <a href=http://${theTeam.strWebsite}>${theTeam.strWebsite}</a>
        <a href=http://${theTeam.strFacebook}><i class="fab fa-facebook"></i></a>
        <a href=http://${theTeam.strTwitter}><i class="fab fa-twitter"></i></a>
        <a href=http://${theTeam.strYoutube}><i class="fab fa-youtube"></i></a>
      </div>
      <div class="details-jersey-image"><img src="${theTeam.strTeamJersey}" alt="No image" /></div>
      <p><span class="title">${dictionary.about}:</span> ${description}</p>
    </div>
  </div>`;
  container.innerHTML = layout;
  deletePagination();
}

export function openRandomTeam() {
  fetch(
    "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let tempList = data.teams;
      let random = getRandom(teamsList.length);
      tempList.forEach((team, i) => {
        if (i == random) {
          teamDetails(team);
        }
      });
    });
}

function thousandsSeparators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

function getRandom(nr) {
  return Math.floor(Math.random() * nr);
}

export { currentTeam };
