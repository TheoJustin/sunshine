import React, { useEffect, useState } from "react";
import { useAuth } from "../../use-auth-client";
import { useNavigate } from "react-router-dom";
import ChakraTemplate from "../../templates/ChakraTemplate";
import { Button, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { uploadImage } from "../../../../config/cloudinary";
import profilePlaceholder from "../../../../../assets/profilePlaceholder.jpg";
import Currency from "../../pages/Currency";

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
  const { user, logout, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const handleRegister = () => {
    setIsUpdating(true);
    // sunshine_backend.tryFuzz();
    async function tryRegister() {
      if (data.err) {
        const registerFlag = await user.register(name, email, dob, image);
        console.log(registerFlag);
        if (registerFlag == true) {
          setIsUpdating(false);
          setAlreadyRegistered(true);
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
        }
      }
    }
    tryRegister();
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
        <div
          className="relative flex flex-col top-[19vh] gap-3 text-center items-center bg-slate-50 w-[30vw] p-3 rounded-xl"
          // style={{
          //   backgroundColor: "#2EC4B6",
          //   padding: "20px",
          //   borderRadius: "20px",
          //   background: "rgba(255, 255, 255, 0.2)",
          //   backdropFilter: "blur(30px)",
          //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          //   border: "1px solid rgba(255, 255, 255, 0.3)",
          // }}
        >
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
              focusBorderColor="orange.400"
              // variant="filled"
              placeholder="Name"
              size="md"
              onChange={(e) => setName(e.target.value)}
              value={name}
              // style={{
              //   background: "rgba(255, 255, 255, 0.2)",
              //   backdropFilter: "blur(30px)",
              //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              //   borderRadius: "15px",
              // }}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14 font-bold">Email</div>
            <Input
              focusBorderColor="orange.400"
              // variant="filled"
              placeholder="Email"
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              // style={{
              //   background: "rgba(255, 255, 255, 0.2)",
              //   backdropFilter: "blur(30px)",
              //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              //   borderRadius: "15px",
              // }}
            />
          </div>
          <div className="flex gap-5 text-lg container items-center">
            <div className="min-w-14 font-bold">DOB</div>
            <Input
              focusBorderColor="orange.400"
              // variant="filled"
              placeholder="Date of Birth"
              size="md"
              type="date"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              // style={{
              //   background: "rgba(255, 255, 255, 0.2)",
              //   backdropFilter: "blur(30px)",
              //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              //   borderRadius: "15px",
              // }}
            />
          </div>
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
          {alreadyRegistered ? <Currency></Currency> : <></>}
        </div>
      </div>
    </ChakraTemplate>
  );
  {
    /* <div className="container">
        <h1>Internet Identity Client</h1>
        <h2>You are authenticated!</h2>
        <p>To see how a canister views you, click this button!</p>
        <button
          type="button"
          id="whoamiButton"
          className="primary"
          onClick={handleClick}
        >
          Who am I?
        </button>
        <input
          type="text"
          readOnly
          id="whoami"
          value={result}
          placeholder="your Identity"
          style={whoamiStyles}
        /> */
  }
  {
    /* <p>{result}</p> */
  }
  {
    /* <button id="logout" onClick={logout}>
          log out
        </button>
        <div>
          <div id="regisForm">
            <label htmlFor="username">Name: </label>
            <input
              id="username"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="dob">Date of Birth: </label>
            <input
              id="dob"
              type="date"
              onChange={(event) => setDOB(event.target.value)}
            />
            <label htmlFor="email">E-mail Address: </label>
            <input
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={handleRegister}>Add Data</button>
          </div>
          {currentName}
        </div>
      </div> */
  }
}

export default LoggedIn;
