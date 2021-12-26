import React, { useState } from "react";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { RiRepeatOneFill } from "react-icons/ri";
import { Form, Button } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import cookie from "react-cookies";
import { useHistory } from 'react-router-dom';

const LogIn = () => {
  const [toggleState, setToggleState] = useState(1);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  let history = useHistory();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const fncLogin = (event) => {
    event.preventDefault();

    if (!(userEmail && userPassword)) {
      sweetalert("이메일과 비밀번호를 확인해 주세요.", "", "info", "닫기")
    }

    axios.post("/logIn", {
      user_email: userEmail,
      user_password: userPassword
    })
      .then((response) => {
        console.log(response.data[0]);
        if (response.data[0]) {
          const user_email = response.data[0].user_email;
          const user_name = response.data[0].user_name;
          const user_pwd = response.data[0].user_password;

          if (user_email) {
            sweetalert("로그인 되었습니다.", "", "success", "닫기");

            // 로그인 후에 세션 유효기간 60분으로 설정하기
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);

            //암호화된 user_id, user_name 가져오기
            axios.post("/webtoken", {
              user_email: user_email,
              user_name: user_name
            })
              .then((res) => {
                console.log(res.data);
                cookie.save("token_id", res.data.token_id, {
                  path: "/",
                  expires
                });
                cookie.save("token_name", res.data.token_name, {
                  path: "/",
                  expires
                });
                cookie.save("user_password", user_pwd, {
                  path: "/",
                  expires
                })
              })
              .catch((error) => {
                sweetalert("작업 중 오류가 발생했습니다.", error, "error", "닫기");
              });
            setTimeout(() => {
              history.push('/');
            }, 1000)
          }
        } else {
          sweetalert("아이디 또는 비밀번호가 일치하지 않습니다.", "", "error", "닫기");
        }
      })
  }

  const sweetalert = (title, showBtn, icon) => {
    Swal.fire({
      position: "center",
      icon: icon,
      title: title,
      showConfirmButton: showBtn,
      timer: 1000
    })
  }

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
              <Form.Control
                className="email"
                type="email"
                placeholder="아이디"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="password"
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check className="checkbox" type="checkbox" label="로그인 상태 유지" />
            </Form.Group>
            <Button className="loginBtn"
              variant="primary"
              type="submit"
              onClick={(event) => fncLogin(event)}
            >
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

            <Button
              className="otloginBtn"
              variant="primary"
              type="submit"
            >
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
