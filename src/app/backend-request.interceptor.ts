import { HttpInterceptorFn } from '@angular/common/http';

export const backendRequestInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith("https://139.59.157.143:8080/api")) {
    return next(req);
  } else if (req.url.startsWith('https://139.59.157.143:8080/api/auth/sign/in/twitter')) {
    const authReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "rejectUnauthorized": "false"
      }
    });
    return next(authReq);
  } else {
    const authReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "rejectUnauthorized": "false",
        "auth-token": "Bearer " + getToken()
      }
    });
    return next(authReq);
  }
};

export const getToken = () => {
  let cookieToken = getCookie("token")
  if (cookieToken && cookieToken.length > 0) {
    return cookieToken;
  }

  let localStorageToken = getItemFromLocalStorage("token")
  let expiresAtStr = getItemFromLocalStorage("expiresAt");
  let expiresAt = Number.parseInt(expiresAtStr ? expiresAtStr : '0')

  if (expiresAt > new Date().getTime() && localStorageToken && localStorageToken.length > 0) {
    return localStorageToken;
  } else {
    deleteFromLocalStorage("token")
    deleteFromLocalStorage("name")
    deleteFromLocalStorage("expiresAt")
  }

  return ''
}

export const  getCookie =  (name: string) => {
  let ca: Array<string> = document.cookie.split(';');
  let caLen: number = ca.length;
  let cookieName = `${name}=`;
  let c: string;

  for (let i: number = 0; i < caLen; i += 1) {
    c = ca[i].replace(/^\s+/g, '');
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return '';
}

const getItemFromLocalStorage = (fieldName: string) => {
  return document.defaultView?.localStorage.getItem(fieldName)
}

const deleteFromLocalStorage = (fieldName: string) => {
  document.defaultView?.localStorage.removeItem(fieldName);
}

