const btncart = document.querySelector(".container-cart-icon")
const conteinerCartProducts = document.querySelector(".conteiner-cart-products")

btncart.addEventListener("click", () => {
     conteinerCartProducts.classList.toggle("ocultar-cart")
})

// -----------------------------------

const cartInfo = document.querySelector(".cart-produc")
const rowProducto = document.querySelector(".row-product")


// lista de todos lo productos

const productslist = document.querySelector(".container-item")

// variable de arreglos de productos
let allProductos = [];
const valorTotal = document.querySelector(".total-pagar")
const countProduct = document.querySelector(".numero-carrito")


productslist.addEventListener("click", e => {
     if (e.target.classList.contains("añadir-carrito")) {
          const product = e.target.parentElement
          const infoProducto = {
               cantidad: 1,
               title: product.querySelector("h2").textContent,
               precio: product.querySelector("p").textContent,
          }

          const exits = allProductos.some(product => product.title === infoProducto.title)
          if (exits) {
               const products = allProductos.map(product => {
                    if (product.title === infoProducto.title) {
                         product.cantidad++;
                         return product
                    } else {
                         return product
                    }
               });
               allProductos = [...products];

          } else {
               allProductos = [...allProductos, infoProducto];
          }
          showHtml();
     }
});

rowProducto.addEventListener("click", (e) => {
     if (e.target.classList.contains("icon-close")) {
          const product = e.target.parentElement;
          const title = product.querySelector("p").textContent
          allProductos = allProductos.filter(product => product.title !== title);
          console.log(allProductos);
          showHtml();
     }
});

// ---------funcion para mostrar html

const showHtml = () => {

     // limpiar Html

     rowProducto.innerHTML = "";

     let total = 0;
     let totalofproducts = 0;

     allProductos.forEach(product => {
          const containerProduct = document.createElement("div");
          containerProduct.classList.add("cart-product");
          containerProduct.innerHTML = `

     <div class="info-cart-producto">
           <span class="cantidad-producto-carrito">${product.cantidad}</span>
           <p class="titulo-producto-carrito">${product.title}</p>
           <span class="precio-producto-carrito">${product.precio}</span>
      </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="icon-close">
          <path stroke-linecap="round" stroke-linejoin="round"
           d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
     </svg>
     `;


          rowProducto.append(containerProduct);
          total = total + parseInt(product.cantidad * product.precio.slice(1));
          totalofproducts = totalofproducts + product.cantidad;

          guardarCompra()

     });
     valorTotal.innerText = `$${total}`;
     countProduct.innerText = totalofproducts;

};

// ---------------------- guardar en localStorage

const guardarCompra = () => {
     localStorage.setItem("compra", JSON.stringify(allProductos))
};

