const is_heroku = process.env.IS_HEROKU || false;

let SERVER_URL = "http://localhost:8080";
if (is_heroku) {
  SERVER_URL = `https://idsp-mock-server.herokuapp.com`;
}
export default SERVER_URL;
