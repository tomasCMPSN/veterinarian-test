// Regular expressions
const regEx4Names = /^[A-Za-z\s?]+$/;
const regEx4Selector = /^[A-Za-z\-\s?]+$/;
const regExp4Date = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
const regExp4Email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regExp4Number = /^([0-9])*$/

export const validateNames = (campo) => {
  if (
    regEx4Names.test(campo) &&
    campo.trim().length < 23 &&
    campo.trim().length > 0 &&
    campo !== ""
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateVet = (campo) => {
  if (
    regEx4Selector.test(campo) &&
    (campo === "Dra Marta Minujin" || campo === "Dr Jorge Ignacio")
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateDate = (campo) => {
  if (regExp4Date.test(campo)) {
    return true;
  } else {
    return false;
  }
};


export const validateEmail = (campo)=>{
  if(regExp4Email.test(campo)){
    return true
  }else{
    return false
  }
}

export const validateMesage = (campo)=>{
  if (campo.length < 300){
    return true
  } else {
    return false
  }
}

export const validateNumber= (campo)=>{
  if(regExp4Number.test(campo)&& campo.length<13){
    return true
  }else{
    return false
  }
}