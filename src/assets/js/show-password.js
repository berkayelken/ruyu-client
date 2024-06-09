
"use strict"

let createpassword = (type, ele) => {
    let input = document.getElementById(type);
    let icon1 = ele.querySelector('.icon1');
    let icon2 = ele.querySelector('.icon2');

    input.type = input.type === "password" ? "text" : "password";

    if (icon1.classList.contains("d-block")) {
        icon1.classList.remove("d-block");
        icon1.classList.add("d-none");
        icon2.classList.remove("d-none");
        icon2.classList.add("d-block");
    } else {
        icon1.classList.remove("d-none");
        icon1.classList.add("d-block");
        icon2.classList.remove("d-block");
        icon2.classList.add("d-none");
    }
}
