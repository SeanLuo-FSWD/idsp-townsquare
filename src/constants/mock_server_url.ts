let MOCK_URL = "";

if (process.env.NODE_ENV != "production") {
  MOCK_URL = "http://localhost:8080";
} else {
  MOCK_URL = `https://comp2350-week6-sean-luo.herokuapp.com`;
}
export default MOCK_URL;
