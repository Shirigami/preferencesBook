// diferentes herramientas utilizadas
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express()
// uso de paquetes de las herramientes
mongoose.connect('mongodb://localhost:27017/EventsPromoting')
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

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


/*
//CONSULTA DE CLIENTES
app.get("/consultas",function(req,res){
	Customer.find(function(error,documento){
		if(error){console.log(error);}
		//console.log({customer:documento})
		//var cus=({customer:documento});

		res.render("consultas/index",{customers:documento})
	});

});

app.post("/busqueda",function(req,res){
	Customer.find({"name":req.body.name}, function(err, cursor){
		console.log({customer:cursor});
		if(err){console.log(err);}
   	 	res.render("busqueda/finding",{customers:cursor})
   		});
 });

//CONSULTA DE HOBBIES
app.post("/searchHobbies",function(req,res){
	Customer.find({"hobbies":req.body.hobbie}, function(err, cursor){
		console.log(req.body.hobbieS);
		console.log(req.body.verHobbies);
		if(err){console.log(err);}
		if(req.body.verHobbies==undefined & req.body.hobbieS==undefined  ){
   	 		res.render("searchHobbies/hobbieSearch",{customers:cursor})
   	 	}else{
   	 		Customer.find(function(error,documento){
   	 			console.log(req.body)
				if(error){console.log(error);}
   	 				res.render("searchHobbies/listhobbies",{customs:documento})
   				});
   	 	}
   	});

});

//CONSULTA DE MÚSICA
app.post("/searchMusic",function(req,res){
	Customer.find({"musix":req.body.music}, function(err, cursor){
		console.log("Musica  "+req.body.Musica);
		console.log("verMusics  "+req.body.verMusics);
		//console.log(req.body.verHobbies);
		if(err){console.log(err);}
		if(req.body.Musica==undefined & req.body.verMusics!=undefined){
   	 		res.render("searchMusic/musicSearch",{customers:cursor})
   	 	}else{
   	 			Customer.find(function(error,documento){
   	 		//	console.log(req.body)
				if(error){console.log(error);}
   	 				res.render("searchMusic/listMusix",{customu:documento})
   				});
   	 	}
   	});

});

//CONSULTA DE COMIDA aca quede
app.post("/searchFood",function(req,res){
	Customer.find({"food":req.body.foods}, function(err, cursor){
		console.log("CFoods  "+req.body.Food);
		console.log("Food  "+req.body.CFoods);
		//console.log(req.body.verHobbies);
		if(err){console.log(err);}
		if(req.body.CFoods==undefined & req.body.Food!=undefined){
   	 		res.render("searchFood/searchFood",{customers:cursor})
   	 	}else{
   	 			Customer.find(function(error,documento){
   	 		//	console.log(req.body)
				if(error){console.log(error);}
   	 				res.render("searchFood/listFood",{customu:documento})
   				});
   	 	}
   	});

});

*/
//

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




//metodo post de insert
app.post("/",function(req,res){
	console.log(req.body);

	for(ele in req.body.listaComida){
		console.log(ele);
	}
	var data={
	name:req.body.nombre,
	mail:req.body.email,

	food:req.params.elemento1,
	musix:req.body.listaGenero,
	hobbies:req.body.listaPasatiempo
	}

	var customer=new Customer(data);
	console.log(customer);
	customer.save(function(err){
		console.log(customer);
		res.render("index.html");
	});
});




app.listen(27017);
