import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuthContext";
import { UserLogIn } from "@/types";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
type Props = {};
type IlogInProps = {};

const initialState = {
  email: "",
  password: "",
};
const Login: React.FunctionComponent<IlogInProps> = ({}: Props) => {
  const [userLogInInfo, setUserInfo] = useState<UserLogIn>(initialState);
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("the user info is", userLogInInfo);
      await logIn(userLogInInfo.email, userLogInInfo.password);
      navigate("/");
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div className="flex w-full h-[100vh] bg-blue-950 justify-center items-center">
      <Card className="h-[70%] w-[20%]">
        <Form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log In </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button onClick={handleGoogleSignIn} variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userLogInInfo, email: e.target.value })
                }
                id="email"
                value={userLogInInfo.email}
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={userLogInInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserInfo({ ...userLogInInfo, password: e.target.value })
                }
                id="password"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-y-4">
            <Button type={"submit"} className="w-full">
              Log in
            </Button>
            <NavLink to={"/signup"}>Dont have an Account please Signup</NavLink>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
