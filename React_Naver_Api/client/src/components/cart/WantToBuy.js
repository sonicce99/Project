import axios from "axios";

const WantToBuy = async (product, userId) => {

  // 상품 등록 
  const data = await axios.post("/cart/insert", {
    brand: product.brand,
    category1: product.category1,
    category2: product.category2,
    category3: product.category3,
    category4: product.category4,
    h_price: product.hprice,
    image: product.image,
    l_price: product.lprice,
    link: product.link,
    maker: product.maker,
    mall_name: product.mallName,
    product_count: 1,
    product_id: product.productId,
    product_type: product.product_type,
    title: product.title
  });
  console.log(product)
  console.log(data);

  //사용자 장바구니 아이디 가져오기
  const data2 = await axios.post("/cart/userId", {
    user_id: userId
  });
  const cart_id = data2.data.json[0]["cart_id"];

  //장바구니 아이디 가져오면 사용자 장바구니에 상품 목록 저장
  const data3 = await axios.post("/cart/save", {
    cart_id: cart_id,
    product_id: product.productId,
    user_id: userId
  });
  console.log(data3);
}

export default WantToBuy;