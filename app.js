/*
Inicializamos NPM con npm init -y, también instalamos express con 
npm install express e instalamos el paquete donemon con la bandera -g con
npm install -g nodemon
*/

var express = require('express'); //importamos la dependencia de express
var app = express(); //de esta forma declaramos una app de express, y ya estaría activa

var port = process.env.PORT || 3000; //setteamos el puerto para que escucbe al servidor, ahora
//el puerto 3000 estará a la espera de lo que le enviemos.

app.use('/assets', express.static(__dirname + '/public'));
//Con esta línea especificamos a express que el directorio virtual para el contenido estático
//se llama /assets y que ese nombre será mapeado a la carpeta física /public que se encuentra en el directorio
//donde corre la aplicación __dirname.

app.use('/', function(req, res, next) {
    console.log('Request Url:' + req.url);
    next();
});
//También con el app.use podemos llevar como un "recorrido" de lo que haga el usuario, de tal forma que si accedemos
//a alguna ruta de los disponibles se imprimirá en la consola.

//primera ruta (a nivel de raíz), Hello world!
app.get('/', function (req, res) {
    res.send(`<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head>
    <body><h1>Hello world!</h1></body></html>`);
});
//La respuesta se envía en formato HTML y además se especifica el directorio en el que se encuentra localizada la
//carpeta de estilos. En este caso nos ayudan los backticks para que podamos dar el salto de línea.
//Gracias a que le pusimos la referencia, ahora el contenido mostrado en localhost:3000 está estilizado y se ve mucho mejor.


//Segunda ruta /api, esta regresa un objeto JSON
app.get('/api', function (req, res) {
    res.json({ firstname: `John`, lastname: `Doe`});
});
//Con esta segunda ruta podemos observar en /api que nos regresa el JSON en formato 
//raw.

//tercera ruta, esta recibe un parámetro.
app.get('/person/:id', function (req, res) {
    res.send(`<html><head></head><body><h1>Person: ${req.params.id}</h1></body></html>`);
});
//Con esta ruta debemos especificar un parametro nosotros, por ejemplo: /person/Gustavo
//de esta forma en nuestro servidor se mostrará un mensaje así Person: Gustavo
//Esto funciona  formateandolo en HTML con el texto Person, y mostrando el parámetro que se introduce en la URL.

app.listen(port);
//Con esto levantamos el server y lo ponemos a la escucha.
//Ahora con npx nodemon empezamos el server.

//De esta forma, veremos al acceder a localhost:3000 un mensaje de Hello world!

