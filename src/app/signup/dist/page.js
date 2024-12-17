"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var React = require("react");
function Signup() {
    var _a = React.useState("0"), gender = _a[0], setGender = _a[1];
    var _b = React.useState(""), fullname = _b[0], setFullname = _b[1];
    var _c = React.useState(""), dateBirth = _c[0], setDateBirth = _c[1];
    function JenisKelamin(e) {
        setGender(e);
        console.log(e);
    }
    function SignUp() {
        var data = {
            full_name: fullname,
            sex: gender
        };
        console.log(data);
    }
    return (React.createElement("div", { className: "w-full flex flex-col gap-3" },
        React.createElement("div", { className: "w-full h-80 bg-blue-500 rounded-full mt-[-240px] mb-12" }),
        React.createElement("h1", { className: "font-bold text-4xl text-center" }, "Sign Up"),
        React.createElement("div", { className: "mx-8 my-8 flex flex-col gap-10" },
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Nama Lengkap"),
                React.createElement("input", { type: "text", onChange: function (e) { return setFullname(e.target.value); }, className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Jenis Kelamin"),
                React.createElement("select", { onChange: function (e) { JenisKelamin(e.target.value); }, className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" },
                    React.createElement("option", { value: "0" }, "Perempuan"),
                    React.createElement("option", { value: "1" }, "Laki-Laki"))),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Tempat Lahir"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Tanggal Lahir"),
                React.createElement("input", { type: "date", onChange: function (e) { return setDateBirth(e.target.value); }, value: dateBirth, className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Alamat"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Asal Sekolah"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Jurusan"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Kelas"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Email"),
                React.createElement("input", { type: "text", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Phone"),
                React.createElement("input", { type: "number", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "items-start" },
                React.createElement("p", { className: "font-bold text-xl" }, "Password"),
                React.createElement("input", { type: "password", className: "px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg" })),
            React.createElement("div", { className: "flex justify-end underline" },
                React.createElement(link_1["default"], { href: "", className: "text-sm" }, "Forgot Password?")),
            React.createElement("button", { onClick: SignUp, className: "px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto" }, "Sign Up"),
            React.createElement("div", { className: "h-0.5 w-full bg-black" }),
            React.createElement("div", { className: "flex justify-center font-bold" },
                React.createElement("div", { className: "" },
                    "Already have account?\u00A0",
                    React.createElement(link_1["default"], { href: "/login", className: "underline" }, "Log In Here?"))))));
}
exports["default"] = Signup;
