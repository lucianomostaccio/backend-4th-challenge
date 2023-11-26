const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const {Server} = require("socket.io");
const productRouter = require("../src/routes/productRouter.js");
const cartRouter = require("../src/routes/cartRouter.js");
const viewsRouter = require("./routes/views.router.js");

const ProductManager = require("../src/managers/ProductManager");
const productManager = new ProductManager();
const allProducts = productManager.getProducts();

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); // Iniciar el servidor

const socketServer = new Server(httpServer); // servidor para trabajar con sockets

//plantillas:
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
//app.set('views',__dirname+'/views'); funciona así también, pero es más seguro usar path.join
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(__dirname+'/public')); funciona así también, pero es más seguro usar path.join
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  // Escucha eventos desde el cliente
  socket.on("newProduct", (product) => {
    // Lógica para manejar un nuevo producto
    console.log("Nuevo producto recibido:", product);
    socketServer.emit("updateProducts", allProducts);
  });

  socket.on("deleteProduct", (productId) => {
    // Lógica para manejar la eliminación de un producto
    console.log("Producto eliminado:", productId);
    socketServer.emit("updateProducts", allProducts);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import rutas
const productRoutes = productRouter;
const cartRoutes = cartRouter;

// Configurar las rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
