import { Button, TextField, Typography } from "@mui/material";
import React from "react";

function App() {
  return (
    <div className="App" dir="rtl">
      <div className="wrap">
        <div className="box">
          <Typography variant="h4" color="primary" className="din" my={2} component="h1">مصنع ارام للمواد الغذائية</Typography>
          <Typography variant="h6" className="din">لوحة التحكم</Typography>
          <br />
          <form>
            <div className="form-group">
              {/* <label htmlFor="name">الاسم</label> <br /> */}
              {/* <input
                type="text"
                className="textfeild"
                placeholder="ادخل الاسم"
              /> */}
              <TextField id="outlined-basic" className="din" style={{marginBottom: '20px', width: '320px'}} label="إسم المستخدم" variant="outlined" />

            </div>

            <div className="form-group">
              {/* <label htmlFor="name">كلمة السر</label> <br />
              <input
                type="password"
                className="textfeild"
                placeholder="ادخل كلمة السر"
              /> */}
              <TextField id="outlined-basic" className="din" style={{ width: '320px'}} label="كلمة المرور" variant="outlined" />

            </div>
            <br />
            <div>
              {" "}
              نسيت كلمة السر؟ <a href="/">اضغط هنا</a>
            </div>
            <br />
           <Button color="primary" size="large" variant="contained">تسجيل الدخول</Button>
          </form>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
            <path
              fill="#00cba9"
              fillOpacity="1"
              d="M0,256L120,250.7C240,245,480,235,720,197.3C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg> */}
        </div>
      </div>
    </div>
  );
}

export default App;
