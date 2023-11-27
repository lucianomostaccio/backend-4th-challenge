const socket = io();

function agregarProducto() {
  // @ts-ignore
  const title = document.querySelector("#title").value;
  if (!title) {
    alert("Por favor, completa todos los campos");
  } else {
    // Emitir el evento al servidor para agregar un nuevo producto
    socket.emit("newProduct", { title });
  }
}

function eliminarProducto(id) {
  // Emitir el evento al servidor para eliminar el producto
  socket.emit("deleteProduct", id);
}

socket.on("updateProductList", (updatedProducts) => {
  // Actualizar la lista de productos en la vista
  const productListRealTime = document.querySelector(".productListRealTime");
  // @ts-ignore
  productListRealTime.innerHTML = "";
  updatedProducts.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.title;
    // @ts-ignore
    productListRealTime.appendChild(li);
  });
});
