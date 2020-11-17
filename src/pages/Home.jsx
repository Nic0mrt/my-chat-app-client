import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useEffect } from "react";
import { Checkbox } from "@material-ui/core";

function Home() {
  const history = useHistory();
  const context = useContext(AuthContext);

  useEffect(() => {
    const checkIfUser = async () => {
      if (context.userData.user !== null) {
        console.log(context.userData);
      } else {
        history.push("/login");
      }
    };
    checkIfUser();
  }, []);

  return <div>home</div>;
}
export default Home;
