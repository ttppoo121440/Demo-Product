import { getPic,createProduct,editProduct } from "../utils/api";
export default {
  template: `<div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                  <span v-if="modelState==='new'">新增產品</span>
                  <span v-else>修改產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <div class="loading" :class="{'d-block':loadingModal}">Loading&#8230;</div>
                <div class="row">
                  <div class="col-sm-4">
                      <div class="form-group">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input id="imageUrl" accept="image/*" ref="file" @change="uploadPic" type="file" class="form-control"
                        placeholder="請輸入圖片連結">
                    </div>
                    <img class="w-100" :src="productModel.imageUrl" alt>
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input id="title" v-model="productModel.title" type="text" class="form-control" placeholder="請輸入標題">
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input id="category" v-model="productModel.category" type="text" class="form-control"
                          placeholder="請輸入分類" >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input id="unit" v-model="productModel.unit" type="unit" class="form-control"
                          placeholder="請輸入單位">
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                        <input id="origin_price" v-model="productModel.origin_price" type="number" class="form-control"
                          placeholder="請輸入原價">
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input id="price" v-model="productModel.price" type="number" class="form-control"
                          placeholder="請輸入售價">
                      </div>
                    <div class="form-group col-md-12">
                    <label for="exampleFormControlSelect1">套餐</label>
                      <select v-model="productModel.options.meal" class="form-control" id="exampleFormControlSelect1">
                        <option :value="null">不加點套餐</option>
                        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
                      </select>
                    </div>
                  </div>
                    <hr>
                    <div class="form-group">
                      <label for="description">產品描述</label>
                      <textarea id="description" v-model="productModel.description" type="text" class="form-control"
                        placeholder="請輸入產品描述" >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">說明內容</label>
                      <textarea id="content" v-model="productModel.content" type="text" class="form-control"
                        placeholder="請輸入說明內容" >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input id="is_enabled" v-model="productModel.enabled" class="form-check-input" type="checkbox"
                          :true-value="true" :false-value="false">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-primary" @click="modelMethodHandler">
                  確認
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
    },
    modelState: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    methodsData(data) {
      this.$emit("methods-data", data);
    },
    async newData() {
      this.loadingModal = true;
      await createProduct(this.productModel).then(res => {
          $("#dialog").modal("hide");
          this.loadingModal = false;
          this.$emit('update-data')
        }).catch(() => {
          this.loadingModal = false;
        });
    },
    async updateData() {
      this.loadingModal = true;
      await editProduct(this.productModel.id, { ...this.productModel }).then(() => {
          $("#dialog").modal("hide");
          this.loadingModal = false;
          this.$emit('update-data')
        }).catch(() => {
          this.loadingModal = false;
        });
    },
    modelMethodHandler(data) {
      const modelMethods = {
        new: this.newData,
        edit: this.updateData,
      };
      modelMethods[this.modelState](data);
    },
    async uploadPic() {
      this.loadingModal = true;
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append("file", uploadedFile);
      await getPic(formData).then(res => {
        this.$emit("upload-pic", res.data.path);
        this.loadingModal = false;
      }).catch(() => {
        this.loadingModal = false;
      });;
    }
  }
};
