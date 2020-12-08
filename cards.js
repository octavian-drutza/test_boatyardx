import { container, dictionary } from "./index.js";
import { continuePagination } from "./pagination.js";

let teamsList;

export function getData() {
  fetch(
    "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      teamsList = data.teams;
      console.log(teamsList);
    });
}

export function cardsCreator(team, rowNr) {
  let currRow = document.getElementById(`row-${rowNr}`);
  let card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "mb-4");
  card.setAttribute("id", "column");
  card.innerHTML = `
      <div class="card">
              <img src=${team.strStadiumThumb} class="card-img-top" alt="No Image" />
              <div class="card-body">
                  <h5 class="card-title">${team.strTeam}</h5>
                  <p class="card-text">${team.strKeywords}</p>
                  <button class="btn btn-primary details" id="details-${team.idTeam}">${dictionary.teamDet}</button>
              </div>
          </div>
     `;
  currRow.appendChild(card);
}

export function createRow(rowNr) {
  let row = document.createElement("div");
  row.classList.add("row", "content");
  row.setAttribute("id", `row-${rowNr}`);
  rowNr > 1 ? row.classList.add("hide") : rowNr;
  continuePagination(rowNr);
  return row;
}

export function rower() {
  let rowNr = 1;
  for (let i = 0; i <= teamsList.length; i++) {
    if ((i + 1) % 6 == 0) {
      container.appendChild(createRow(rowNr));
      rowNr++;
    }
  }
  container.appendChild(createRow(rowNr));
}

export { teamsList };
