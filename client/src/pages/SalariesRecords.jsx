import React, { useEffect, useState } from "react";
import { Loader, SalariesRecordsTable, SalariesTable } from "../components";
import { useParams } from "react-router-dom";
import { viewCheckout } from "../api/salaries";

const SalariesRecords = () => {
  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});


  useEffect(() => {
    setIsLoading(true);

    //call db
    viewCheckout(params.id)
      .then((res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  let names = [];
  names = data.emp_names;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="salaries-records">
         <div className="d-flex flex-wrap justify-content-between">
          <h5 className="text-center">
            المجموع: <span>{data.total}</span> جنيه
          </h5>
          <h5 className="text-center">
            التاريخ: <span>{data.date}</span>
          </h5>
        </div>
        <ul>
          {/* {names.map((name) => (
            <li key={name}> {name} </li>
          ))} */}
         </ul> 
    </section>
  );
};

export default SalariesRecords;
