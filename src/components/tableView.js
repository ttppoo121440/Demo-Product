export default {
  template: `<table class="table mt-4">
  <thead>
    <tr>
      <th width="120">
        產品
      </th>
      <th>產品名稱</th>
      <th width="150">
      套餐
    </th>
      <th width="120">
        原價
      </th>
      <th width="120">
        售價
      </th>
      <th width="100">
        是否啟用
      </th>
      <th width="120">
        編輯
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in products" :key="product.id">
      <td><img :src="product.imageUrl" style="width: 50px;height: 50px;"/></td>
      <td>{{ product.title }}</td>
      <td>
      <span v-if="product.options.meal">{{ product.options.meal }}</span>
      <span v-else>不加點套餐</span>
      <td class="text-right">
        {{ product.origin_price }}
      </td>
      <td class="text-right">
        {{ product.price }}
      </td>
      <td>
        <span v-if="product.enabled" class="text-success">啟用</span>
        <span v-else class="text-danger">未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button
            class="btn btn-outline-primary btn-sm"
            @click="openModal('edit', product)">
            編輯
          </button>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="openModal('delete', product)">
            刪除
          </button>
        </div>
      </td>
    </tr>
  </tbody>
</table>`,
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    openModal(type, item) {
      this.$emit("open-modal", { type, item });
    }
  }
};
