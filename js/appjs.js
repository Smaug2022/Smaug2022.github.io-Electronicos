let productos = [
  {
    img: "Mouse.jpg",
    precio: "$1500",
    descripcion:
      "Mouse Gaming con Luces RGB, Sensibilidad de hasta 16,000 RPI, duración de hasta 50 millones de clicks",
    cantidad: 1,
  },
  {
    img: "Mouse2.jpg",
    precio: "$150",
    descripcion:
      "Mouse laser con cable, sensor óptico de 1600 PPP, para zurdos o  diestros, 3 botones.",
    cantidad: 1,
  },
  {
    img: "ControlPS.jpg",
    precio: "$1,500",
    descripcion: "Control para PlayStation 5, recargable.",
    cantidad: 1,
  },
  {
    img: "ControlXbox.jpg",
    precio: "$1700",
    descripcion: "Control para Xbox One, tercera generación, usa baterias AA.",
    cantidad: 1,
  },
  {
    img: "Teclado.jpg",
    precio: "$1,100",
    descripcion: "Teclado Gaming con luces RGB.",
    cantidad: 1,
  },
  {
    img: "LapTop.jpg",
    precio: "$5,000",
    descripcion:
      "Laptop Dell, Intel core i5, 4Gb ram, 1Tb de disco duro, acero.",
    cantidad: 1,
  },
  {
    img: "Monitor1.jpg",
    precio: "$6,800",
    descripcion: "Monitor Lenovo 20.",
    cantidad: 1,
  },
  {
    img: "Cpu.jpg",
    precio: "$4,000",
    descripcion: "CPU Dell i5 8 ram.",
    cantidad: 1,
  },
  {
    img: "audifonos.jpg",
    precio: "$800",
    descripcion: "Audífonos gamer con luz led.",
    cantidad: 1,
  },
  {
    img: "Cpu2.jpg",
    precio: "$12,500",
    descripcion: "CPU gamer Adm 5 560 16 ram.",
    cantidad: 1,
  },
];

let productosCarrito = [];

let indexCarrito = 0;

sessionStorage.setItem("initialProducts", JSON.stringify(productos));

let updatedProducts = JSON.parse(sessionStorage.getItem("updatedProducts"));

if (updatedProducts !== null) {
  productos = updatedProducts;
  sessionStorage.setItem("initialProducts", JSON.stringify(productos));
}

$(document).ready(function () {
  $("#carrito").click(function () {
    $(".contenedor-carrito").toggle("slide");
  });

  $("#lista-carrito").html(
    '<div class="col-md-12 text-center">' +
      "<p>0 artículos agregados </p>" +
      "</div>"
  );

  $("#vaciar-carrito").hide();

  console.log(productos);

  for (var i = 0; i < productos.length; i++) {
    let htmlText =
      '<div class="col-sm-4">' +
      '<div class="card" style="width: 18rem; margin-top:70px;">' +
      '<img src="' +
      productos[i].img +
      '" class="card-img-top" alt="..." />' +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      productos[i].precio +
      "</h5>" +
      '<p class="card-text">' +
      productos[i].descripcion +
      "</p>" +
      "<button value=" +
      i +
      ' class="btn btn-primary agregar-carrito">Agregar al carrito</button>' +
      "</div>" +
      "</div>";

    $(".articulos").append(htmlText);
  }

  $(".agregar-carrito").click(function (e) {
    if (productosCarrito.length == 0) {
      $("#lista-carrito").empty();
    }
    productosCarrito.push(productos[e.target.value]);

    let htmlText =
      '<div class="col-md-3">' +
      '<img src="' +
      productosCarrito[indexCarrito].img +
      '" class="rounded"  />' +
      "</div>" +
      '<div class="col-md-3">' +
      productosCarrito[indexCarrito].descripcion +
      "</div>" +
      '<div class="col-md-2">' +
      productosCarrito[indexCarrito].precio +
      "</div>" +
      '<div  class="col-md-2">' +
      "<p>" +
      productosCarrito[indexCarrito].cantidad +
      "</p>" +
      "</div>" +
      '<div class="col-md-2 d-flex justify-content-center align-items-center">' +
      "<button value=" +
      productosCarrito[indexCarrito].precio +
      ' class="btn-circle btn-xs btn-danger borrar-producto">X</button>' +
      "</div>";
    $("#lista-carrito").append(htmlText);

    indexCarrito++;

    $("#vaciar-carrito").show();
  });

  $("#vaciar-carrito").click(function () {
    productosCarrito.splice(0, productosCarrito.length);
    console.log(productosCarrito);
    $("#lista-carrito")
      .empty()
      .html(
        '<div class="col-md-12 text-center">' +
          "<p>0 artículos agregados </p>" +
          "</div>"
      );
    $("#vaciar-carrito").hide();
    indexCarrito = 0;
  });

  $(document).on("click", ".borrar-producto", function (e) {
    let indexProducto = productosCarrito.indexOf(e.target.value);
    console.log(e.target.value);
    productosCarrito.splice(indexProducto, 1);
    console.log(productosCarrito);

    if (productosCarrito.length == 0) {
      $("#lista-carrito").empty();
      $("#lista-carrito").html(
        '<div class="col-md-12 text-center">' +
          "<p>0 artículos agregados </p>" +
          "</div>"
      );
      $("#vaciar-carrito").hide();
      indexCarrito = 0;
    }
  });
});
