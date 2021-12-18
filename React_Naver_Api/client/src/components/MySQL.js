import axios from "axios";

const MySQL = (event, payload) => {
  axios.get("/module/mysql", {
    params: {
      productId: payload.productId,
      title: payload.title,
      lowPrice: payload.lowPrice
    }
  })
    .then((res) => {
      event.preventDefault();
      console.log(res)
    }).catch((error) => console.log(error))
}

export default MySQL;