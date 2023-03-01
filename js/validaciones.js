export function validar(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  console.log (input.parentElement);
  if (input.validity.valid){
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
  }else{
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError (tipoDeInput, input);
  } 
}
const tiposDeErrores = [
    "valueMissing",
    "tipeMismatch",
    "patterMismarch",
    "custtomError"
]
const mensajeDeError = {
    name: {
        valueMissing : "esto no puede estar vacio"
    },
    email: {
        valueMissing : "el email no puede estar vacio",
        typeMismatch : "el correo no es valido"
    },
    password: {
        valueMissing : "la contraseña no esta llena ",
        patterMismarch : "Mín 6 max 12 caract.,1 letra mayúscula, 1 letra minúscula y 1 número"
    },
    nacimiento: {
        valueMissing : "falta agregar la fecha vacio",
        custtomError : "debes tener al menos 18 años de edad"
    },
}
 
function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tiposDeErrores.forEach(error => {
        if (input.validity[error]){
           
            console.log(tipoDeInput,error); 
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
             mensaje = mensajeDeError[tipoDeInput][error];
        }
        
    });
    return mensaje;
}


const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};


function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje); //establece un mensaje de validez personalizado para el elemento
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciaFechas <= fechaActual;
}
