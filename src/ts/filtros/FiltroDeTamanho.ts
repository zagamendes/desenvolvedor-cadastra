import { updateUI } from "..";
import { TAMANHOS } from "../constants";
import { isColorSelected } from "../utils/isColorSelected";
import { isSizeSelected } from "../utils/isSizeSelected";
import { queryParams } from "./filtros";
export const renderFilterSize = () => {
  const containerBtns = document.querySelectorAll(".filterSize");
  const urlParams = new URLSearchParams(location.search);
  containerBtns.forEach((ctn) => {
    TAMANHOS.forEach((tamanho) => {
      ctn.innerHTML += `<button class='filterby-size ${isSizeSelected(
        urlParams.getAll("size"),
        tamanho
      )}' data-size='${tamanho}' data-clicked=${isColorSelected(
        urlParams.getAll("size"),
        tamanho
      )}>${tamanho}</button>`;
    });
  });
  addEventListenerForSize();
};
const addEventListenerForSize = () => {
  const btnsSize = document.querySelectorAll(".filterby-size");
  btnsSize.forEach((btn) => {
    btn.addEventListener(
      "click",
      (event: Event & { target: HTMLButtonElement }) => {
        if (!event.target.dataset.clicked) {
          event.target.classList.add("size-selected");
          queryParams.append("size", event.target.dataset.size);
          event.target.dataset.clicked = "true";
        } else {
          event.target.classList.remove("size-selected");
          queryParams.delete("size", event.target.dataset.size);
          event.target.dataset.clicked = "";
        }
        if (window.innerWidth >= 768) {
          window.history.pushState(null, null, `?${queryParams.toString()}`);
          updateUI();
        }
      }
    );
  });
};
