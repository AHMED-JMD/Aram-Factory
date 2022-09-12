import React from "react";

function App() {
  return (
    <div className="App" dir="rtl">
      <div className="wrap">
        <div className="box">
          <h1>مصنع ارام للمواد الغذائية</h1>
          <h3>تسجيل الدخول</h3>
          <br />
          <form>
            <div className="form-group">
              <label htmlFor="name">الاسم</label> <br />
              <input
                type="text"
                className="textfeild"
                placeholder="ادخل الاسم"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">كلمة السر</label> <br />
              <input
                type="password"
                className="textfeild"
                placeholder="ادخل كلمة السر"
              />
            </div>
            <br />
            <div>
              {" "}
              نسيت كلمة السر؟ <a href="/">اضغط هنا</a>
            </div>
            <br />
            <button className="btn btn-lg btn-primary">تسجيل</button>
          </form>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#00cba9"
              fillOpacity="1"
              d="M0,256L120,250.7C240,245,480,235,720,197.3C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
