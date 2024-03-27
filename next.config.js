/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: true,//Dòng này nếu chạy useEffecting thì đừng có dùng nó, nó sẽ x2 lần chạy....
=======
  //reactStrictMode: true,
>>>>>>> develope
  i18n,
};

module.exports=nextConfig