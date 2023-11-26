import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import express from 'express';
import productRouter from '../src/routes/productRouter.js'
import cartRouter from '../src/routes/cartRouter.js'

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); // Iniciar el servidor


const socketServer = new Server(httpServer); // servidor para trabajar con sockets

//plantillas:
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/',viewsRouter);

socketServer.on('connection',socket => {
  console.log("Nuevo cliente conectado")
})



//código viejo://

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import rutas
const productRoutes = productRouter;
const cartRoutes = cartRouter;

// Configurar las rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);


