import firebase from "firebase/app";
const isLoggedIn = () => {
  const user = firebase.auth().currentUser;
  if (user) return true;
  return false;
};

export default isLoggedIn;

export const apiKey = process.env.REACT_APP_API_KEY;
export const baseURL = "https://api.nasa.gov/neo/rest/v1/";
export const feedAPIURL = "feed";
export const searchByIDURL = "neo/"

export function formatDate(date: any) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}


  