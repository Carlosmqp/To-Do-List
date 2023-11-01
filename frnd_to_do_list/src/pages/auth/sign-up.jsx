import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/data/env";
import { useEffect,useState } from "react";
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

export function SignUp() {
  const loginUrl = `${API_URL}/login`;

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignIn = async () => {
    try {
      const response = await axios.post(loginUrl, formData);
      const token = response.data.token;

      localStorage.setItem('token', token);
      // Almacena el token en el almacenamiento local o en cookies
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
            <Input label="Name" size="lg" />
            <Input type="email" label="Email" size="lg" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            <Input type="password" label="Password" size="lg" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onPress={handleSignIn} variant="gradient" color="gray" fullWidth>
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
