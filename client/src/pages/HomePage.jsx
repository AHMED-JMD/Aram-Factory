import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Right from "@mui/icons-material/Recommend";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const HomePage = () => {
  //initialize AOS
  React.useEffect(() => {
    AOS.init({once: true});
  }, []);

  return (
    <div className="Home">
      <div data-aos="zoom-out" data-aos-duration="2000" className="hom-hdr">
        {" "}
        <div className="text-center hdr-bg">
          <img src="/images/erm-logo.png" width="70" alt="logo" />
          <h1 className="text-center hdr-txt">مصنع إرم للمنتجات الغذائية</h1>
        </div>
      </div>

      <div className="hom-bdy">
        <h3 className="text-right">
          ادارة شؤون العاملين <AssignmentIndIcon />
        </h3>

        <br />
        <br />
        <div className="row">
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="col-lg-6 col-md-6 col-sm-12"
          >
            {" "}
            <p className="p1">
              يعمل المصنع تحت قياده حكيمة و تنظيم دقيق في صناعة بسكويت الشاي و
              الكيك ،( لينه ) العامل هو الكادر البشري المهم داخل الصناعه لذلك
              نحن نتهتم بحفظ ملف كل عامل علي حدي من حضور و إنصراف و مواظبه علي
              العمل ، و حقوقه أولى اولويات أصحاب المنفعه و كذلك الروح المعنويه
              من اجل تقديم منتج جيد للمستهلك و زيادة الانتاجيه .
            </p>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="col-lg-6 col-md-6 col-sm-12"
          >
            <img className="img1" src="/images/emp3.webp" alt="logo" />
          </div>
        </div>
      </div>

      <div className="hom-fotr text-center p-0 m-0">
        <p className="py-2 m-0">
          صمم هذا البرنامج في العام 2023 و موعودون إن شاء الله بالتطوير نحو
          الأفضل.{" "}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
