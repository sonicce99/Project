import React, { useState } from "react";
import MySQL from "./MySQL"
import WantToBuy from "./cart/WantToBuy";
import CartModal from "./cart/CartModal";
import { BsYoutube } from "react-icons/bs"
import Image from 'react-bootstrap/Image'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Table = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (props.loading) {
    return (
      // Loading
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div className="Myimg_div">
              <Image className="Myimg" src="Mylogo.jpg" alt="동수의 로그북" roundedCircle />
              <h2>Loading...</h2>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <table width="1100">
        <thead>
          <tr>
            <th className="tableHead" width="180">제품</th>
            <th width="590">상품명</th>
            <th className="tableHead" width="110">브랜드</th>
            <th className="tableHead" width="110">최저가</th>
            <th className="tableHead" width="110">구매</th>
            <th className="tableHead" width="110">장바구니 담기</th>
          </tr>
        </thead>
        <tbody>
          {
            props.products.map((t, i) => {
              let payload = {
                productId: t.productId,
                title: t.title,
                lowPrice: t.lprice
              }
              return (
                <tr className="SearchedProductList" key={i}>
                  <td width="180">
                    <img className="imgs" src={t.image} alt="img" />
                  </td>
                  <td className="productNamePart">
                    <div className="titles">
                      <a className="atag" href={t.link} target="_blank">
                        {t.title}
                      </a>
                    </div>
                    <div className="category">{t.category1} &gt; {t.category2} &gt; {t.category3}</div>
                    <div className="youtube_div">
                      <a className="youtube" href="https://www.youtube.com/channel/UCqa4CnlUu--_X0lXWURBNEQ" target="_blank">
                        <BsYoutube className="BsYoutube" />
                        <span>동수의 로그북 보러가기</span>
                      </a>
                    </div>
                  </td>
                  <td className="tableSet">
                    {t.brand}
                  </td>
                  <td className="tableSet">
                    <div className="price">{t.lprice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원"}</div>
                  </td>
                  <td className="tableSet">
                    <Button onClick={(event) => MySQL(event, payload)}>구매</Button>
                  </td>
                  <td className="tableSet">
                    <Button onClick={() => { WantToBuy(t, props.userId); setIsOpen(true); }}>장바구니</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="Modal">
        {
          isOpen === true
            ? <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
            : null
        }
      </div>
    </>
  )
}

export default Table;