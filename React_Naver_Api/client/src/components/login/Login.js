import React, { useState } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { RiRepeatOneFill } from "react-icons/ri";
import { Form, Button } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";

const LogIn = (props) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="Login_container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <IoIosLogIn />
          ID 로그인
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <RiRepeatOneFill />
          일회용 번호
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <IoQrCodeOutline />
          QR코드
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control className="email" type="email" placeholder="아이디" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control className="password" type="password" placeholder="비밀번호" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check className="checkbox" type="checkbox" label="로그인 상태 유지" />
            </Form.Group>
            <Button className="loginBtn" variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </div>

        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <BiLock className="img_lock" />
          <div className="one_text">
            네이버앱의 <span className="accent">메뉴 &gt; 설정 <em><AiFillSetting /></em> &gt; 로그인 아이디 관리 <br />
              &gt; 일회용 아이디 관리</span>에 보이는 번호를 입력해 주세요.
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="singleUseNumber">
              <Form.Control className="singleUse" type="email" placeholder="일회용 로그인 번호" />
            </Form.Group>

            <Button className="otloginBtn" variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </div>

        <div
          className={toggleState === 3 ? "content active-content" : "content"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
