import React, { useRef } from "react";
import { Form, Breadcrumb } from "react-bootstrap";
import "./Turnos.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  validateNames,
  validateVet,
  validateDate,
  validateTime,
} from "../../helpers/ValidateForms";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import Time from "./Time";

const TurnosEdit = ({ DB, getApi }) => {
  const redirect = useNavigate();
  const session = JSON.parse(sessionStorage.getItem("stateSession")) || false;

  const checkSession=()=>{
    if (!session) {
      redirect("/Login");
    }      
  }

  useEffect(()=>{
    checkSession();
  },[]);

  
  // state
  const [turno, setTurno] = useState({});
  const [turnos, setTurnos] = useState([]);
  const [horas, setHoras] = useState([]);
  
  const actHora = []

  const timePicker = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  //Parametros
  const { id } = useParams();
  // Use ref
  const petNameRef = useRef("");
  const vetRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const martaRef = useRef("");
  const ignacioRef = useRef("");

  // Navigate
  const navigate = useNavigate();
  // veterinarios
  const marta = "Dra Marta Minujin";
  const ignacio = "Dr Jorge Ignacio";



  useEffect(async () => {
    const res = await fetch(`${DB}/${id}`);
    const  appointmentAppi = await res.json();
    setTurno(appointmentAppi);
    searchAtDb()
  }, []);



const searchAtDb=( async ()=>{

    const res = await fetch(DB);
    const resultado= await res.json()
    setTurnos(resultado);
    const busquedaFechas = turnos.filter(
      (fechas) => fechas.date === dateRef.current.value );
     
      const buscarveterio = busquedaFechas.map((turnos) => turnos.vet);
     
      const filtradovet1 = buscarveterio.filter((buscada) => {
        return buscada === marta;
      });
     
      const filtradovet2 = buscarveterio.filter((buscado) => {
        return buscado === ignacio;
      });
     
      if (filtradovet1.length >= 8) {
        martaRef.current.disabled = true;
      } else if (filtradovet2.length >= 8) {
        ignacioRef.current.disabled = true;
      }
     
      const buscarHoras = busquedaFechas.map((turno) => turno.time);
      const filtradoHoras = timePicker.filter(
        (hora) => !buscarHoras.includes(hora)
      );
            
      setHoras(filtradoHoras);
 })



  const handleDateChange =  (e) => {

    const busquedaFechas = turnos.filter(
      (fechas) => fechas.date === e.target.value
    );
   
    // Buscamos por veterinario en esa fecha
    const buscarveterio = busquedaFechas.map((turno) => turno.vet);

    const filtradovet1 = buscarveterio.filter((buscada) => {
      return buscada === marta;
    });

    const filtradovet2 = buscarveterio.filter((buscado) => {
      return buscado === ignacio;
    });

    if (filtradovet1.length >= 8) {
      martaRef.current.disabled = true;
    } else if (filtradovet2.length >= 8) {
      ignacioRef.current.disabled = true;
    }

    const buscarHoras = busquedaFechas.map((turno) => turno.time);
    const filtradoHoras = timePicker.filter(
      (hora) => !buscarHoras.includes(hora)
    );
    setHoras(filtradoHoras);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones

    if (
      !validateNames(petNameRef.current.value) ||
      !validateVet(vetRef.current.value) ||
      !validateDate(dateRef.current.value) ||
      !validateTime(timeRef.current.value)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingreso algun dato incorrecto, por favor revise el formulario",
      });
      return;
    }

    const appUpdated = {
      petName: petNameRef.current.value,
      vet: vetRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
    };

    Swal.fire({
      title: "Esta seguro que quiere editar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56ced6",
      cancelButtonColor: "#ffc872",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
          const res = await fetch(`${DB}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(appUpdated),
          });
          if (res.status === 200) {
            Swal.fire(
              "Modificado!",
              "Su turno fue modificado correctamente",
              "success"
            );
            getApi();
            navigate("../../turnostable");
          }
      }
    });
  };
  return (
    <section className="container ">
     <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin">Administrador</Breadcrumb.Item>
        <Breadcrumb.Item href="/turnostable">
          Turnos
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Editar turno</Breadcrumb.Item>
      </Breadcrumb>
      <article className="botones-back">
       
  
      </article>
      <article className="title-style-form">
        <h1 className="title-h1">Administrador de turnos</h1>
        <hr />
      </article>

      <article className="d-flex justify-content-center mb-5 ">
        <Form className="mb-5 form_style" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label className='etiqueta'>🐶 Nombre del paciente*</Form.Label>
            <Form.Control
              className="form-stle-inner"
              type="text"
              defaultValue={turno.petName}
              placeholder="Puki"
              ref={petNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='etiqueta'>📅 Fecha </Form.Label>
            <Form.Control
              type="date"
              ref={dateRef}
              className="form-stle-inner"
              defaultValue={turno.date}
              placeholder="Ingrese la fecha para el turno dd/mm/yyyy"
              onChange={handleDateChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label className='etiqueta'>👩🏻‍⚕️ Veterinario*</Form.Label>
            <Form.Select
              ref={vetRef}
              className="form-stle-inner"
              value={turno.vet}
              onChange={({ target }) =>
                setTurno({ ...turno, vet: target.value })
              }
            >
              <option value="">Seleccione un profesional </option>

              <option ref={ignacioRef} value="Dr Jorge Ignacio">
                Dr. Jorge Ignacio
              </option>
              <option ref={martaRef} value="Dra Marta Minujin">
                Dra. Marta Minujin
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='etiqueta'>⏰ Horario </Form.Label>

            <Form.Select ref={timeRef}
            value={turno.time}
            onChange={({ target }) =>
                setTurno({ ...turno, time: target.value })
              }
             className="form-stle-inner">
              <option>Seleccione una opcion</option>
              {horas.map((hora, index) => {
                return <Time hora={hora} key={index} />;
              })}
            </Form.Select>
          </Form.Group>

          <div className="text-center mt-4">
            <button className="btn-carga ">Cargar 🐾</button>
          </div>
        </Form>
      </article>
    </section>
  );
};

export default TurnosEdit;
