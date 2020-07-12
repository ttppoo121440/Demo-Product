import "../css/loading.css";
import "../pages/Product.html";
import Modal from "../components/Modal";
import tableView from "../components/tableView";
import DeleteModal from "../components/DeleteModal";
import Navigation from "../components/Navigation";
import { getProduct,getSingleProduct } from "../utils/api";

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
      this.modelState = data.type;
      this.openDataHandler(data);
    },
    openDataHandler(data) {
      if (data.type === "new") {
        this.productModel = Object.assign({},{imageUrl: [],
          options: {meal: null}
          }
        );
        $("#dialog").modal("show");
      } else if(data.type === "edit"){
        this.getSingleProduct(data)
        
      } else{
        this.productModel = Object.assign({},data.item)
        $("#dialog").modal("show");
      }
    },
    getSingleProduct(data){
      this.loading = true
      getSingleProduct(data.item.id).then(res=>{
        this.productModel = res.data
        this.loading = false
        $("#dialog").modal("show");
      }).catch(() => {
        this.loading = false;
      });
    },
    getProducts() {
      this.loading = true;
      getProduct().then(res => {
          this.products = res.data;
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
