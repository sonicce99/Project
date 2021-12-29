import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

const Cart = ({ userId }) => {

  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await axios.post("/cart/cartList", {
        user_id: userId
      });
      setCartList(data.data.json);
      setLoading(false);
    })();
  }, [])

  const CartSum = (event) => {
    const dataList = event;
    const sum = cartList.filter((t, i) => dataList.includes(i)).reduce((acc, curr) => acc + Number(curr.l_price), 0);
    setSum(sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원");
  }

  if (loading) {
    return (
      <h2>로딩중</h2>
    )
  }

  const columns = [
    { field: 'id', hide: true, identity: true },
    {
      field: 'image',
      headerName: '제품',
      headerAlign: 'center',
      width: 175,
      editable: true,
      renderCell: (params) => <img src={params.value} width={150} alt='장바구니이미지' /> // renderCell will render the component
    },
    { field: 'title', headerName: '상품정보', headerAlign: 'center', width: 460 },
    { field: 'l_price', headerName: '가격', headerAlign: 'center', width: 130 },
    { field: 'ship', headerName: '배송비', headerAlign: 'center', width: 240 }
  ];


  const rows = cartList.map((t, i) => {
    const a = {
      id: i,
      image: t.image,
      title: t.title,
      l_price: t.l_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원",
      ship: "동수의 로그북은 언제나 무료 배송!"
    }
    return a
  })


  return (
    <div className='cartContainer'>
      <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rowHeight={170}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={CartSum}
        />
      </div>
      <div>
        <hr className='Sumborder' />
        <div className='sum'>
          <span className='sumText'>총 주문금액</span>
          <span className='sumTotal'>{sum}</span>
        </div>
        <hr className='Sumborder' />
      </div>
    </div>
  )
};

export default Cart;
