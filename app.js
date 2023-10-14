
const pajaro = document.getElementById("pajaro")
var altura = 0
var objetos = document.querySelectorAll(".objetos")
var activado = false
var iniciado = true
/*detectar las coliciones y perder */
function Colision() {
     const pajaroRect = pajaro.getBoundingClientRect();

    objetos.forEach(objeto => {
      const objetoRect = objeto.getBoundingClientRect();
      if (
        pajaroRect.right > objetoRect.left &&
        pajaroRect.top < objetoRect.bottom &&
        pajaroRect.left < objetoRect.right &&
        pajaroRect.bottom > objetoRect.top
      ) {
        if (activado ===false) {
            perdiste()
        }
      }
    });
  }
setInterval(Colision, 100);


/* jugar // subir */
function subir() {
    document.addEventListener("keyup", e=>{
        if (e.key === "w" && altura > -300) {
            altura = altura - 50
        }
        if (e.key === ' ' && altura > -300) {
            altura = altura - 50
        }
    })       
}
subir()
var intervalo = ""
var objetoss_reseteo = false
var caja2_reseteo = false
/*iniciar y resetar la posicion */
var objetoss = 1600
var caja2 = 1600
var intervaloCajas = ""
iniciar.addEventListener("click", e=>{
    inicia__texto.style.display ="none"
    activado = false
    iniciado = true
    iniciar.style.display = "none"
    /* empieza la caida del pajaro si fue iniciado*/
    if (iniciado === true) {
        function caida() {
         intervalo = setInterval(() => {
            pajaro.style.top = altura + "px";

            /* si el pajaro no toca los bordes de la pantalla sigue jugando y cae*/
            if (altura < 430 && altura > -300) {
                altura = altura + 10
            } /* si lo toca pierde */ 
            else {
                if (activado === false) {
                    perdiste()
                }          
            }
            console.log(altura)
        }, 100);
        }
        caida()
    }

/* mueve las cajas */
 intervaloCajas = setInterval(() => {
    /* funcionamiento de la primer caja */
    if (contenedor_cajas.style.left < 200) {
        objetoss++
        contenedor_cajas.style.left = "-" + objetoss + "px"
    }
    else {
        objetoss--
        contenedor_cajas.style.left = objetoss + "px"
    }
    /* funcionamiento de la segunda caja */
    if (contenedor_cajas.style.left < 950 + "px") {
        caja2--
        contenedor_cajas__dos.style.left =  caja2 + "px"
    }

    /* reseteo o bucle de las cajas */
    if (objetoss < -1200) {
        objetoss_reseteo = true
        objetoss--
        contenedor_cajas.style.left = 1600 + "px"
        objetoss = 1600
    }
    if (caja2 < -2400) {
        caja2_reseteo = true
        caja2--
        contenedor_cajas__dos.style.left = 1600 + "px"
        caja2 = 1600
    }

    if (objetoss_reseteo === true & objetoss < 0) {
        objetoss_reseteo = false
        objetoss--
        contenedor_cajas.style.left = 1400 + "px"
        objetoss = 1400
    }
    if (caja2_reseteo === true) {
        caja2_reseteo = false
        caja2--
        contenedor_cajas__dos.style.left = 1600 + "px"
        caja2 = 1600
    }


    console.log(objetoss + "objetoss")
    console.log(caja2 + "caja2")
}, 10);
})
var puntuacion = 0
setInterval(() => {
    puntuacion++
}, 500);

/* perdiste */
function perdiste(params) {
    var mensaje = confirm("PERDISTE! " + ` Tu puntuación es: ${puntuacion}`)
    if (mensaje) {
        iniciar.style.display = "block"
        inicia__texto.style.display="block"
        /* frena el avance de las cajas */
        clearInterval(intervalo)
        clearInterval(intervaloCajas)
        clearInterval(puntuacion)
        puntuacion = 0
        /* permite el reinicio */
        iniciado = false
        activado = true
        /* deja el pajaro en su posicion inical */
        pajaro.style.top = 0 + "px"
        pajaro.style.left = 0 + "px"
        /* deja las cajas en su posicion inicial */
        contenedor_cajas.style.left = 1600 + "px"
        contenedor_cajas__dos.style.left = 1600 + "px"
        objetoss = 1600
        caja2 = 1600

        altura = 0
    } else {
        alert("nos vemos :(")
    }
}

// alert("Correciones por realizar: \n *Corregir imagen de las tuberias \n *Corregir bug de superposicion de tuberias \n *Agregar inclinacion al pajaro")