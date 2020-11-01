import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../Components/Layout";
import isLoggedIn, {
  apiKey,
  baseURL,
  feedAPIURL,
  formatDate,
  searchByIDURL,
} from "../helpers/helpers";
import AsteroidCard from "../Components/AsteroidCard";
import { AsteroidI } from "../types/asteroid";
import DashboardBanner from "../Components/DashboardBanner";
import { useDebouncedSearch } from "../helpers/useDebouncer";
export default function Dashboard() {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const {
    inputText: searchID,
    setInputText: setSearchID,
    searchResults: specificAsteroid,
  } = useDebouncedSearch((text) => handleSearch(text));
  const [closestDates, setClosestDates] = React.useState<Array<string>>([]);
  const handleStartDate = (date: Date | null) => {
    setStartDate(date);
  };
  const handleEndDate = (date: Date | null) => {
    setEndDate(date);
  };
  const handleSearch = async (value: string) => {
    const url = `${baseURL}${searchByIDURL}${value}?api_key=${apiKey}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return [json];
    } catch (ex) {
      return [];
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) history.push("/");
  }, [history]);

  const [asteroids, setAsteroids] = React.useState();
  useEffect(() => {
    async function fetchAsteroid() {
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        alert("End Date cannot be before start date");
        return;
      }
      setIsLoading(true);
      const url = `${baseURL}${feedAPIURL}?start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}&detailed=false&api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (response.status === 400) {
          setIsLoading(false);
          alert("Date range should be max 7 days for 1 Query");
          return;
        }
        const json = await response.json();
        let arr = Object.keys(json["near_earth_objects"]);
        arr.sort(function (a, b) {
          return (
            Math.abs(Date.now() - (new Date(a) as any)) -
            Math.abs(Date.now() - (new Date(b) as any))
          );
        });
        setClosestDates(arr);
        setAsteroids(json["near_earth_objects"]);
        setIsLoading(false);
      } catch (ex) {
        console.log(ex);
        setIsLoading(false);
      }
    }

    isLoggedIn() && fetchAsteroid();
  }, [startDate, endDate]);
  let numberOfAsteroidRendered = 0;
  return (
    <>
      {isLoggedIn() && (
        <Layout searchID={searchID} setSearchID={setSearchID}>
          <DashboardBanner
            startDate={startDate}
            endDate={endDate}
            handleEndDate={handleEndDate}
            handleStartDate={handleStartDate}
          />

          {isLoading || specificAsteroid.loading ? (
            <Grid container justify="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            <div className={"astContainer"}>
              <Grid container>
                {specificAsteroid.result.length > 0 && (
                  <Grid item>
                    <AsteroidCard asteroid={specificAsteroid.result[0]} />
                  </Grid>
                )}
                {searchID.length > 0 &&
                  specificAsteroid.result.length === 0 && (
                    <div style={{ margin: "auto" }}>No Asteroid Found</div>
                  )}
                {asteroids !== undefined &&
                  searchID.length === 0 &&
                  specificAsteroid.result.length === 0 &&
                  closestDates.length > 0 &&
                  closestDates.map((date) =>
                    ((asteroids?.[date] as unknown) as Array<AsteroidI>).map(
                      (asteroid: AsteroidI) => {
                        if (numberOfAsteroidRendered >= 10) return null;
                        asteroid.isFavorite = false;
                        numberOfAsteroidRendered++;
                        return (
                          <Grid key={asteroid.id} item>
                            <AsteroidCard asteroid={asteroid} />
                          </Grid>
                        );
                      }
                    )
                  )}
              </Grid>
            </div>
          )}
        </Layout>
      )}
    </>
  );
}
