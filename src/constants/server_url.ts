let SERVER_URL = "";

if (process.env.NODE_ENV != "production") {
  SERVER_URL = "http://localhost:8080";
} else {
  SERVER_URL = `https://comp2350-week6-sean-luo.herokuapp.com/`;
}
export default SERVER_URL;
