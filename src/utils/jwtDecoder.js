export function jwtDecrypt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
      var data = JSON.parse(jsonPayload)
      // console.log(data)
    return data;
  }

  export function tokenAlive(exp) {
    if (Date.now() >= exp * 10000) {
      // console.log("tokenAlive:")
      // console.log(Date.now())
      // console.log(exp)
      return false;
    }
    return true;
  }