import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SignIn = () => {

  const [user_email1, setUser_email1] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_name, setUser_name] = useState("");
  const [user_phone, setUser_phone] = useState("");

  const Signin = async (event) => {
    event.preventDefault();
    if (!(user_email1 && user_password)) {
      Swal.fire("이메일과 비밀번호를 입력해 주세요.", "", "info", "닫기")
    } else {
      try {
        const data = await axios.post("/signIn", {
          user_email1: user_email1,
          user_email2: "naver.com",
          user_password: user_password,
          user_name: user_name,
          user_phone: user_phone,
          user_org: "학생",
          user_major: "학생"
        })
        console.log(data.data);
        Swal.fire("가입 완료", "가입한 정보로 로그인 해주세요.", "success");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <div className="content">
        <Form>

          <Form.Label className="signInHead">아이디</Form.Label>
          <InputGroup className="mb-3 signInId">
            <FormControl
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              maxLength={20}
              className="signInFormControl"
              onChange={(e) => setUser_email1(e.target.value)}
            />
            <InputGroup.Text className="Email_text" id="basic-addon2">@naver.com</InputGroup.Text>
          </InputGroup>

          <Form.Label className="signInHead">비밀번호</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="formControl"
              type="password"
              maxLength={20}
              onChange={(e) => setUser_password(e.target.value)}
            />
          </Form.Group>

          <Form.Label className="signInHead">이름</Form.Label>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control
              className="formControl"
              type="text"
              onChange={(e) => setUser_name(e.target.value)}
            />
          </Form.Group>

          <Form.Label className="signInHead">전화번호</Form.Label>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Control
              className="formControl"
              type="tel" maxLength={16}
              onChange={(e) => setUser_phone(e.target.value)}
            />
          </Form.Group>

          <Button
            className="signInBtn"
            variant="primary"
            type="submit"
            onClick={(event) => Signin(event)}
          >
            가입하기
          </Button>

        </Form >
      </div >
    </div >
  );
};

export default SignIn;
