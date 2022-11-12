import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { view } from "../api/salaries";
const PastSalaries = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [errMsg, setErrMsg] = React.useState("");

  console.log(data);

  useEffect(() => {
    setIsLoading(true);

    //call to db
    view()
      .then((res) => {
        setIsLoading(false);
        setErrMsg("");
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(err.response.data);
      });
  }, []);
  return (
    <section className="past-salaries">
      <h4 className="mb-3 text-center">الكشوفات السابقة</h4>
      <div className="row gy-3">
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
          <Link to="/">
            <div className="salaries-record">
              <h5>
                التاريخ: <span>11-11-2020</span>
              </h5>
              <p>
                قيمة المرتبات: <span>200000</span> جنيه
              </p>
            </div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
          <Link to="/">
            <div className="salaries-record">
              <h5>
                التاريخ: <span>11-11-2020</span>
              </h5>
              <p>
                قيمة المرتبات: <span>200000</span> جنيه
              </p>
            </div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
          <Link to="/">
            <div className="salaries-record">
              <h5>
                التاريخ: <span>11-11-2020</span>
              </h5>
              <p>
                قيمة المرتبات: <span>200000</span> جنيه
              </p>
            </div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
          <Link to="/">
            <div className="salaries-record">
              <h5>
                التاريخ: <span>11-11-2020</span>
              </h5>
              <p>
                قيمة المرتبات: <span>200000</span> جنيه
              </p>
            </div>
          </Link>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 text-center">
          <Link to="/">
            <div className="salaries-record">
              <h5>
                التاريخ: <span>11-11-2020</span>
              </h5>
              <p>
                قيمة المرتبات: <span>200000</span> جنيه
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastSalaries;
