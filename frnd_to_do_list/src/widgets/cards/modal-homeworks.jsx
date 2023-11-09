import { API_URL } from "@/data/env";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const Modal = ({ isOpen, setIsOpen, modalType, token, userInfo, rowInfo }) => {
  if (isOpen === false) return null;

  const [tituloField, setTituloField] = useState("");
  const [descripcionField, setDescripcionField] = useState("");
  const [fechaCField, setFechaCField] = useState("");
  const [fechaVField, setFechaVField] = useState("");
  const [etiquetaField, setEtiquetaField] = useState("");

  const handleWork = async () => {
    try {
      const formData = new FormData();
      formData.append("titulo", tituloField);
      formData.append("descripcion", descripcionField);
      formData.append("fecha_creacion", fechaCField);
      formData.append("fecha_vencimiento", fechaVField);
      formData.append("etiquetas", etiquetaField);
      
      let user = userInfo.id;
      
      console.log(etiquetaField);
      
      if(modalType == 'save'){
        
        formData.append("estado", 1); // estado pendiente
        formData.append("asignado_a", user);

        const response = await fetch(`${API_URL}/createHomework`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.status == "error") {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error durante el guardado",
            icon: "error",
            button: "Cerrar",
            timer: "2500",
          });
        } else if (result.status == "success") {
          Swal.fire({
            title: "Correcto",
            text: "Creado correctamente",
            icon: "sucess",
            button: "Cerrar",
            timer: "2500",
          });
        }

      } else {

        formData.append("estado", rowInfo.estado); // estado pendiente
        formData.append("asignado_a", rowInfo.asignado_a);


        const response = await fetch(`${API_URL}/updateHomework/${rowInfo.id}?_method=PUT`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.status == "error") {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error durante la actualización",
            icon: "error",
            button: "Cerrar",
            timer: "2500",
          });
        } else if (result.status == "success") {
          Swal.fire({
            title: "Correcto",
            text: "Modificado correctamente",
            icon: "sucess",
            button: "Cerrar",
            timer: "2500",
          });
        }
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() =>{
    if(rowInfo != null && rowInfo != ''){
      setTituloField(rowInfo.titulo);
      setDescripcionField(rowInfo.descripcion);
      setFechaCField(rowInfo.fecha_creacion);
      setFechaVField(rowInfo.fecha_vencimiento);
      setEtiquetaField(rowInfo.etiquetas);
    } else {
      setTituloField('');
      setDescripcionField('');
      setFechaCField('');
      setFechaVField('');
      setEtiquetaField('');
    }

  },[rowInfo]);


  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/80">
      <div className="mt-12  flex  w-[53%] flex-col gap-12">
        <Card className="px-5">
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tasks
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div>
              <label for="nombre" className=" ml-[6%]">
                Title:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                disabled={ modalType == 'view' ? true : false}
                className="ml-5  mb-4 h-10 w-[194px] rounded-md border-2 border-blue-400/75 border-x-blue-gray-800 px-2 focus:outline-none"
                value={tituloField}
                onChange={(event) => setTituloField(event.target.value)}
              />

              <label for="nombre" className="ml-5">
                Tag:
              </label>
              <select
                name=""
                id=""
                className=" ml-[52px] h-10 w-[194px] rounded-md border-2 border-blue-400/75 border-x-blue-gray-800 bg-white px-3 focus:outline-none"
                value={etiquetaField}
                disabled={ modalType == 'view' ? true : false}
                onChange={(event) => setEtiquetaField(event.target.value)}
              >
                <option value="">Choose an option</option>
                <option value="1">Required</option>
                <option value="2">Optional</option>
              </select>
            </div>

            <div>
              <label for="fecha" className="ml-[2%]">
                Start Date:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                disabled={ modalType == 'view' ? true : false}
                required
                className="ml-2 mb-4 w-48 rounded-md border-2 border-blue-400/75 border-x-blue-gray-800 py-1 px-2 focus:outline-none"
                value={fechaCField}
                onChange={(event) => setFechaCField(event.target.value)}
              />

              <label for="fecha" className="ml-5">
                Final Date:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                disabled={ modalType == 'view' ? true : false}
                required
                className="ml-2 mb-4 w-48 rounded-md border-2 border-blue-400/75 border-x-blue-gray-800 py-1 px-2 focus:outline-none"
                value={fechaVField}
                onChange={(event) => setFechaVField(event.target.value)}
              />
            </div>
            <div className="flex">
              <label for="descripcion" className=" mt-10">Description:</label>
              <div>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  disabled={ modalType == 'view' ? true : false}
                  required
                  className="ml-2 mb-4 w-[490px] resize-none rounded-md border-2 border-blue-400/75 border-x-blue-gray-800 pl-2 pt-2 focus:outline-none"
                  value={descripcionField}
                  onChange={(event) => setDescripcionField(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className=" flex justify-center p-4">
            <Button
              type="submit"
              className={`w-35 ml-5 h-10 ${
                modalType == "view" ? "hidden" : ""
              } rounded-md bg-blue-600 text-gray-50`}
              onClick={() => { handleWork(); }}
            >
              { modalType == "edit" ?  'Edit' : 'Save'}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              type="submit"
              className=" w-35 ml-10 h-10 rounded-md bg-blue-600 text-gray-50"
            >
              Cancel
            </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
