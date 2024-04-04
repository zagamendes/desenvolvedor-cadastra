import { renderShelf } from "./shelf";
import { renderFilter } from "./filtros/filtros";
import { addEventsForOrderBy } from "./orderBy";
import { getProducts } from "./api";
import { addEventListenerForMiniCart } from "./miniCart";
import { addEventListenerForFetchMore } from "./fetchMore";
import { unCkeckFilters } from "./utils/unCheck";

const serverUrl = "http://localhost:5000";

async function main() {
  const urlParams = new URLSearchParams(window.location.search);
  const produtos = await getProducts(
    `?${
      urlParams.toString().includes("_page")
        ? urlParams.toString()
        : `${urlParams.toString()}&_page=1&_limit=8`
    }`
  );
  renderShelf(produtos);
  renderFilter();
  addEventsForOrderBy();
  addEventListenerForMiniCart();
  addEventListenerForFetchMore(produtos);
}

export const updateUI = async (fetch: boolean = true) => {
  //desmarca os filtros caso o usuário clique em voltar usando botão do navegador
  unCkeckFilters();
  if (fetch) {
    const urlParams = new URLSearchParams(window.location.search);
    const produtos = await getProducts(`?${urlParams.toString()}&_limit=8`);
    renderShelf(produtos);
  }
};

document.addEventListener("DOMContentLoaded", main);
window.addEventListener("popstate", () => {
  updateUI();
});
