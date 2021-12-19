import React, { useState } from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from "react-router-dom";

import Header from "../route/Header";
import Footer from "../route/Footer";
import Home from "./Home/Home";
import Login from "./login/Login";
import SignIn from "./signIn/SignIn";
import Cart from "./cart/Cart";
import History from "./history/History";

function App() {
  const [userId, setUserId] = useState("sonicce99@naver.com");

  return (
    <div className="App">
      <Header />
      <div className="inner">
        <Route exact path="/" component={Home} />
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
