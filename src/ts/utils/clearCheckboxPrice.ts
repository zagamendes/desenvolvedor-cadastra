import { ChangeEvent } from "../@types/ChangeEvent";
import { queryParams } from "../filtros/filtros";

export const clearCheckboxes = (event: ChangeEvent) => {
  const checkboxsFaixaDePreco = document.querySelectorAll(
    "input.faixa-de-preco"
  );
  checkboxsFaixaDePreco.forEach((checkbox: HTMLInputElement) => {
    if (checkbox.id != event.target.id) checkbox.checked = false;
    queryParams.delete(checkbox.dataset.min);
    queryParams.delete(checkbox.dataset.max);
  });
};
