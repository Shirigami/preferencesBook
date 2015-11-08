// diferentes herramientas utilizadas
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()


// uso de paquetes de las herramientes
mongoose.connect('mongodb://localhost:27017/EventsPromoting');


//var uri = "mongodb://192.168.0.14:30002,192.168.0.10:30001/EventsPromoting";

//mongoose.connect(uri);





app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

// Paths utilizados para la ejecucion del programa
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/static'))

// Definiendo tablas
var customerSchema = {
	name: String,
	mail: String,
	food: [],
	musix: [],
	hobbies: []
}
var Customer = mongoose.model('Customer', customerSchema)
// init página
app.get('/', function (req, res) {
// console.log(req);
res.render('index.html')
});


//-------------Pagina index - Busqueda de clientes---------------

// Consulta de los clientes get /buscarClientes.. Carga customers a la pag
app.get("/buscarCliente",function(req,res){
	Customer.find(function(error,documento){
		if(error){console.log(error);}
		res.render("consultas/consultarCliente.html",{customers:documento})
	});

});

//Consulta cliente hace post de action /busqueda.. Carga el customer especificado
app.post("/busqueda",function(req,res){
	Customer.find({"name":req.body.name}, function(err, cursor){

		if(err){console.log(err);}
   	 	res.render("consultas/consultarCliente.html",{customers:cursor})
   		});
 });

//-------------Pagina searchHobbies - Busqueda pasatiempos---------------
 //Consulta de pasatiempos get /buscarClientePasatiempo .. Carga los clientes a la pag
 app.get("/buscarClientePasatiempo",function(req,res){
 	Customer.find(function(error,documento){
 		if(error){console.log(error);}

 		res.render("searchHobbies/pasatiempoCliente.html",{customers:documento,pasatiempo1:":"})
 	});

 });
//CONSULTA DE HOBBIES
app.post("/busquedaPasatiempo",function(req,res){
	Customer.find({"hobbies":req.body.pasatiempo}, function(err, cursor){
		if(err){console.log(err);}
   	 		res.render("searchHobbies/pasatiempoCliente.html",{customers:cursor,pasatiempo1:req.body.pasatiempo + ":"})
   	});
});

app.get("/buscarPasatiempos",function(req,res){
 Customer.find(function(error,documento){
	 if(error){console.log(error);}
	 var listHobbies = [];

	 for (var i = 0; i < documento.length;i++){
		 for (var x = 0; x < documento[i].hobbies.length; x++) {
			 if (listHobbies.indexOf(documento[i].hobbies[x]) == -1){
				listHobbies.push(documento[i].hobbies[x]);
			}
		 }

	 }
	 res.render("searchHobbies/pasatiempos.html",{listHobbies:listHobbies})
 });

});

//-------------Pagina searchFood - Busqueda de comidas---------------

//Consulta de comidas get /buscarClienteMusica .. Carga los clientes a la pag
app.get("/buscarClienteComida",function(req,res){
 Customer.find(function(error,documento){
	 if(error){console.log(error);}
	 res.render("searchFood/comidaCliente.html",{customers:documento,comida1:":"})
 });

});

//CONSULTA DE COMIDA
app.post("/busquedaComida",function(req,res){
	Customer.find({"food":req.body.foods}, function(err, cursor){

		if(err){console.log(err);}
   	 		res.render("searchFood/comidaCliente.html",{customers:cursor,comida1: req.body.foods +":"})
   	});

});

app.get("/buscarComida",function(req,res){
 Customer.find(function(error,documento){
	 if(error){console.log(error);}
	 var listComidas = [];

	 for (var i = 0; i < documento.length;i++){
		 for (var x = 0; x < documento[i].food.length; x++) {
			 if (listComidas.indexOf(documento[i].food[x]) == -1){

				listComidas.push(documento[i].food[x]);
			}
		 }

	 }
	 res.render("searchFood/comidas.html",{listComidas:listComidas})
 });

});

//-------------Pagina searchMusic - Busqueda de musica---------------

// Consulta de los clientes get /buscarClienteMusica. Carga customers a la pag
app.get("/buscarClienteMusica",function(req,res){
	Customer.find(function(error,documento){
		if(error){console.log(error);}
		res.render("searchMusic/musicaCliente.html",{customers:documento,genero1:":"})
	});

});

//CONSULTA DE MÚSICA
app.post("/busquedaMusica",function(req,res){
	Customer.find({"musix":req.body.genero}, function(err, cursor){

		if(err){console.log(err);}
   	 		res.render("searchMusic/musicaCliente.html",{customers:cursor,genero1:req.body.genero + ":"})

   	});
});

app.get("/buscarMusica",function(req,res){
 Customer.find(function(error,documento){
	 if(error){console.log(error);}
	 var listMusic = [];

	 for (var i = 0; i < documento.length;i++){
		 for (var x = 0; x < documento[i].musix.length; x++) {
			 if (listMusic.indexOf(documento[i].musix[x]) == -1){

				listMusic.push(documento[i].musix[x]);
			}
		 }

	 }
	 res.render("searchMusic/musica.html",{listMusic:listMusic})
 });

});

//-------------Menu gets para el sidebar -----------------------

app.get("/buscarCliente", function(req, res){
		res.render('consultas/consultarCliente.html')
});

app.get("/buscarClientePasatiempo", function(req, res){
		res.render('searchHobbies/pasatiempoCliente.html')
});

app.get("/buscarClienteMusica", function(req, res){
		res.render('searchMusic/musicaCliente.html')
});

app.get("/buscarClienteComida", function(req, res){
		res.render('searchFood/comidaCliente.html')
});
app.get("/buscarComida", function(req, res){
		res.render('searchFood/comidas.html')
});
app.get("/buscarMusica", function(req, res){
		res.render('searchMusic/musica.html')
});
app.get("/buscarPasatiempos", function(req, res){
		res.render('searchHobbies/pasatiempos.html')
});

//-------------Pagina index - Insercion---------------

//metodo post de insert
app.post("/",function(req,res){

	var data={
	name:req.body.nombre,
	mail:req.body.email,

	food:req.params.elemento1,
	musix:req.body.listaGenero,
	hobbies:req.body.listaPasatiempo
	}

	var customer=new Customer(data);
	customer.save(function(err){
		res.render("index.html");
	});
});

app.listen(11111);
