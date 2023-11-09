import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/data/env";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

import { useNavigate } from 'react-router-dom';


export function Home() {

  const [token, setToken] = useState("");
  const [homerwoksInfo, setHomeworksInfo] = useState([]);
  const [userData, setUserData] = useState(null);
  const [countCompleted, setCountCompleted] = useState(0);
  const [countPending, setCountPending] = useState(0);
  const [home, setHome] = useState(false);
  const navigate = useNavigate();






   useEffect(() => {
    const handleToken = async () => {

    const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
    // console.log(token);
    if(token == '' || token == null){
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate('/auth/sign-in');
      return;
    }


    try {
      const response = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
        const result =  await response.json();
        
        if(result.status == 'success'){
            setUserData(result.user);
            setHome(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          navigate('/auth/sign-in');
        }
      
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate('/auth/sign-in');
    }


    };

    handleToken();
    const intervalId = setInterval(handleToken, 14000);
    return () => { clearInterval(intervalId) };
    
  }, []);


  useEffect(() => {
    if (
      localStorage.getItem("token") !== undefined &&
      localStorage.getItem("token") != null
    ) {
      setToken(localStorage.getItem("token"));
      setUserData(JSON.parse(localStorage.getItem("userInfo")));
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
      const newData = result.data.filter((data) => data.asignado_a == userData.id);


      let countF = 0;
      let countP = 0;

      // console.log(result);
      // console.log(userData);

      for (let i = 0; i < newData.length; i++) {
        const element = newData[i];

        if(element.estado == 1)
          countP++;
        else 
          countF++;
      }

      setCountCompleted(countF);
      setCountPending(countP);
      setHomeworksInfo(result.data);
    }
  };



  useEffect(() => {
    if (token !== "" && token !== null) {
      handleHomeworksData();
    }
  }, [token]);




  if(home == true){
    return (
      <div className="mt-12">

        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              title={props.color == 'green'? `${countCompleted} Completed Tasks` : `${countPending} Pending Tasks`}
              {...props}          
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600">
                </Typography>
              }
            />
          ))}
        </div>




        <div className="mb-4 grid grid-cols-2 gap-6 xl:grid-cols-1">
          <Card className="overflow-hidden xl:col-span-2">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Tasks List
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                  <strong>{homerwoksInfo.length} Tasks</strong> this month
                </Typography>
              </div>
              
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["tasks"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
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
                          <Avatar src="/img/logo.png" size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {row.titulo}
                          </Typography>
                        </div>
                      </td>

                      {/* <td className={className}>
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
                      </td> */}

                      {/* <td className={className}>
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
                      </td> */}

                      {/* <td className={className}>
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
                      </td> */}
                      {/* <td className={className}>
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
                      </td> */}
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
          {/* <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Options
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <ArrowUpIcon
                  strokeWidth={3}
                  className="h-3.5 w-3.5 text-green-500"
                />
                <strong>24%</strong> this month
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {ordersOverviewData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                        key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                )
              )}
            </CardBody>
          </Card> */}
        </div>
      </div>
    );
  }
}

export default Home;
