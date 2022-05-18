$(document).ready(function () {
  const queryString = window.location.search;
  const productoId = queryString.substring(5, queryString.length);
  console.log(queryString);
  $("#agregar-titulo").hide();
  $("#editar-titulo").hide();
  if (queryString !== "") {
    $("#editar-titulo").show();
    //OBTENCIÓN DE PRODUCTO
    fetch("http://localhost:8080/productos/getProducto/" + productoId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        // $('#imagen').val(file);
        $("#precio").val(resData.precio);
        $("#nombre").val(resData.descripcion);
        console.log(resData);
      })
      .catch((err) => console.log(err));
  } else {
    $("#agregar-titulo").show();
  }

  $("#formulario").submit(function (e) {
    let nuevoProducto = {
      img: "",
      precio: "",
      descripcion: "",
      cantidad: 1,
    };
    e.preventDefault();

    nuevoProducto.img = $("#imagen").val();
    nuevoProducto.precio = $("#precio").val();
    nuevoProducto.descripcion = $("#nombre").val();

    //validaciones
    if (nuevoProducto.descripcion == "") {
      alert("Ingrese descripción del producto");
      return;
    }
    if (nuevoProducto.precio == "") {
      alert("Ingrese precio del producto");
      return;
    }

    if (nuevoProducto.img == "") {
      alert("Ingrese imagen del producto");
      return;
    }
    if (queryString !== "") {
      //ACTUALIZACION DE PRODUCTO
      fetch("http://localhost:8080/productos/editarProducto/" + productoId, {
        method: "PUT",
        body: JSON.stringify({
          img: nuevoProducto.img.substring(12, nuevoProducto.img.length),
          precio: nuevoProducto.precio,
          descripcion: nuevoProducto.descripcion,
          cantidad: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          alert(resData);
          console.log(resData);
        })
        .catch((err) => alert(err));
    } else {
      //ENVIO DE PRODUCTO
      fetch("http://localhost:8080/productos/crearProducto", {
        method: "POST",
        body: JSON.stringify({
          img: nuevoProducto.img.substring(12, nuevoProducto.img.length),
          precio: nuevoProducto.precio,
          descripcion: nuevoProducto.descripcion,
          cantidad: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          alert(resData);
        })
        .catch((err) => alert(err));
    }
  });
});
