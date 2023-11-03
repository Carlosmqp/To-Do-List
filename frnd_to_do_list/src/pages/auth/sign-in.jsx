import { Link } from "react-router-dom";
import { API_URL } from "@/data/env";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Dashboard, Auth } from "@/layouts";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignIn() {


  const navigate = useNavigate();


  // const [formData, setFormData] = useState({ email: "", password: "" });

  const [emailField,setEmailField] = useState('');
  const [passwordField,setPasswordField] = useState('');


  const handleSignIn = async () => {
    try {

      const formData = new FormData();

      formData.append('email', emailField);
      formData.append('password', passwordField);



      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        body: formData
    });

      const result =  await response.json();
      // console.log(result.authorisation.token);





      if(result.status == 'error'){


      }else if(result.status == 'success') {
        const token = result.authorisation.token;
        const userInfo = result.user;
        // permite crear una nueva variable local
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', userInfo);
        navigate('/dashboard/home');
      }



      // esta funcion permite eliminar una variable local previamente creada
      // localStorage.removeItem();

      // permite obtener alguna variable local previamente creada
      // localStorage.getItem('');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-[#020617]" />
      <div className="container mx-auto p-4">
        <img
          src="../public/img/1.png"
          className="absolute inset-0 z-0 mt-28 ml-28 h-[500px] w-[500px] object-cover"
        />
        <Card className="absolute top-2/4 left-2/4 ml-80 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg" value={emailField} onChange={(event) => setEmailField(event.target.value)}/>
            <Input type="password" label="Password" size="lg" value={passwordField} onChange={(event) => setPasswordField(event.target.value)}/>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me"/>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            
 
            <Button
            onClick={() => { handleSignIn()}}
            type="submit"
            variant="gradient" 
            color="gray" 
            fullWidth>
              Sign In
            </Button>
        


            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="gray"
                  className="ml-1 font-bold">
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
