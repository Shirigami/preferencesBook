
function agregarComida()
{
  if (document.getElementById("idComida").value == ''){
    alert('Ingrese una comida');
  }
  else {
    var ul = document.getElementById("listaComida");
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-info");
    li.appendChild(document.createTextNode(document.getElementById("idComida").value));
    ul.appendChild(li);
    document.getElementById("idComida").value = '';
  }
}

function agregarGenero()
{
if (document.getElementById("idGenero").value == ''){
  alert('Ingrese un género musical');
}
else {
  var ul = document.getElementById("listaGenero");
  var li = document.createElement("li");
  li.setAttribute("class", "list-group-item list-group-item-info");
  li.appendChild(document.createTextNode(document.getElementById("idGenero").value));
  ul.appendChild(li);
  document.getElementById("idGenero").value = '';
}
}

function agregarPasatiempo()
{
  if (document.getElementById("idPasatiempo").value == ''){
    alert('Ingrese un pasatiempo');
  }
  else {
    var ul = document.getElementById("listaPasatiempo");
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item list-group-item-info");
    li.appendChild(document.createTextNode(document.getElementById("idPasatiempo").value));
    ul.appendChild(li);
    document.getElementById("idPasatiempo").value = '';
  }
}
