import React, { useEffect, useState } from "react";
import { SalariesRecordsTable, SalariesTable } from "../components";
import { useParams } from "react-router-dom";
import { viewCheckout } from "../api/salaries";

const SalariesRecords = () => {
  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  console.log(data);

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
  return (
    <section className="salaries-records">
      <h1>Hi</h1>
      {/* <SalariesRecordsTable record={data} /> */}
    </section>
  );
};

export default SalariesRecords;
