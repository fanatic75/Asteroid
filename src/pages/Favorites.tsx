import { CircularProgress, Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AsteroidCard from "../Components/AsteroidCard";
import FavoriteBanner from "../Components/FavoriteBanner";
import Layout from "../Components/Layout";
import isLoggedIn, { apiKey, baseURL, searchByIDURL } from "../helpers/helpers";
import { AsteroidI } from "../types/asteroid";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
export default function Favorites() {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn()) history.push("/");
  }, [history]);
  const fetchAsteroids = useCallback(async () => {
    setIsLoading(true);
    let tempAsteroids: Array<AsteroidI> = [];
    const asteroidIDs = await firebase
      .firestore()
      .collection("Favorites")
      .doc(firebase.auth().currentUser?.uid)
      .collection("Asteroids")
      .limit(10)
      .get();
    tempAsteroids = await Promise.all(
      asteroidIDs.docs.map(async (doc) => {
    
        const url = `${baseURL}${searchByIDURL}${doc.id}?api_key=${apiKey}`;
        try {
          const response = await fetch(url);
          if(response.status!==200)
            return ;
          const json = await response.json();
          return json;
        } catch (ex) {
          return ;
        }
      })
    );
    tempAsteroids = tempAsteroids.filter(n=>n!==undefined);
    setIsLoading(false);
    setAsteroids(tempAsteroids);
  },[]);
  const [asteroids, setAsteroids] = useState<AsteroidI[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    
    isLoggedIn()&&fetchAsteroids();
  },[fetchAsteroids]);
  return (
    <>
      {isLoggedIn() && (
        <Layout>
          <FavoriteBanner />
          {isLoading ? (
            <Grid container justify="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <Grid container>
              {asteroids !== undefined &&
                asteroids.map((asteroid) => {
                  return (
                    <Grid key={asteroid.id} item>
                      <AsteroidCard asteroid={asteroid} />
                    </Grid>
                  );
                })}
            </Grid>
          )}
        </Layout>
      )}
    </>
  );
}
