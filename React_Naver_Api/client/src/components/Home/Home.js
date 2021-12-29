import React, { useState } from "react";
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"
import Table from "../Table"
import Pagination from "../Pagination";
import axios from "axios";
import Category from "./Category"

const Home = ({ userId }) => {

  const [value, setValue] = useState(""); // input Value
  const [words, setWords] = useState([]); // 검색어 리스트
  const [products, setProducts] = useState([]); // 검색어 클릭시 상품 리스트
  const [showSearchList, setShowSearchList] = useState(false); // 검색어 리스트 보여줄지 말지 결정하는 state
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(20);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  const Search = (event) => {
    event.preventDefault();
    const keyword = event.target.value
    setValue(keyword);
    setShowSearchList(true);
    if (keyword.length === 0) {
      setProducts([]);
    }
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

  const SearchedListClick = (event, para) => {
    event.preventDefault();
    setValue(para[0]);
    setLoading(true);
    axios
      .get("/naver/shop", {
        params: {
          para: para[0]
        }
      })
      .then((res) => {
        setProducts(res.data.items);
        setLoading(false);
        setShowSearchList(false);
      }).catch((error) => console.log(error))
  }

  return (
    <>
      <Category setProducts={setProducts} />
      <InputGroup className="mb-3" >
        <FormControl placeholder="검색어를 입력하세요" value={value} onChange={(event) => { Search(event) }} />
        <Button variant="success">검색</Button>{' '}
      </InputGroup>
      {
        showSearchList === true
          ?
          <div className="SearchBar">
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
          : null
      }
      <div>
        {
          products.length === 0
            ? null
            : <Table products={currentPosts} loading={loading} userId={userId} />
        }
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Home;
