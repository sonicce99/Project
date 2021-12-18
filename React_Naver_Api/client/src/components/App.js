import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from "react-router-dom";
// import Naverlogo from "../img/"
import { FaSearch } from "react-icons/fa"
import Table from "./Table"
import Pagination from "./Pagination";

import Header from "../route/Header";
import Footer from "../route/Footer";

import Board from "./board/Board";
import Login from "./login/Login";
import SignIn from "./signIn/SignIn";
import Good from "./naver/Naver";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import History from "./history/History";

function App() {
  const [words, setWords] = useState([]); // 검색어 리스트
  const [products, setProducts] = useState([]); // 검색어 클릭시 상품 리스트
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(20);
  const [userId, setUserId] = useState("sonicce99@naver.com");

  const Search = (event) => {
    const keyword = event.target.value
    if (keyword.length === 0) setProducts([]);
    axios
      .get("/naver/api", {
        params: {  //localhost:3000?keyword=어쩌구어쩌구 로 요청함. 아마도?ㅋ
          keyword: keyword
        }
      })
      .then((res) => {
        setWords(res.data.items[0]);
      }).catch((error) => console.log(error))
  }
  const Naver = (para) => {
    setLoading(true);
    axios
      .get("/naver/shop", {
        params: {
          para: para
        }
      })
      .then((res) => {
        setProducts(res.data.items);
        setLoading(false);
      }).catch((error) => console.log(error))
  }

  const SearchedListClick = (event, para) => {
    event.preventDefault();
    Naver(para[0]);
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/naverApi" component={Good} />
      <Route exact path="/board" component={Board} />
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />

      <div className="inner">
        <img src={require("../img/naverlogo.png").default} className="logo" alt="네이버 로고" />
        <InputGroup className="mb-3" onChange={(event) => { Search(event) }} >
          <FormControl placeholder="검색어를 입력하세요" />
          <Button variant="success">검색</Button>{' '}
        </InputGroup>
        <div>
          <ul className={words.length === 0 ? "searchLists none" : "searchLists"}>
            {
              words.map((t, i) => {
                return (
                  <li className="liList" key={i} onClick={(event) => { SearchedListClick(event, words[i]) }}>
                    <FaSearch className="SearchImg" />
                    <h3 className="searchList">{t[0]}</h3>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div>
          {
            products.length === 0
              ? null
              : <Table products={currentPosts} loading={loading} />
          }
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
