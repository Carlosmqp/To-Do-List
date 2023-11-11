import { API_URL } from "@/data/env";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Tooltip,
  Progress,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import Modal from "@/widgets/cards/modal-homeworks";

export function Tables() {
  const [homerwoksInfo, setHomeworksInfo] = useState([]);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [rowInfo, setRowInfo] = useState(null);

  // const handleWork = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("titulo", tituloField);
  //     formData.append("descripcion", descripcionField);
  //     formData.append("fecha_creacion", fechaCField);
  //     formData.append("fecha_vencimiento", fechaVField);
  //     formData.append("etiquetas", etiquetaField);
  //     formData.append("estado", 1); // estado pendiente

  //     let user = userInfo.id;

  //     console.log(userInfo);

  //     formData.append("asignado_a", user);

  //     const response = await fetch(`${API_URL}/createHomework`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: formData,
  //     });

  //     const result = await response.json();

  //     if (result.status == "error") {
  //       Swal.fire({
  //         title: "Error",
  //         text: "Ha ocurrido un error durante el guardado",
  //         icon: "error",
  //         button: "Cerrar",
  //         timer: "2500",
  //       });
  //     } else if (result.status == "success") {
  //       Swal.fire({
  //         title: "Correcto",
  //         text: "Creado correctamente",
  //         icon: "sucess",
  //         button: "Cerrar",
  //         timer: "2500",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("token") != null
    ) {
      setToken(localStorage.getItem("token"));
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  const handleHomeworksData = async () => {
    const response = await fetch(`${API_URL}/getHomeworks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.status == "success") {
      const newData = result.data.filter((data) => data.asignado_a == userInfo.id);
      setHomeworksInfo(result.data);
    }
  };

  useEffect(() => {
    if (token !== "" && token !== null) {
      handleHomeworksData();
    }
  }, [token]);


  useEffect(() => {
    handleHomeworksData();
  },[isOpen]);



  const handleOpenModal = (type, rowInfo) => {
    setRowInfo(rowInfo);
    setModalType(type);
    setIsOpen(true);
  };


  const handleDeleteRow = async(row) => {

    const response = await fetch(`${API_URL}/deleteHomework/${row.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.status == "error") {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al momento de eliminar",
        icon: "error",
        button: "Cerrar",
        timer: "2500",
      });
    } else if (result.status == "success") {
      Swal.fire({
        title: "Correcto",
        text: "Eliminado correctamente",
        icon: "sucess",
        button: "Cerrar",
        timer: "2500",
      });
      handleHomeworksData();
    }
  };


  const handleMarkAsDone = async(row) => {

    const formData = new FormData();
    formData.append("titulo", row.titulo);
    formData.append("descripcion", row.descripcion);
    formData.append("fecha_creacion", row.fecha_creacion);
    formData.append("fecha_vencimiento", row.fecha_vencimiento);
    formData.append("etiquetas", row.etiquetas);
    formData.append("estado", 2); // finalizada

    const response = await fetch(`${API_URL}/updateHomework/${row.id}?_method=PUT`, {
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
        text: "Ha ocurrido un error",
        icon: "error",
        button: "Cerrar",
        timer: "2500",
      });
    } else if (result.status == "success") {
      Swal.fire({
        title: "Correcto",
        text: "Tarea completada exitosamente",
        icon: "sucess",
        button: "Cerrar",
        timer: "2500",
      });
      handleHomeworksData();
    }

  };



  return (
    <div className="mb-8 flex flex-col gap-12">
      <div>
        <Modal
          modalType={modalType}
          token={token}
          userInfo={userInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          rowInfo={rowInfo}
        />
      </div>

      <div className="mb-8 flex h-14 justify-center">
        <Button
          onClick={() => {
            handleOpenModal("save", null);
          }}
          className=" w-96 text-xl"
        >
          Create Task
        </Button>
      </div>

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tasks
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["task", "see", "edit", "delete", "complete"].map((el) => (
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

              { homerwoksInfo.length > 0 && homerwoksInfo.map(
                (row, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={row.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src="/img/logo_tdl.png" size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {row.titulo}
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <Tooltip>
                          <Avatar
                            src="/img/eye.png"
                            alt="See"
                            onClick={() => {
                              handleOpenModal("view", row);
                            }}
                            size="xs"
                            variant="circular"
                            className={`cursor-pointer border-2 border-white`}
                          />
                        </Tooltip>
                      </td>

                      <td className={className}>
                        <button
                          onClick={() => {
                            handleOpenModal("edit", row);
                          }}
                        >
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            <i className="fas fa-edit text-green-500" />
                          </Typography>
                        </button>
                      </td>

                      <td className={className}>
                        <div className="w-10/12">
                          <button 
                            onClick={() => {handleDeleteRow(row)}}
                            >
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600">
                              <i className="fas fa-trash text-red-500" />
                            </Typography>
                          </button>
                        </div>
                      </td>
                      <td className={className}>
                        <Menu placement="left-start">
                          <MenuHandler>
                            <button>
                              <i className={`fas fa-hand-pointer text-xl ${row.estado == 1 ? 'text-blue-700' : 'text-green-700'}  `} />
                            </button>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem onClick={() => {handleMarkAsDone(row)}}>Mark as completed</MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  );
                }
              )}

              {homerwoksInfo.length === 0 &&
                 <tr>
                    <td className=" text-center p-4" colSpan={5}>No Tasks yet</td>
                 </tr>
              }
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
