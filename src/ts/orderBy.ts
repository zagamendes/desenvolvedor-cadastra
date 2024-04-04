import { updateUI } from ".";
import { queryParams } from "./filtros/filtros";

const btnOrdenar = document.querySelector("#btnOrdenar");
const orderbyMobMenu = document.querySelector("#orderby-mob");
const btnCloseOrderBy = document.querySelector("#btnCloseOrderBy");
const btnsOrderBy = document.querySelectorAll(".btn-orderby");

const orderByContainerDesktop = document.querySelector("#orderBy");
const orderByDesktop = document.querySelector(
  ".order-by-desktop"
) as HTMLButtonElement;
orderByDesktop.addEventListener("click", () => {
  orderByContainerDesktop.classList.toggle("show-order-by-options");
});

export function addEventsForOrderBy() {
  btnsOrderBy.forEach((btn) => {
    btn.addEventListener(
      "click",
      async (e: Event & { target: HTMLButtonElement }) => {
        const orderBy = e.target.dataset.type;
        let newUrl;
        if (!location.search) {
          newUrl = `?${orderBy}`;
        } else {
          queryParams.delete("_sort");
          queryParams.delete("_order");

          newUrl = `?${queryParams.toString()}&${orderBy}`;
        }

        orderByContainerDesktop.classList.toggle("show-order-by-options");
        history.pushState(null, null, newUrl);
        orderbyMobMenu.classList.remove("show-orderby-mob");
        orderByDesktop.innerHTML =
          e.target.innerText + " <i class='fas fa-chevron-down'></i>";

        updateUI();
      }
    );
  });
  btnOrdenar.addEventListener("click", () =>
    orderbyMobMenu.classList.add("show-orderby-mob")
  );

  btnCloseOrderBy.addEventListener("click", () =>
    orderbyMobMenu.classList.remove("show-orderby-mob")
  );
}
