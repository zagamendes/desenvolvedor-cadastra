import { updateUI } from "..";

import { removeDuplicatedQueryParams } from "../utils/removeDuplicatedQueryParams";
import { resetFilters } from "../utils/resetFilters";
import { renderFilterColors } from "./FiltroDeCor";
import { renderFilterPrice } from "./FiltroDePreco";
import { renderFilterSize } from "./FiltroDeTamanho";
export let queryParams = new URLSearchParams(location.search);

export function renderFilter() {
  renderFilterColors();
  renderFilterPrice();
  renderFilterSize();
  addEventListnersForFiltersButtons();
}

export function addEventListnersForFiltersButtons() {
  const btnFiltrar = document.querySelector("#btnFiltrar");

  const filtroMob = document.querySelector("#filtroMob");

  const btnCloseFilter = document.querySelector("#closeFilter");

  const filters = document.querySelectorAll(".filterItem");

  const btnApplyfilters = document.querySelector("#apply-filters");
  const btnClearFilters = document.querySelector("#clear-filters");

  filters.forEach((filter: HTMLElement) =>
    filter.addEventListener("click", () => {
      if (filter.parentElement.classList.contains("menu-active")) {
        filter.parentElement.style.height = `57px`;
      } else {
        filter.parentElement.style.height = `${
          filter.offsetHeight +
          (filter.nextElementSibling as HTMLElement).offsetHeight
        }px`;
      }
      filter.parentElement.classList.toggle("menu-active");
    })
  );

  btnFiltrar.addEventListener("click", () =>
    filtroMob.classList.add("showFiltro")
  );

  btnCloseFilter.addEventListener("click", () =>
    filtroMob.classList.remove("showFiltro")
  );
  btnApplyfilters.addEventListener("click", () => {
    let newUrl;
    let currentUrl = new URLSearchParams(location.search);

    newUrl = removeDuplicatedQueryParams(
      queryParams.toString().concat("&", currentUrl.toString())
    );

    history.pushState(null, null, `?${newUrl}`);
    filtroMob.classList.remove("showFiltro");
    updateUI();
  });
  btnClearFilters.addEventListener("click", () => {
    const oldurl = location.search;

    history.pushState(null, null, "/");
    queryParams = new URLSearchParams(location.search);
    filtroMob.classList.remove("showFiltro");
    resetFilters();
    updateUI(oldurl == location.search ? false : true);
  });
}
