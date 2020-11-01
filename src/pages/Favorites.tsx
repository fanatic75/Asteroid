import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Components/Layout";
import isLoggedIn from "../helpers/helpers";
export default function Favorites() {
  const history = useHistory();
  
  useEffect(() => {
    if (!isLoggedIn()) history.push("/");
  }, [history]);
  return (
    <>
     { isLoggedIn()&&<Layout >

      </Layout>}
    </>
  );
}
