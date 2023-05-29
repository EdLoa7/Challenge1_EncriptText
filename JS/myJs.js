/* Con esta Función se presenta la pantalla del resultado  */
function cambiarContenedor(cont1,cont2) {
    // var contenedor1 = document.getElementById("mi-contenedor2");
    // var contenedor2 = document.getElementById("mi-contenedor22");
    cont2.style.display = "flex";
    cont1.style.display = "none";
  }  


/* Función que oculta las frases debajo del muñeco, cuando se ingres caracteres a codificar  */
function ocultarElemento() {
    let textarea = document.getElementById("textarea");
    let textoX = document.getElementById("texto2");
    if (textarea.value.length > 0) {
        textoX.classList.add("oculto");
    }else{
        textoX.classList.remove("oculto");
    }    
}

/* Función su limita la entrada de datos del Textarea Principal  */

function ajustarEntrada(){
    let textarea = document.getElementById("textarea");
    let textareamin = textarea.value.toLowerCase();
    let textareaminSinCaracteresEspeciales = textareamin.replace(/[^a-z0-9\s]/g, "");
    let textareaminSinAcentos = textareaminSinCaracteresEspeciales.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    textarea.value = textareaminSinAcentos;
}


/*  Función que oculta y muestra botones  */
function ocultaMuestraBotones(btn1,btn2,txt1){   
    if(txt1.value.length >0){
       //alert(textarea2.value.length);
         btn1.style.display = "none";
         btn2.style.display = "block";
         btn2.classList.add('elevar');
     }else{
         btn1.style.display = "bloque";
         btn2.style.display = "none";
     }
}


/* Función que encripta la frase entrada en el textarea principal  */

function encriptar(){ 
    var flag1 = false;       
    let cont1 = document.getElementById("mi-contenedor2");
    let cont2 = document.getElementById("mi-contenedor22");
    let boton30 = document.getElementById("botonCopiar");
    let boton31 = document.getElementById("botonPegar");
    let textarea = document.getElementById("textarea");
    let textarea2 = document.getElementById("textarea2");
    let caracter =  textarea.value;
  //  var array1 = caracter.split(",");
   // alert(caracter.length);
    let valorEncontrado = [];
    let llaves = {
        "e" : "enter",
        "i" : "imes",
        "a" : "ai",
        "o" : "ober",        
        "u" : "ufat"
    };
  

  if(caracter.length>0){
    flag1=false;
    detenerResaltado()  
    for(let i=0; i< caracter.length; i++){
        let elemento = caracter.charAt(i);
        //alert(elemento);
        if(llaves.hasOwnProperty(elemento)){
            valorEncontrado[i] = llaves[elemento];
            flag1 = true;
        }else{
            valorEncontrado[i] = elemento;
        }
    }
    console.log(flag1);

    if(flag1==false){
        // alert("Lo Siento, debe colocar al menos una vocal, Gracias!!!");
        openPopup()
        limpiar2()            
    }else{        
            // console.log(valorEncontrado);
            let resultado = valorEncontrado.join('');   
            // console.log(resultado);
 
         cambiarContenedor(cont1,cont2)    
         textarea2.value = resultado
         let tiempoEspera = 500;
         setTimeout(ocultaMuestraBotones(boton31,boton30,textarea2), tiempoEspera);
    }   

  }else{
    resaltarTexto()
  }

    
}

function obtenerllave(valor1){
    let valor2=valor1;
    let llaves = {
        "enter" : "e",
        "imes" : "i",
        "ai" : "a",
        "ober" : "o",        
        "ufat" : "u",
    };

    for(let clave in llaves){   
        if(llaves.hasOwnProperty(clave)){
            let expresion = new RegExp(clave, "gi");
            valor2=valor2.replace(expresion,llaves[clave]);
        }
    } 

    return valor2;

}


function desencriptar(){   
    let cont1 = document.getElementById("mi-contenedor2");
    let cont2 = document.getElementById("mi-contenedor22");
    let boton30 = document.getElementById("botonCopiar");
    let boton31 = document.getElementById("botonPegar");
    let textarea = document.getElementById("textarea");
    let textarea2 = document.getElementById("textarea2");
    let caracter =  textarea.value;
  
  

  if(caracter.length>0){    
    detenerResaltado()
        let resultado = obtenerllave(caracter);
        cambiarContenedor(cont1,cont2)    
        textarea2.value = resultado
        let tiempoEspera = 500;
        setTimeout(ocultaMuestraBotones(boton31,boton30,textarea2), tiempoEspera);
    // }   

  }else{
    resaltarTexto()
  }

    
}



/*  Función que coloca en el Portapapeles lo encriptado  
    Y una vez copiado muestra el boton de pegar  */

function copiar1(){
    let textarea2 = document.getElementById("textarea2");    
    textarea2.select();    
    // Copiar el texto al portapapeles
    document.execCommand("copy");
     // Deseleccionar el texto
    textarea2.blur();
    console.log("Texto copiado al portapapeles: " + textarea2.value);

    
}

/*** * Temporizamos la acción ** */

function copiar(){
    let textarea2 = document.getElementById("textarea2");
    let boton30 = document.getElementById("botonCopiar");
    let boton31 = document.getElementById("botonPegar");
    let tiempoEspera = 500;
    copiar1()
    setTimeout(ocultaMuestraBotones(boton30,boton31,textarea2), tiempoEspera);
}

function pegar1(textarea2){
    let textarea = document.getElementById("textarea");
    textarea.value ="none";
    textarea.value = textarea2.value; 
    textarea2.value="";
}


function pegar(){
    let cont1 = document.getElementById("mi-contenedor2");
    let cont2 = document.getElementById("mi-contenedor22");
    let textarea2 = document.getElementById("textarea2");
    let texto = document.getElementById("texto2");
    let boton30 = document.getElementById("botonCopiar");
    let boton31 = document.getElementById("botonPegar");
    let tiempoEspera = 500;
    pegar1(textarea2)
    cambiarContenedor(cont2,cont1) 
    texto.style.display = "none";
    // setTimeout(ocultaMuestraBotones(boton31,boton30,!textarea2), tiempoEspera);

}

function limpiar(){
    let textarea = document.getElementById("textarea");
    let textarea2 = document.getElementById("textarea2");
    let cont1 = document.getElementById("mi-contenedor2");
    let cont2 = document.getElementById("mi-contenedor22");
    let texto = document.getElementById("texto2");
    if(textarea.value.length >0){
        textarea.value="";
    }
    if(textarea2.value.length >0){
        textarea2.value="";
    }
    
    cambiarContenedor(cont2,cont1) 
    texto.style.display = "block";
}

function limpiar2(){
    let textarea = document.getElementById("textarea");
    let textarea2 = document.getElementById("textarea2");    
    let texto = document.getElementById("texto2");
    if(textarea2.value.length >0){
        textarea2.value="";
    }
    texto.style.display = "none";
    textarea.focus();
    
}




/*   ** ANIMACIONES  **  */ 

function resaltarTexto() {
    let texto = document.getElementById("texto2");
    texto.classList.add('animated');
}  
function detenerResaltado() {
    let texto = document.getElementById("texto2");
    texto.classList.remove('animated');
}


/*  **  FUNCIONES PARA LA VENTANA EMERGENTE O POPUP  ** */
function openPopup() {
    var popup = document.getElementById("popupContainer");
    popup.style.display = "block";
  }
  
  function closePopup() {
    var popup = document.getElementById("popupContainer");
    popup.style.display = "none";
  }