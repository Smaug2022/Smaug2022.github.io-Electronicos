let productos = JSON.parse(sessionStorage.getItem("initialProducts"));

$(document).ready(function () {
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
    if (
      productos[productos.length - 1].descripcion == nuevoProducto.descripcion
    )
      alert("Producto ya agregado a la tienda");
    else {
      productos.push(nuevoProducto);
      alert("Producto  agregado  exitosamente");
    }

    var updatedProducts = productos;
    sessionStorage.setItem("updatedProducts", JSON.stringify(updatedProducts));
  });
});
