export default {
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled:current===1}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="changeNav(current-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active:current===nav}" v-for="nav in totalPages">
      <a class="page-link" href="#" @click.prevent="changeNav(nav)">{{nav}}</a>
    </li>
    <li class="page-item" :class="{disabled:current===totalPages}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="changeNav(current+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  props: {
    current:{
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
  },
  methods:{
    changeNav(index){
      this.$emit('change-nav',index)
    }
  }
};
