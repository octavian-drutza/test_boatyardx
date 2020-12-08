import { paginationState, dictionary, paginationNumbers } from "./index.js";

let allPages;
let links;
let pagesNrs;
let arranged = false;
let paginationCurrent = 1;

export function beginPagination() {
  if (paginationState == false) {
    let previous = document.createElement("li");
    previous.classList.add("page-item");
    previous.innerHTML = `<a class="page-link">${dictionary.previous}</a>`;
    previous.setAttribute("id", "previous");
    let next = document.createElement("li");
    next.classList.add("page-item");
    next.innerHTML = `<a class="page-link">${dictionary.next}</a>`;
    next.setAttribute("id", "next");
    pagination.appendChild(previous);
    pagination.appendChild(next);
  }
}

export function continuePagination(rowNr) {
  if (paginationNumbers == false) {
    let page = document.createElement("li");
    page.classList.add("page-item");
    page.setAttribute("id", `${rowNr}`);
    page.innerHTML = `<a class="page-link">${rowNr}</a></li>`;
    pagination.appendChild(page);
  }
}

export function teamsPagination() {
  allPages = document.querySelectorAll(".row.content");
  links = document.querySelectorAll(".page-link");
  pagesNrs = document.querySelectorAll(".page-item");
  links[2].classList.add("grey");
  pagesNrs.forEach((pageNr) => {
    pageNr.addEventListener("click", () => {
      if (
        (paginationCurrent != allPages.length && pageNr.id == "next") ||
        (paginationCurrent != 1 && pageNr.id == "previous")
      ) {
        removeGrey();
      }
      changePageNumber(pageNr.id, pageNr);
      nextPrevious(pageNr.id);
      console.log(paginationCurrent);
    });
  });
}

export function removeGrey() {
  links.forEach((link) => {
    link.classList.remove("grey");
  });
}

export function restorePageNumber(nr) {
  let currentPage = document.getElementById(`row-1`);
  allPages.forEach((page) => {
    if (nr == parseInt(page.id.substring(4, page.id.length))) {
      page.classList.remove("hide");
      currentPage.classList.add("hide");
      removeGrey();
      let pageNr;
      pagesNrs.forEach((page) => {
        if (page.id == paginationCurrent) {
          pageNr = page;
        }
      });
      pageNr.querySelector(".page-link").classList.add("grey");
    }
  });
}

export function checkArrangement() {
  if (arranged == true && paginationCurrent != 1) {
    restorePageNumber(paginationCurrent);
  }
  arranged = true;
}

export function changePageNumber(nr, pageNr) {
  let currentPage = document.getElementById(`row-${paginationCurrent}`);
  allPages.forEach((page) => {
    if (
      nr != paginationCurrent &&
      nr == parseInt(page.id.substring(4, page.id.length))
    ) {
      page.classList.remove("hide");
      currentPage.classList.add("hide");
      paginationCurrent = parseInt(nr);
      removeGrey();
      pageNr.querySelector(".page-link").classList.add("grey");
    }
  });
}

export function nextPrevious(direction) {
  let currentPage = document.getElementById(`row-${paginationCurrent}`);
  if (direction == "next" && paginationCurrent < allPages.length) {
    currentPage.classList.add("hide");
    currentPage = document.getElementById(`row-${paginationCurrent + 1}`);
    currentPage.classList.remove("hide");
    paginationCurrent++;
    document
      .getElementById(`${paginationCurrent}`)
      .querySelector(".page-link")
      .classList.add("grey");
  } else if (direction == "previous" && paginationCurrent > 1) {
    currentPage.classList.add("hide");
    currentPage = document.getElementById(`row-${paginationCurrent - 1}`);
    currentPage.classList.remove("hide");
    paginationCurrent--;
    document
      .getElementById(`${paginationCurrent}`)
      .querySelector(".page-link")
      .classList.add("grey");
  }
}

export { allPages, links, pagesNrs };
