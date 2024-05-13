import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { useNavigate } from "react-router-dom";
import ChakraTemplate from "../../templates/ChakraTemplate";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { uploadImage } from "../../../../config/cloudinary";
import profilePlaceholder from "../../../../../assets/profilePlaceholder.jpg";
import Currency from "../../pages/Currency";
import Snackbar from "../Snackbar";
import { IoMdAlert } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

const imageContainerStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  overflow: "hidden",
  cursor: "pointer",
};

function LoggedIn() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [money, setMoney] = useState("-");
  const { user, principal, logout, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUser", user],
    queryFn: getUser,
  });
  const toast = useToast();

  const handleRegister = () => {
    setIsUpdating(true);
    // sunshine_backend.tryFuzz();
    async function tryRegister() {
      console.log(principal);
      if (!validateUser()) {
        setIsUpdating(false);
        return;
      }
      if (data.err) {
        // validasi
        const registerFlag = await user.register(
          principal,
          name,
          email,
          dob,
          image
        );
        console.log(registerFlag);
        if (registerFlag == true) {
          setIsUpdating(false);
          setAlreadyRegistered(true);
          toast({
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
            render: () => (
              <Snackbar
                bgColor="bg-green-600"
                icon={<FaCircleCheck color="white" />}
                title="Success"
                description="Your account has been registered!"
              />
            ),
          });
        }
      } else {
        const updateFlag = await user.updateUser(
          data.ok.internet_identity,
          name,
          email,
          dob,
          image
        );

        setAlreadyRegistered(true);
        if (updateFlag == true) {
          setIsUpdating(false);
          toast({
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
            render: () => (
              <Snackbar
                bgColor="bg-green-600"
                icon={<FaCircleCheck color="white" />}
                title="Success"
                description="Your account has been updated!"
              />
            ),
          });
        }
      }
    }
    tryRegister();
  };

  const validateUser = () => {
    if (name === "") {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your name!"
          />
        ),
      });
      return false;
    }
    if (email === "") {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your email!"
          />
        ),
      });
      return false;
    }
    if (dob === "") {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your date of birth!"
          />
        ),
      });
      return false;
    }
    // validate name length
    if (name.length < 5 || name.length > 25) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Name error"
            description="Name must be between 5-25 characters long!"
          />
        ),
      });
      return false;
    }

    const nameRegex = /^[A-Za-z0-9]{5,}$/;

    if (!nameRegex.test(name)) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Name error"
            description="Name cannot contain symbols"
          />
        ),
      });
      return false;
    }
    const emailRegex = /^[\w.-]+@[A-Za-z0-9.-]+\.com$/;
    if (!emailRegex.test(email)) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Email error"
            description="Email must be valid! (must ends with .com and contain @)"
          />
        ),
      });
      return false;
    }

    let inputtedDOB = new Date(dob);
    let today = new Date();

    let yearDiff = today.getFullYear() - inputtedDOB.getFullYear();
    let monthDiff = today.getMonth() - inputtedDOB.getMonth();
    let dateDiff = today.getDate() - inputtedDOB.getDate();

    if (yearDiff <= 0) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="DOB error"
            description="Date must be valid!"
          />
        ),
      });
      return false;
    } else if (monthDiff <= 0 && !(monthDiff === 0 && dateDiff >= 0)) {
      yearDiff = yearDiff - 1;
    }

    if (yearDiff < 13) {
      toast({
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="DOB error"
            description="Age must be older than 13!"
          />
        ),
      });
      return false;
    }

    return true;
  };

  const handleImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validatedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (validatedFileTypes.includes(file.type)) {
        try {
          const url = await uploadImage(file, setImageLoading);
          if (url) {
            setImage(url);
          } else {
            throw new Error("Failed to upload image.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        e.target.value = "";
      }
      console.log(image);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (data.ok) {
        setName(data.ok.name);
        setEmail(data.ok.email);
        setDob(data.ok.birth_date);
        setImage(data.ok.profileUrl);
        setMoney(data.ok.money.toString());
        setAlreadyRegistered(true);
      } else {
        setAlreadyRegistered(false);
      }
    }
  }, [data, isLoading]);

  if (isLoading) return <div>loading</div>;

  async function handleImageClick() {
    document.getElementById("fileInput").click();
  }

  return (
    <ChakraTemplate>
      <div className="flex justify-center items-center">
        <div className="relative flex flex-col top-[20vh] gap-3 text-center items-center bg-slate-50 w-[30vw] rounded-xl bg-white/70 shadow-xl backdrop-blur-sm p-5">
          <div className="text-orange-custom font-bold text-3xl">
            Your Profile
          </div>
          <div
            style={imageContainerStyle}
            onClick={() => {
              handleImageClick();
            }}
          >
            <input
              type="file"
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
              onChange={(e) => {
                handleImage(e);
              }}
            />
            <img
              id="profileImage"
              src={image === "" ? profilePlaceholder : image}
              alt="Upload a file"
              className="object-cover w-24 h-24 rounded-full"
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14 font-bold">Name</div>
            <Input
              className="bg-white/40 rounded-2xl backdrop-blur-sm"
              focusBorderColor="orange.400"
              placeholder="Name"
              size="md"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14 font-bold">Email</div>
            <Input
              className="bg-white/40 rounded-2xl backdrop-blur-sm"
              focusBorderColor="orange.400"
              placeholder="Email"
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14 font-bold">DOB</div>
            <Input
              className="bg-white/40 rounded-2xl backdrop-blur-sm"
              focusBorderColor="orange.400"
              // variant="filled"
              placeholder="Date of Birth"
              size="md"
              type="date"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center justify-center">
            <div className="min-w-14 font-bold">{`Balance: ${money}`}</div>
          </div>
          <div className="w-[80%] flex space-x-5 justify-items-stretch">
            {!isUpdating ? (
              <Button
                size="md"
                variant="solid"
                className="w-1/2 bg-orange-custom hover:bg-darkorange-custom"
                color="white"
                onClick={handleRegister}
              >
                {alreadyRegistered ? "Update Data" : "Register"}
              </Button>
            ) : (
              <>
                <Button
                  size="md"
                  variant="solid"
                  className="w-1/2 bg-orange-custom hover:bg-darkorange-custom"
                  color="white"
                  isLoading
                />
              </>
            )}

            <Button
              colorScheme="red"
              size="md"
              variant="solid"
              className="w-1/2"
              onClick={() => {
                logout();
                window.location.reload();
              }}
            >
              Log Out
            </Button>
          </div>
          {alreadyRegistered ? <Currency></Currency> : <></>}
        </div>
      </div>
    </ChakraTemplate>
  );
}

export default LoggedIn;
