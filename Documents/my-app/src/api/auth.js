import myUserInfo from "../utils/default-user";
import defaultUser from "../utils/default-user";
import axios from "axios";

export async function signIn(email, password) {
  try {
    const getUser = await axios.post("http://194.87.239.231:55555/api/logon", {
      login: email,
      password,
    });

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
      isOk: defaultUser.token !== "",
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

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
