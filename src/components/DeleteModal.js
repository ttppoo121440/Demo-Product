import { destroyProduct } from "../utils/api";
export default {
  template: `<div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
          <div class="loading" :class="{'d-block':loadingModal}">Loading&#8230;</div>
            <h5 id="exampleModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ productModel.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>`,
  data() {
    return {
      loadingModal: false
    };
  },
  props: {
    productModel: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteData(data) {
      this.$emit("delete-data", data);
    },
    async deleteProduct() {
      this.loadingModal = true;
      await destroyProduct(this.productModel.id).then(res => {
          console.log(res);
          $("#dialog").modal("hide");
          this.loadingModal = false;
          this.$emit("update-data");
        }).catch(() => {
          this.loadingModal = false;
        });
    }
  }
};
