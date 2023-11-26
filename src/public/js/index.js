const socket = io();

// Manejar el evento para actualizar la lista de productos en tiempo real
socket.on("updateProducts", (products) => {
  // Actualizar la lista de productos en la vista
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Limpiar la lista antes de actualizar

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.title;
    productList.appendChild(li);
  });
});

// Escuchar el evento del formulario para agregar un nuevo producto
const newProductForm = document.getElementById("newProductForm");
newProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Obtener datos del formulario (puedes adaptar esto según tu formulario)
  const formData = new FormData(newProductForm);
  const title = formData.get("title");
  const description = formData.get("description");
  // ...

  // Emitir el evento al servidor para agregar un nuevo producto
  socket.emit("newProduct", { title, description, /* otros campos */ });
});
