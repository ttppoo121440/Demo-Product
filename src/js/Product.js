import "../css/loading.css";
import "../pages/Product.html";
import Modal from "../components/Modal";
import tableView from "../components/tableView";
import DeleteModal from "../components/DeleteModal";
import Navigation from "../components/Navigation";
import { getProduct } from "../utils/api";

new Vue({
  el: "#app",
  components: {
    DeleteModal,
    Modal,
    tableView,
    Navigation
  },
  data: {
    options: [
      {
        value: "黑森林蛋糕",
        label: "黑森林蛋糕"
      },
      {
        value: "巧克力布朗尼",
        label: "巧克力布朗尼"
      },
      {
        value: "起司蛋糕",
        label: "起司蛋糕"
      },
      {
        value: "瑞士巧克力慕斯",
        label: "瑞士巧克力慕斯"
      }
    ],
    products: [],
    productModel: {
      options: {meal: null}
    },
    modelState: null,
    loading: false,
    pagination: [],
    currentPage: 1,
    pageSize: 10
  },
  computed: {
    total() {
      return this.products.length;
    },
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    formatData() {
      const startNum = (this.currentPage - 1) * this.pageSize;
      const endNum = startNum + this.pageSize;
      return this.products.slice(startNum, endNum);
    },
    current: {
      get() {
        return this.currentPage;
      },
      set(page) {
        if (page < 1) {
          this.currentPage = 1;
        }else if(page > this.totalPages){
          this.currentPage = this.totalPages
        }else{
          this.currentPage = page;
        }
      }
    }
  },
  methods: {
    changeNav(page) {
      this.current = page;
    },
    openModal(data) {
      $("#dialog").modal("show");
      this.modelState = data.type;
      this.openDataHandler(data);
    },
    openDataHandler(data) {
      if (data.type === "new") {
        this.productModel = Object.assign({},{imageUrl: [],
          options: {meal: null}
          }
        );
      } else {
        this.productModel = Object.assign({}, data.item);
      }
    },
    getProducts() {
      this.loading = true;
      getProduct().then(res => {
          console.log(res);
          this.products = res.data;
          this.pagination = res.meta.pagination;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
    },
    uploadPic(path) {
      this.productModel.imageUrl = [path];
    }
  },
  mounted() {
    this.getProducts();
  }
});
