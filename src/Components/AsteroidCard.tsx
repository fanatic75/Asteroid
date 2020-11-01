import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

import React from "react";
import { AsteroidI } from "../types/asteroid";
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "1.8em",
  },
});
const AsteroidCard = ({asteroid}:{asteroid:AsteroidI}) => {
  const classes = useStyles();

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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color={asteroid.isFavorite?"secondary":"inherit"} />
        </IconButton>
        
      </CardActions>
    </Card>
  );
};

export default AsteroidCard;
