import React, { useEffect, useState } from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, useLocation } from "react-router-dom";

import Header from "../route/Header";
import Footer from "../route/Footer";
import Home from "./Home/Home";
import Login from "./login/Login";
import SignIn from "./signIn/SignIn";
import Cart from "./cart/Cart";
import History from "./history/History";
import cookie from "react-cookies";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("sonicce99@naver.com");
  const location = useLocation();

  // useEffect(() => {
  //   if (!("/signIn" === location.pathname || "/" === location.pathname)) {
  //     fncCheckSession();
  //   }
  // }, [location.pathname])

  // const fncCheckSession = async () => {
  //   const tid = cookie.load("token_id");
  //   const tname = cookie.load("token_name");
  //   const tpwd = cookie.load("user_password");

  //   if (tid && tname) {
  //     axios.post("/sessionCheck", {
  //       token_id: tid,
  //       token_name: tname
  //     })
  //       .then((res) => {
  //         console.log(res.data);
  //         setUserId(res.data.decrypt_id.user_email);

  //         if (tpwd) {
  //           axios.post("/sessionSignin", {
  //             user_email: res.data.decrypt_id.user_email,
  //             user_password: tpwd
  //           })
  //             .then((res) => {
  //               console.log(res.data.json[0]);
  //               if (!res.data.json[0].user_email) {
  //                 // 로그인 해제처리
  //                 fncNotLogin();
  //               }
  //             })
  //             .catch((error) => { })
  //         } else {
  //           // 로그인 해제처리
  //           fncNotLogin();
  //         }
  //       })
  //   } else {
  //     // 로그인 해제처리
  //     fncNotLogin();
  //   }
  // }

  // // cookie 제거
  // const fncRemoveCookie = () => {
  //   cookie.remove("token_id", { path: "/" });
  //   cookie.remove("token_name", { path: "/" });
  //   cookie.remove("user_password", { path: "/" });
  // }

  // // 로그아웃
  // const fncNotLogin = () => {
  //   if (window.location.hash !== "nocookie") {
  //     fncRemoveCookie();
  //   }
  //   setTimeout(() => {
  //     window.location.href = "/login/#nocookie"
  //   }, 1000)
  // }

  return (
    <div className="App">
      <Header />
      <div className="inner">
        <Route exact path="/" render={() => <Home userId={userId} />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signIn" component={SignIn} />
        <Route path="/cart" render={() => <Cart userId={userId} />} />
        <Route path="/history" render={() => <History userId={userId} />} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
