import myUserInfo from "../utils/default-user";
import defaultUser from "../utils/default-user";
import axios from "axios";
import * as CONST_API from "../constAPI/constAPI";

export async function signIn(email, password) {
  try {
    const getUser = await axios.post(
      `http://${CONST_API.IP}/${CONST_API.LOGON}`,
      {
        login: email,
        password,
      }
    );

    const response = getUser;

    // localStorage.clear();
    localStorage.setItem("login", response.data.user.login);
    localStorage.setItem("token", response.data.result);

    // Send request
    console.log(email, password);

    //window.userInfo.login = response.data.user.login;
    //window.userInfo.token = response.data.result;

    defaultUser.login = response.data.user.login;
    defaultUser.token = response.data.result;

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
      message: "SignIn failed",
    };
  }
}
// axios("http://194.87.239.231:55555/api/Vendor?have_pricelist=1", {
//   headers: {
//     //"content-type": "application/x-www-form-urlencoded",
//     //Authorization: `Bearer ${localStorage.getItem("token1")}`,
//     //User: `${localStorage.getItem("login1")}`,

//     //Authorization: `Bearer ${getUser().data.token}`,
//     //User: getUser().data.login,

//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//     User: localStorage.getItem("login"),
//   },
// }).then((data) => {
//   setSrc(data.data);
// });
export async function getVendorArray(email, password) {
  try {
    const getUser = await axios.post(
      `http://${CONST_API.IP}/${CONST_API.LOGON}`,
      {
        login: email,
        password,
      }
    );

    const response = getUser;

    // localStorage.clear();
    localStorage.setItem("login", response.data.user.login);
    localStorage.setItem("token", response.data.result);

    // Send request
    console.log(email, password);

    //window.userInfo.login = response.data.user.login;
    //window.userInfo.token = response.data.result;

    defaultUser.login = response.data.user.login;
    defaultUser.token = response.data.result;

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
      message: "SignIn failed",
    };
  }
}

export async function getPriceList() {
  try {
    //console.log(defaultUser);
    const vendorsList = await axios(
      `http://194.87.239.231:55555/${
        CONST_API.GET_PRICELIST
      }/${localStorage.getItem("vendorId")}`,
      {
        headers: {
          //"content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          User: `${localStorage.getItem("login")}`,
        },
      }
    );
    console.log(vendorsList.data);
    return {
      isOk: true,
      //isOk: true,
      data: vendorsList.data, // window.userInfo,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}
export async function getUser2() {
  try {
    //console.log(defaultUser);

    return {
      isOk: defaultUser.token !== "",
      //isOk: true,
      data: defaultUser, // window.userInfo,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

// axios("http://194.87.239.231:55555/api/Vendor?have_pricelist=1", {
//   headers: {
//     //"content-type": "application/x-www-form-urlencoded",
//     //Authorization: `Bearer ${localStorage.getItem("token1")}`,
//     //User: `${localStorage.getItem("login1")}`,

//     //Authorization: `Bearer ${getUser().data.token}`,
//     //User: getUser().data.login,

//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//     User: localStorage.getItem("login"),
//   },
// }).then((data) => {
//   setSrc(data.data);
// });

export async function getUser() {
  try {
    //console.log(defaultUser);

    return {
      isOk: defaultUser.token !== "",
      //isOk: true,
      data: defaultUser, // window.userInfo,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
