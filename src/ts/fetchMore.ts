import { updateUI } from ".";
import { Product } from "./@types/Product";
import { queryParams } from "./filtros/filtros";

export const addEventListenerForFetchMore = (produtos: Product[]) => {
  const btnFetchMore = document.querySelector(
    "#btn-fetch-more"
  ) as HTMLButtonElement;
  if (!produtos.length) btnFetchMore.style.display = "none";

  btnFetchMore.addEventListener("click", () => {
    const currentPage = queryParams.get("_page");
    if (!currentPage) {
      queryParams.set("_page", "2");
      queryParams.set("_limit", "8");
    } else {
      queryParams.set("_page", `${parseInt(currentPage) + 1}`);
    }
    window.history.pushState(null, null, `?${queryParams.toString()}`);
    updateUI();
  });
};
