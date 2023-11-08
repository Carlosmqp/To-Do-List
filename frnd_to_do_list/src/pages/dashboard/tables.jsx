import { API_URL } from "@/data/env";
import { useState } from "react";
import Swal from 'sweetalert2';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";

export function Tables() {

  const [tituloField,setTituloField] = useState('');
  const [descripcionField,setDescripcionField] = useState('');
  const [fechaCField,setFechaCField] = useState('');
  const [fechaVField,setFechaVField] = useState('');
  const [etiquetaField,setEtiquetaField] = useState('');
  const [estadoField,setEstadoField] = useState('');

  const handleWork = async () => {

    try {

      const formData = new FormData();

      formData.append('titulo', tituloField);
      formData.append('descripcion', descripcionField);
      formData.append('fecha_creacion', fechaCField);
      formData.append('fecha_vencimiento', fechaVField);
      formData.append('etiquetas', etiquetaField);
      formData.append('estado', estadoField);
      
      let token = localStorage.getItem('token');  
      let userInfo = localStorage.getItem('userInfo'); 
      
      let user = userInfo.id;

      console.log(userInfo);

      formData.append('asignado_a', user);

      const response = await fetch(`${API_URL}/createHomework`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    });

    

    const result =  await response.json();

    
    if(result.status == 'error'){

      Swal.fire({
        title:'Error',
        text:'Los campos no pueden estar vacios',
        icon:'error',
        button: 'Cerrar',
        timer:'2500'
      });

    }else if(result.status == 'success') {

      Swal.fire({
        title:'Correcto',
        text:'Creado correctamente',
        icon:'sucess',
        button: 'Cerrar',
        timer:'2500'
      });
    }


    }
    catch(error){
      console.error(error);
    }

  };

  return (

    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="px-5">
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Homeworks
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* <form action="#" method="post" className="ml-5"> */}
            <div>
              <label for="nombre" className=" mr-[6%]">Title:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="ml-2  mb-4 w-96 h-10 px-2 focus:outline-none border-blue-400/75 rounded-md border-2 border-x-blue-gray-800"
                value={tituloField} onChange={(event) => setTituloField(event.target.value)}
              />

              <label for="fecha" className="ml-[2%]">
                Start Date:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                required
                className="ml-2 mb-4 w-48 rounded-md focus:outline-none border-2 border-blue-400/75 border-x-blue-gray-800 py-1 px-2"
                value={fechaCField} onChange={(event) => setFechaCField(event.target.value)}
              />
            </div>
            <div>
              <label for="fecha" className="ml-[56%]">
                Final Date:
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                required
                className="ml-2 mb-4 w-48 rounded-md focus:outline-none border-2 border-blue-400/75 border-x-blue-gray-800 py-1 px-2"
                value={fechaVField} onChange={(event) => setFechaVField(event.target.value)}
              />
            </div>
            <div className="flex">
              
              <label for="descripcion">Description:</label>
              <div>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  required
                  className="ml-2 mb-4 w-96 rounded-md focus:outline-none border-2 border-blue-400/75 border-x-blue-gray-800 pl-2 pt-2"
                  value={descripcionField} onChange={(event) => setDescripcionField(event.target.value)}
                ></textarea>
              </div>

              <label for="nombre" className="ml-5">Tag:</label>
              <select name="" id="" className=" w-64 h-10 ml-5 rounded-md px-3 focus:outline-none bg-white border-2 border-blue-400/75 border-x-blue-gray-800"
              value={etiquetaField} onChange={(event) => setEtiquetaField(event.target.value)}>
                <option value="">Choose an option</option>
                <option value="1">Required</option>
                <option value="2">Optional</option>
              </select>

            <label for="nombre" className="ml-5">Tag:</label>
              <select name="" id="" className=" w-64 h-10 ml-5 rounded-md px-3 focus:outline-none bg-white border-2 border-blue-400/75 border-x-blue-gray-800"
              value={estadoField} onChange={(event) => setEstadoField(event.target.value)}>
                <option value="">Choose an option</option>
                <option value="1">Option1</option>
                <option value="2">Option2</option>
              </select>
            </div>


            {/* <div>
              <label for="imagen">upload image (if is necesary):</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                className="mb-4"
              />
            </div> */}

            <Button
              type="submit"
              className=" h-10 w-35 ml-2 rounded-md bg-blue-600 text-gray-50"
              onClick={() => {handleWork()}}
            >
              Save
            </Button>
          {/* </form> */}
        </CardBody>
      </Card>

      {/* <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Homeworks Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["homework", "see", "edit", "delete", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <button>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </button>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <button>
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}
                            </Typography>
                          </button>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
