import Axios from "axios";
export const  Axios=()=> {
  Axios({
    method: "GET",
    url: "http://localhost:3001/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  });
}