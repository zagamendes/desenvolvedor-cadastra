import { updateUI } from "..";
import { ChangeEvent } from "../@types/ChangeEvent";
import { FAIXAPRECO } from "../constants";
import { clearCheckboxes } from "../utils/clearCheckboxPrice";
import { isPriceSelected } from "../utils/isPriceSelected";

import { queryParams } from "./filtros";
export const renderFilterPrice = () => {
  const ulFaixaDeprecos = document.querySelectorAll(".filter-by-price");
  const urlParams = new URLSearchParams(location.search);
  ulFaixaDeprecos.forEach((ul) => {
    FAIXAPRECO.forEach((opcao) => {
      ul.innerHTML += `<li><input class='faixa-de-preco ${
        ul.id
      }' type='checkbox' ${isPriceSelected(
        parseInt(urlParams.get("price_gte")),
        parseInt(urlParams.get("price_lte")),
        opcao.minPrice,
        opcao.maxPrice
      )} data-min='price_gte' data-max='price_lte' id='${opcao.id}${
        ul.id
      }' value='${opcao.minPrice}-${opcao.maxPrice}' /><label for=${opcao.id}${
        ul.id
      }>${opcao.texto}</label></li>`;
    });
  });
  addEventListenerForPrice();
};
const addEventListenerForPrice = () => {
  const checkboxsFaixaDePreco = document.querySelectorAll(
    "input.faixa-de-preco"
  );
  checkboxsFaixaDePreco.forEach((checkbox) => {
    checkbox.addEventListener("change", (event: ChangeEvent) => {
      const [min, max] = event.target.value.split("-");
      //desmarca o checkbox antigo
      clearCheckboxes(event);

      if (event.target.checked) {
        queryParams.append(event.target.dataset.min, min);
        queryParams.append(event.target.dataset.max, max);
      } else {
        queryParams.delete(event.target.dataset.min, min);
        queryParams.delete(event.target.dataset.max, max);
      }

      if (window.innerWidth >= 768) {
        window.history.pushState(null, null, `?${queryParams.toString()}`);
        updateUI();
      }
    });
  });
};
