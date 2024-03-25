import { useEffect, useState } from "react";
import "./Vendors.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

///api/Vendor?have_pricelist=1
function Vendors() {
  const [vendorList, setVendorList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://194.87.239.231:55555/api/vendor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token1")}`,
          User: localStorage.getItem("login1"),
        },
      })
      .then((response) => {
        console.log(response);
        setVendorList(
          response.data.map((el) => ({ id: el.id, name: el.name }))
        );
      });
    // axios
    //   .get(
    //     "http://194.87.239.231:55555/api/VendorContact/100126e6-c2c5-11eb-9674-a8a1595a0d25"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    setVendorList();
  }, []);
  console.log(vendorList);
  const goToContact = (id) => {
    localStorage.setItem("vendorId", id);
    navigate("/vendor-contact");
  };
  <input type="text" class="find" />;

  return (
    <div className="main">
      <img className="logo" src="logo.png" />
      <h2>Авторизация</h2>
      <div className="findBlock">
        <input
          type="text"
          className="find"
          onChange={(e) => {
            axios
              .get(
                `http://194.87.239.231:55555/api/vendor?have_pricelist=1&text=${e.target.value}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token1")}`,
                    User: localStorage.getItem("login1"),
                  },
                }
              )
              .then((response) => {
                console.log(response);
                if (response.data.length > 0)
                  setVendorList(
                    response.data.map((el) => ({ id: el.id, name: el.name }))
                  );
                else setVendorList([]);
              });
          }}
        />
      </div>

      <div className="list">
        {vendorList &&
          !!vendorList.length &&
          vendorList.map((vendor) => (
            <div
              className="vendor"
              key={vendor.id}
              onClick={() => goToContact(vendor.id)}
            >
              {vendor.name}
            </div>
          ))}
        {vendorList && !!!vendorList.length && "Ответа нет"}
        {/* <div class="vendor">ООО «АСТ – интернэшнл инваэ</div>
        <div class="vendor">АО «Ладога Дистрибьюшен»</div>
        <div class="vendor">АО «ТД Арома»</div>
        <div class="vendor">ООО «АСТ – интернэшнл инваэ</div>
        <div class="vendor">АО «Ладога Дистрибьюшен»</div>
        <div class="vendor">АО «ТД Арома»</div>
        <div class="vendor">ООО «АСТ – интернэшнл инваэ</div>
        <div class="vendor">АО «Ладога Дистрибьюшен»</div>
        <div class="vendor">АО «ТД Арома»</div> */}
      </div>
    </div>
  );
}

export default Vendors;
