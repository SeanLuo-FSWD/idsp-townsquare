let SERVER_URL = "";

if (process.env.NODE_ENV != "production") {
  SERVER_URL = "http://localhost:8080";
} else {
  SERVER_URL = `https://idsp-mock-server.herokuapp.com`;
}
export default SERVER_URL;
