export const resetFilters = () => {
  const checkboxsCores = document.querySelectorAll("input.cor");
  const checkboxsFaixaDePreco = document.querySelectorAll(
    "input.faixa-de-preco"
  );

  const btnsSize = document.querySelectorAll(".filterby-size");

  checkboxsCores.forEach((checkbox: Element & HTMLInputElement) => {
    checkbox.checked = false;
  });

  checkboxsFaixaDePreco.forEach((checkbox: Element & HTMLInputElement) => {
    checkbox.checked = false;
  });

  btnsSize.forEach((btn: HTMLButtonElement) => {
    btn.classList.remove("size-selected");
  });
};
