import { ButtonGroup, DropdownButton, Button, Fade, Dropdown } from 'react-bootstrap'
import React, { useState } from 'react';
import axios from "axios"

const Category = ({ setProducts }) => {
  const [open, setOpen] = useState(false);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  const [category1_Word, setCategory1_Word] = useState("");
  const [category2_Word, setCategory2_Word] = useState("");
  const [category3_Word, setCategory3_Word] = useState("");

  const Category_Pick = async (event, word, index) => {
    event.preventDefault();
    if (index === 1) {
      try {
        setCategory1_Word(word);
        const data = await axios.post("/category/sort", {
          query: word,
          display: 50
        })
        console.log(data.data.items);
        setProducts(data.data.items);
      } catch (error) {
        console.log(error)
      }
    }
    else if (index === 2) {
      try {
        setCategory2_Word(word);
        const data = await axios.post("/category/sort", {
          query: word,
          display: 50
        })
        console.log(data.data.items);
        setProducts(data.data.items);
      } catch (error) {
        console.log(error)
      }
    }
    else {
      try {
        setCategory3_Word(word);
        const data = await axios.post("/category/sort", {
          query: word,
          display: 50
        })
        console.log(data.data.items);
        setProducts(data.data.items);
      } catch (error) {
        console.log(error)
      }
    }
  }

  const EachCategory = async (event, index) => {
    event.preventDefault();
    if (index === 1) {
      try {
        const data = await axios.post("/category", {
          num: 1
        })
        setCategory1(data.data.json);
      } catch (error) {
        console.log(error)
      }
    }
    else if (index === 2) {
      try {
        const data = await axios.post("/category", {
          num: 2,
          category1: category1_Word
        })
        setCategory2(data.data.json);
      } catch (error) {
        console.log(error)
      }
    } else if (index === 3) {
      try {
        const data = await axios.post("/category", {
          num: 3,
          category1: category1_Word,
          category2: category2_Word
        })
        setCategory3(data.data.json);
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const data = await axios.post("/category", {
          num: 4,
          category1: category1_Word,
          category2: category2_Word,
          category3: category3_Word
        })
        setCategory4(data.data.json);
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
      >
        카테고리별 검색
      </Button>
      <Fade in={open}>
        <div id="example-fade-text">
          {['Category1', 'Category2', 'Category3', 'Category4'].map(
            (variant, i) => (
              <DropdownButton
                as={ButtonGroup}
                key={variant}
                id={`dropdown-variants-${variant}`}
                variant={variant.toUpperCase()}
                title={
                  variant
                }
                onClick={(event) => { EachCategory(event, i + 1) }}
              >
                {
                  variant === "Category1"
                    ? category1.map((t, index) => <Dropdown.Item onClick={(event) => { Category_Pick(event, t["category1"], i + 1) }} key={index} eventKey={index + 1}>{t["category1"]}</Dropdown.Item>)
                    : variant === "Category2"
                      ? category2.map((t, index) => <Dropdown.Item onClick={(event) => { Category_Pick(event, t["category2"], i + 1) }} key={index} eventKey={index + 1}>{t["category2"]}</Dropdown.Item>)
                      : variant === "Category3"
                        ? category3.map((t, index) => <Dropdown.Item onClick={(event) => { Category_Pick(event, t["category3"], i + 1) }} key={index} eventKey={index + 1}>{t["category3"]}</Dropdown.Item>)
                        : category4.map((t, index) => <Dropdown.Item onClick={(event) => { Category_Pick(event, t["category4"], i + 1) }} key={index} eventKey={index + 1}>{t["category4"]}</Dropdown.Item>)
                }
              </DropdownButton>
            ),
          )}
        </div>
      </Fade>
    </>
  );
}

export default Category;
