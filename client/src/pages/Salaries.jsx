import React, { useState } from "react";
import { SalariesTable } from "../components";

const Salaries = () => {
    const [newOne, setNewOne] = useState(localStorage.getItem("Sal"));
    return ( 
        <section className="salaries">
            {newOne === true ? (
        <>
          <SalariesTable />
        </>
      ) : (
        <div className="text-center">
          <h4 className="mb-3">إنشاء كشف حسابات جديد</h4>
          <button
            className="btn btn-primary "
            onClick={() => {
              setNewOne(true);
              localStorage.setItem("Sal", true);
            }}
          >
            إضافة الكشف
          </button>
        </div>
      )}
        </section>
     );
}
 
export default Salaries;