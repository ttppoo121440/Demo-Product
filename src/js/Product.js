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
    // 自定義資料
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
    // 產品暫存資料
    productModel: {
      options: {meal: null}
    },
    // Dialog 狀態
    modelState: null,
    loading: false,
    // 當前頁面
    currentPage: 1,
    // 一頁顯示幾筆資料
    pageSize: 10
  },
  computed: {
    // 產品資料長度
    total() {
      return this.products.length;
    },
    // 計算有幾頁
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 頁籤一頁顯示10筆資料
    formatData() {
      const startNum = (this.currentPage - 1) * this.pageSize;
      const endNum = startNum + this.pageSize;
      return this.products.slice(startNum, endNum);
    },
    // 當前頁面
    current: {
      get() {
        return this.currentPage;
      },
      // 預防 當前頁面 超出範圍
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
    // 點擊 頁籤 事件
    changeNav(page) {
      this.current = page;
    },
    // 開啟 Dialog
     openModal(data) {
      this.modelState = data.type;
      this.openDataHandler(data);
    },
    // Dialog 開啟 事件
    openDataHandler(data) {
      // 新增資料時 開啟 Dialog 清空資料
      if (data.type === "new") {
        this.productModel = Object.assign({},{imageUrl: [],
          options: {meal: null}
          }
        );
        $("#dialog").modal("show");
      } else if(data.type === "edit"){
        // 修改資料時 打 修改API 給予資料
        this.getSingleProduct(data)
      } else{
        this.productModel = Object.assign({},data.item)
        $("#dialog").modal("show");
      }
    },
    // 修改API 給予修改資料
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
    // 取得產品list資料
    getProducts() {
      this.loading = true;
      getProduct().then(res => {
          this.products = res.data;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
    },
    // 給予上傳路徑
    uploadPic(path) {
      this.productModel.imageUrl = [path];
    }
  },
  mounted() {
    this.getProducts();
  }
});
