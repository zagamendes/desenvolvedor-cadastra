import { Product } from "./@types/Product";
import { Carrinho } from "./@types/carrinho";
import { api } from "./api";

const openMinicCart = document.querySelector("#abrir-mini-cart");
const closeMiniCartButton = document.querySelector("#close-mini-cart");
const miniCart = document.querySelector("#mini-cart");
const miniCartContent = document.querySelector("#mini-cart-content");

export const addEventListenerForMiniCart = async () => {
  openMinicCart.addEventListener("click", () => {
    miniCart.classList.add("mini-cart-active");
    renderMiniCart();
  });
  closeMiniCartButton.addEventListener("click", () => {
    miniCart.classList.remove("mini-cart-active");
  });
};
const renderMiniCart = async () => {
  const produtos = JSON.parse(localStorage.getItem("carrinho")) as Carrinho[];
  if (!produtos.length) {
    miniCartContent.innerHTML = `<div class='carrinho-vazio'><p>Você não adicionou nenhum produto ao carrinho ainda</p></div>`;
    return;
  }
  const { data } = await api.get<Product[]>(``, {
    params: {
      id: produtos.map((produto) => produto.id),
    },
  });
  miniCartContent.innerHTML = "";
  data.forEach((produto) => {
    miniCartContent.innerHTML += `
        <div class='product-info'>
          <div class='ctn-img'>
            <img src=${produto.image} />
          </div>
          <div class='ctn-info-produto'>
            <p>Nome: ${produto.name}</p>
            <p>Preço: ${produto.price}</p>
            <p>Quantidade: ${
              produtos.find((product) => product.id == produto.id).quantidade
            }</p>
            <button class='remover-produto' data-id=${
              produto.id
            }>Remover</button>
            
          </div>

        </div>`;
  });
  const btnRemover = document.querySelectorAll(".remover-produto");
  btnRemover.forEach((btn) => {
    btn.addEventListener(
      "click",
      (e: Event & { target: HTMLButtonElement }) => {
        const idProduto = e.target.dataset.id;
        const newArray = produtos.filter((produto) => produto.id != idProduto);
        localStorage.setItem("carrinho", JSON.stringify(newArray));
        renderMiniCart();
      }
    );
  });
};
