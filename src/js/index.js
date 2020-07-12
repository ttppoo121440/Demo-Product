import '../pages/index.html'
import { Login } from "../utils/api";

new Vue({
  el: "#app",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    login() {
      Login(this.user).then(res => {
          const token = res.token;
          const expired = res.expired;
          document.cookie = `token=${token};expires=${new Date(
            expired * 1000
          )};`;
          window.location = "./pages/Product.html";
        }).catch(error => {
          console.log(error);
        });
    }
  }
});
