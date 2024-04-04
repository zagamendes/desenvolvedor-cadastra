export const unCkeckFilters = () => {
  const checkboxsFaixaDePrecoDesk = document.querySelectorAll(
    "input.filter-by-price-desk"
  );
  const checkboxsFaixaDePrecoMob = document.querySelectorAll(
    "input.filter-by-price-mob"
  );
  const checkboxsCoresDesk = document.querySelectorAll("input.colors-desk");
  const checkboxsCoresMob = document.querySelectorAll("input.colors-mob");
  const btnsSize = document.querySelectorAll(".filterby-size");
  const currentParams = new URLSearchParams(location.search);
  checkboxsCoresDesk.forEach((cor: HTMLInputElement) => {
    if (!currentParams.getAll("color").includes(cor.value)) cor.checked = false;
  });
  checkboxsCoresMob.forEach((cor: HTMLInputElement) => {
    if (!currentParams.getAll("color").includes(cor.value)) cor.checked = false;
  });
  btnsSize.forEach((btn: HTMLInputElement) => {
    if (!currentParams.getAll("size").includes(btn.dataset.size))
      btn.classList.remove("size-selected");
  });
  checkboxsFaixaDePrecoDesk.forEach((preco: HTMLInputElement) => {
    const [min, max] = preco.value.split("-");
    if (
      parseInt(currentParams.get("price_gte")) != parseInt(min) &&
      parseInt(currentParams.get("price_lte")) != parseInt(max)
    ) {
      preco.checked = false;
    }
  });
  checkboxsFaixaDePrecoMob.forEach((preco: HTMLInputElement) => {
    const [min, max] = preco.value.split("-");
    if (
      parseInt(currentParams.get("price_gte")) != parseInt(min) &&
      parseInt(currentParams.get("price_lte")) != parseInt(max)
    ) {
      preco.checked = false;
    }
  });
};
