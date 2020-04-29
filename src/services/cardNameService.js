import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV !== "development" ? "/api" : "//localhost:5000/api";

function createGame() {
  return axios
    .get(BASE_URL + "/creategame")
    .then((res) => {
      return res.data;
    })
    .then((data) => data.gameId);
}

export default {
  createGame,
};
