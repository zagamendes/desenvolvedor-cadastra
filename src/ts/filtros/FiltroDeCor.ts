import { updateUI } from "..";
import { ChangeEvent } from "../@types/ChangeEvent";
import { CORES } from "../constants";
import { isColorSelected } from "../utils/isColorSelected";

import { queryParams } from "./filtros";
export const renderFilterColors = (showColors = false) => {
  const ulCores = document.querySelectorAll(".filterColors");

  const urlParams = new URLSearchParams(location.search);
  ulCores.forEach((ul) => {
    ul.innerHTML = "";
  });

  ulCores.forEach((ul) => {
    for (let i = 0; i < CORES.length; i++) {
      if (i >= 4 && !showColors) {
        ul.innerHTML += `
        <li class='ver-mais'>
          <button id='show-all-colors-${ul.id}'>ver todas as cores <i class="fas fa-chevron-down"></i></button
        </li>`;
        break;
      } else {
        ul.innerHTML += `<li><input class='cor ${
          ul.id
        }' type='checkbox' ${isColorSelected(
          urlParams.getAll("color"),
          CORES[i]
        )} id='${CORES[i]}${ul.id}' value=${CORES[i]} /><label for='${
          CORES[i]
        }${ul.id}'>${CORES[i]}</label></li>`;
      }
    }
  });
  addEventListnersForColors();
};
const addEventListnersForColors = () => {
  const checkboxsCores = document.querySelectorAll("input.cor");
  const btnShowAllColors = document.querySelector(
    "#show-all-colors-colors-desk"
  );

  checkboxsCores.forEach((checkbox) => {
    checkbox.addEventListener("change", (event: ChangeEvent) => {
      if (event.target.checked) {
        queryParams.append("color", event.target.value);
      } else {
        queryParams.delete("color", event.target.value);
      }
      if (window.innerWidth >= 768) {
        window.history.pushState(null, null, `?${queryParams.toString()}`);
        updateUI();
      }
    });
  });
  if (btnShowAllColors) {
    btnShowAllColors.addEventListener("click", () => {
      renderFilterColors(true);
    });
  }
};
