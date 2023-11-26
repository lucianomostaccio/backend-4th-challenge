const socket = io();

// Manejar el evento para actualizar la lista de productos en tiempo real
socket.on("updateProducts", async (products) => {
  try {
    // Actualizar la lista de productos en la vista
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la lista antes de actualizar

    await products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.title;
      productList.appendChild(li);
    });
  } catch (error) {
    console.error("Error al actualizar la lista de productos en tiempo real:", error);
  }
});

// Escuchar el evento del formulario para agregar un nuevo producto
const newProductForm = document.getElementById("newProductForm");
newProductForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(newProductForm);
    const title = formData.get("title");
    // Emitir el evento al servidor para agregar un nuevo producto
    socket.emit("newProduct", { title, /* otros campos */ });
  } catch (error) {
    console.error("Error al manejar el evento del formulario:", error);
  }
});
