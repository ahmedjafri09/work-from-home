import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "../axios/axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [gotoBlog, setGotoBlog] = useState(false);

  useEffect(async () => {
    const profile = await Axios.get("auth/me");
    setProfile(profile.data.user);
  }, []);

  const blogs = () => {
    setGotoBlog(true);
  };

  return (
    <div>
      <p>name: {`${profile.firstName} ${profile.lastName}`}</p>
      <p>username: {profile.username}</p>
      <p>email: {profile.email}</p>
      <Button onClick={blogs}>Blogs</Button>
      {gotoBlog ? <Redirect to={`/`} /> : null}
    </div>
  );
};

export default Profile;
