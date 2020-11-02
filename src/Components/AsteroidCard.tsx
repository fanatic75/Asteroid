import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import React, { useEffect, useState } from "react";
import { AsteroidI } from "../types/asteroid";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "1.8em",
  },
});
const AsteroidCard = ({ asteroid }: { asteroid: AsteroidI }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    async function fetchFavorite() {
      const asteroids = await firebase
        .firestore()
        .collection("Favorites")
        .doc(firebase.auth().currentUser?.uid)
        .collection("Asteroids")
        .limit(10)
        .get();
      const id = asteroids.docs.find((doc) => {
        return doc.id === asteroid.id.toString();
      });
      if (id) setIsFavorite(true);
    }
    fetchFavorite();
  }, [isFavorite, asteroid]);
  const deleteFavorite = async () => {
    return await firebase
      .firestore()
      .collection("Favorites")
      .doc(firebase.auth().currentUser?.uid)
      .collection("Asteroids")
      .doc(asteroid.id.toString())
      .delete();
  };
  const addToFavorite = () => {
    return firebase
      .firestore()
      .collection("Favorites")
      .doc(firebase.auth().currentUser?.uid)
      .collection("Asteroids")
      .doc(asteroid.id.toString())
      .set({});
  };
  const handleFavorite = () => {
    if (isFavorite) deleteFavorite();
    else addToFavorite();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {asteroid.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Close Approach date : ${asteroid.close_approach_data[0].close_approach_date}`}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {`Relative Velocity : ${asteroid.close_approach_data[0].relative_velocity.kilometers_per_second}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {` Astronomical Miss Distance : ${asteroid.close_approach_data[0].miss_distance.astronomical}`}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {`  Miss Distance in Kilometers: ${asteroid.close_approach_data[0].miss_distance.kilometers}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`  Miss Distance in Lunar: ${asteroid.close_approach_data[0].miss_distance.lunar}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={handleFavorite} aria-label="add to favorites">
          <FavoriteIcon color={isFavorite ? "secondary" : "inherit"} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AsteroidCard;
