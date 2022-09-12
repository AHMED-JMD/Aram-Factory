import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };
  return (
    <div className="Login">
      <div className="wrap">
        <div className="box">
          <h1>مصنع ارام للمواد الغذائية</h1>
          <h3>تسجيل الدخول</h3>
          {isLoading && (
             <div className="row">
             <div className="col-12">
               <div className="spinner-cont">
                 <div className="spinner-loader"></div>
               </div>
             </div>
           </div>
          ) }
          {err && (
            <div className="alert alert-danger">{err.msg.msg} </div>
          )}
          <br />
          <form onSubmit={(e) => HandleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">الاسم</label> <br />
              <input
                type="text"
                className="textfeild"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ادخل الاسم"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">كلمة السر</label> <br />
              <input
                type="password"
                className="textfeild"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ادخل كلمة السر"
              />
            </div>
            <br />
            <div>
              {" "}
              نسيت كلمة السر؟ <a href="/">اضغط هنا</a>
            </div>
            <br />
            <button className="btn btn-lg btn-primary" type="submit">
              تسجيل
            </button>
          </form>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#AA2709"
              fillOpacity="1"
              d="M0,256L120,250.7C240,245,480,235,720,197.3C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;
