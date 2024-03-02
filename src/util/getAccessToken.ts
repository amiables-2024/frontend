import { jwtDecode } from "jwt-decode";

function getAccessToken() {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    return null;
  }

  try {
    const expTime = jwtDecode(token).exp;
    const currTime = Date.now() / 1000;
    console.log("Exp -", expTime, "Curr -", currTime);
    if (expTime === undefined || expTime < currTime) {
      return null;
    } else {
      return token;
    }
  } catch (error) {
    return null;
  }
}

export default getAccessToken;