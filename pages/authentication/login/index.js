import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import appiStadiumLogo from "../../../assets/img/AppiStadiumLogo.png";
import ButtonsAS from "../../../components/ButtonAS";
import InputAS from "../../../components/InputAS";
import * as yup from "yup";
import { authContext } from "../../../context/myContext";
import { useFormik } from "formik";
import { checkAccessToken, userAuthentication } from "../../../config/apis";
import { paths } from "../../../Utils/constants";
import { Form, Input } from "antd";
import ButtonAS from "../../../components/ButtonAS";
import Link from "next/link";
import Loader from "../../../components/Loader";

const body = {
  username: "string",
  password: "string",
};

const Login = () => {
  const router = useRouter();
  const { setUser } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [error, isError] = useState(false);
  const formik = useFormik({
    initialValues: body,
    onSubmit: (values) => {
      setIsLoading(true);
      userAuthentication(values)
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          localStorage.setItem("access", res.data.authToken.access);
          localStorage.setItem("refresh", res.data.authToken.refresh);
          setUser(res.data.user);
          setIsLoading(true)
          router.push(paths.HOME);
        })
        .catch(() => {
          setMessage("error authentication");
          isError(true);
          setIsLoading(false);
        });
    },

    validationSchema: yup.object({
      username: yup.string().trim().required("username is required"),
      password: yup.string().trim().required("password is required"),
    }),
  });

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
      router.push(paths.HOME);
      }, 1000);

    } else {
      setIsLoggedIn(false)
      setIsLoading(false)
    }
  }, []);

  console.log("login");


  if (isLoggedIn || isLoading) return <Loader />;

  return (
    <div className=" flex flex-row w-screen h-screen ">
      <div className="w-1/2  relative">
        <Image src={appiStadiumLogo} layout="fill" alt={"logo"} />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className=" space-y-16 w-1/2 ">
          <div className="text-center">
            <div className="font-semibold text-3xl">Se Connecter</div>
            <div className="text-lg">
              Entrer votre username et votre password pour se connecter
            </div>
          </div>
          {/* form  */}
          <Form
            initialValues={body}
            className=" space-y-3 "
            onFinish={formik.handleSubmit}
          >
            <InputAS
              type="text"
              placeholder="username"
              name={"username"}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            />

            <InputAS
              type="password"
              placeholder="password"
              name={"password"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />

            <ButtonAS
              className="w-full h-12 bg-black 
                  text-white
                  font-semibold rounded-lg"
              type="submit"
            >
              Se connecter
            </ButtonAS>
          </Form>

          <div className="flex flex-col text-center space-y-2">
            <div className="text-gray-400">
              Vous avez oublié votre mot de passe ?
            </div>
            <Link href={paths.HOME}>
              <div className="text-black  font-bold">Mot de pass oublié</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
