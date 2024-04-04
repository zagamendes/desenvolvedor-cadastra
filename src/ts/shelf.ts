import { Product } from "./@types/Product";
import { Carrinho } from "./@types/carrinho";
import { sleep } from "./utils/sleep";

export function renderShelf(produtos: Product[]) {
  const searchResult = document.querySelector("#search-result");
  const btnFetchMore = document.querySelector(
    "#btn-fetch-more"
  ) as HTMLButtonElement;

  searchResult.innerHTML = "";
  if (!produtos.length) {
    btnFetchMore.style.display = "none";
    return (searchResult.innerHTML =
      "<div class='empty-content'><p>OPS: Acabaram os produtos</p></div>");
  }

  btnFetchMore.style.display = "block";

  produtos.forEach((produto) => {
    const [qtdParcela, valorParcela] = produto.parcelamento;
    const containerShelf = `
    <div class='containerShelf'>
      <img
            src=${produto.image}
          />
          <strong class='product-name'>${produto.name}</strong>
          <p class='price'>${produto.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "brl",
          })}</p>
          <p class='installments'>até ${qtdParcela}x de ${valorParcela.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "brl",
      }
    )}</p>
          <button data-id=${produto.id} class='btn-comprar'>Comprar</button>
    </div>
    `;
    searchResult.innerHTML += containerShelf;
  });
  const btnsComprar = document.querySelectorAll(".btn-comprar");
  btnsComprar.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener(
      "click",
      async (e: Event & { target: HTMLButtonElement }) => {
        e.target.innerText = "Adicionando";
        e.target.disabled = true;
        e.target.classList.add("disabled-button");
        const idProduto = btn.dataset.id;
        const produtos =
          (JSON.parse(localStorage.getItem("carrinho")) as Carrinho[]) ?? [];

        if (!produtos.length) {
          produtos.push({ id: idProduto, quantidade: 1 });
          localStorage.setItem("carrinho", JSON.stringify(produtos));
        } else if (produtos.some((produto) => produto.id == idProduto)) {
          const updatedCarrinho = produtos.map(({ id, quantidade }) => {
            if (id == idProduto) {
              return {
                id,
                quantidade: quantidade + 1,
              };
            }
            return {
              id,
              quantidade,
            };
          });
          localStorage.setItem("carrinho", JSON.stringify(updatedCarrinho));
        } else {
          produtos.push({ id: idProduto, quantidade: 1 });
          localStorage.setItem("carrinho", JSON.stringify(produtos));
        }
        await sleep(500);
        e.target.innerText = "comprar";
        e.target.removeAttribute("disabled");
        e.target.classList.remove("disabled-button");
      }
    );
  });
}
