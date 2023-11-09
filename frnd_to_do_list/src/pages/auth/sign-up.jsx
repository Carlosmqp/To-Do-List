import { Link } from "react-router-dom";
import { API_URL } from "@/data/env";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export function SignUp() {

  const navigate = useNavigate();


  // const [formData, setFormData] = useState({ email: "", password: "" });

  const [nameField,setNameField] = useState('');
  const [emailField,setEmailField] = useState('');
  const [passwordField,setPasswordField] = useState('');
  const [descriptionField,setDescriptionField] = useState('');
  const [phoneField,setPhoneField] = useState('');
  const [rowInfo, setRowInfo] = useState(null);


  const handleSignUp = async () => {
    try {

      const formData = new FormData();

      formData.append('name', nameField);
      formData.append('email', emailField);
      formData.append('password', passwordField);
      formData.append('description', descriptionField);
      formData.append('phone', phoneField);



      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        body: formData
    });

      const result =  await response.json();
      // console.log(result.authorisation.token);

      if(result.status == 'error'){

      Swal.fire({
        title:'Error',
        text:'Usuario o Contraseña incorrectos',
        icon:'error',
        button: 'Cerrar',
        timer:'3000'
      });

      }else if(result.status == 'success') {

        Swal.fire({
          title:'Correcto',
          text:'Logueado correctamente.',
          icon:'sucess',
          button: 'Cerrar',
          timer:'3000'
        });

        const token = result.authorisation.token;
        const userInfo = result.user;
        // permite crear una nueva variable local
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', userInfo);
        navigate('/auth/sign-in');
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
        src="../public/img/2.png"
        className="absolute inset-0 z-0 mt-28 ml-28 h-[500px] w-[500px] object-cover"
      />
        <Card className="absolute ml-80 top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" value={nameField} onChange={(event) => setNameField(event.target.value)}/>
            <Textarea label="Description" size="lg" value={descriptionField} onChange={(event) => setDescriptionField(event.target.value)}></Textarea>
            <Input label="Phone" size="lg" value={phoneField} onChange={(event) => setPhoneField(event.target.value)}/>
            <Input type="email" label="Email" size="lg" value={emailField} onChange={(event) => setEmailField(event.target.value)}/>
            <Input type="password" label="Password" size="lg" value={passwordField} onChange={(event) => setPasswordField(event.target.value)}/>
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button 
            onClick={() => { handleSignUp()}}
            variant="gradient" 
            color="gray" 
            fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="gray"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
