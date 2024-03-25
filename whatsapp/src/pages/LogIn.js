import { useState } from "react";
import "./LogIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogIn() {
  const [FInfo, setFInfo] = useState({ login: "", password: "" });
  const navigate = useNavigate();
  const save = (e) => {
    e.preventDefault();
    console.log(FInfo);
    axios
      .post("http://194.87.239.231:55555/api/logon", FInfo)
      .then((response) => {
        console.log(response.data);
        localStorage.clear();
        localStorage.setItem("login1", response.data.user.login);
        localStorage.setItem("token1", response.data.result);
        navigate("/vendors");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div class="main">
        <img class="logo" src="logo.png" />
        <h2>Авторизация</h2>
        <form onSubmit={save}>
          <h3>Логин</h3>
          <input
            type="text"
            name="login"
            class="inp"
            placeholder="Введите логин"
            value={FInfo.login}
            onChange={(e) =>
              setFInfo({ ...FInfo, [e.target.name]: e.target.value })
            }
          />
          <h3>Пароль</h3>
          <input
            type="password"
            name="password"
            placeholder="Введите пароль"
            class="inp"
            value={FInfo.password}
            onChange={(e) =>
              setFInfo({ ...FInfo, [e.target.name]: e.target.value })
            }
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    </>
  );
}

export default LogIn;
