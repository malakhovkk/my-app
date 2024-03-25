import { useState } from "react";
import "./Contacts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Contacts() {
  const [contactInfo, setContactInfo] = useState([]);

  useState(() => {
    axios
      .get(
        `http://194.87.239.231:55555/api/VendorContact/${localStorage.getItem(
          "vendorId"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token1")}`,
            User: localStorage.getItem("login1"),
          },
        }
      )
      .then((res) => {
        setContactInfo(
          res.data.map((contVendor) => ({
            contact: contVendor.contact,
            id: contVendor.id,
            name: contVendor.name,
          }))
        );
      })
      .catch((el) => console.log(el));
  }, []);
  const navigate = useNavigate();
  return (
    <div class="main">
      <img class="logo" src="logo.png" />
      <div
        class="back"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("../vendors")}
      >
        Назад
      </div>
      <div class="number">00-00000035</div>
      <h1 class="vendor">АО «Ладога Дистрибьюшен»</h1>
      {contactInfo.map((c) => (
        <div class="contact" key={c.id}>
          <div class="left">
            <div class="name">{c.name}</div>
            <div class="phone">{c.contact}</div>
          </div>
          <div class="right"></div>
        </div>
      ))}
      {/* <div class="contact">
        <div class="left">
          <div class="name">Иванов Иван</div>
          <div class="phone">+7 947 472-21-45</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="contact">
        <div class="left">
          <div class="name">Кирилл Столяров</div>
          <div class="phone">+7 965 869-20-42</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="contact">
        <div class="left">
          <div class="name">Дима Маслов</div>
          <div class="phone">+7 966 120-20-45</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="contact">
        <div class="left">
          <div class="name">Анатолий Творов</div>
          <div class="phone">+7 965 869-20-42</div>
        </div>
        <div class="right"></div>
      </div> */}
      <button class="add">Добавить</button>
    </div>
  );
}

export default Contacts;
