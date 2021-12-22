import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ userId }) => {

  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.post("/cart/cartList", {
        user_id: userId
      });
      setCartList(data.data.json);
    })();
  }, [])

  return (
    <table width="1100">
      <thead>
        <tr>
          <th>제품</th>
          <th>상품명</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        {
          cartList.map((t, i) => {
            return (
              <tr className="cartList" key={i}>
                <td width="180">
                  <img className="cartListImg" src={t.image} alt="cartImg" />
                </td>
                <td>
                  <div>
                    <a href={t.link} target="_blank">
                      {t.title}
                    </a>
                  </div>
                </td>
                <td>
                  <div>{t.l_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"}</div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
};

export default Cart;
