import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";
export const Home = () => {
  const { store, actions } = useContext(Context);
  let history = useHistory();
  console.log(store.user);
  return (
    <div className="text-center mt-5">
      {store.user ? (
        <div>
          <h1 className="display-1">SUCCESSFULLY logged IN</h1>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
};
