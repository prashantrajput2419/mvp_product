<template>
   <div class="productView">
      <div class="wrapper">
         <nav id="sidebar">
            <div class="sidebar-header">
               <h4>Filter Products</h4>
            </div>

            <ul class="list-unstyled components">
               <li>
                  <a href="javascript:void(0)" aria-expanded="true">Select Category</a>
                  <ul class="list-unstyled">
                     <li v-for="category in categories">
                        <div>
                           <label>
                              <input type="checkbox" @change="selectCategoryFilter" v-model="selectCatFilter" :value="category.id" style="height: 16px;width: 29px;"><span>{{category.name.charAt(0).toUpperCase() + category.name.slice(1)}}</span>
                           </label>
                        </div>
                     </li>
                  </ul>
               </li>
               <li style="font-size: 13px;margin-top: 20px;background-color: #fb5e5e;"><router-link :to="{name: 'kitchenLogin'}" class="nav-link">Go to kitchen dashboard</router-link></li>
                <li style="font-size: 13px;margin-top: 20px;background-color: #fb5e5e;"><router-link :to="{name: 'counterLogin'}" class="nav-link">Go to counter dashboard</router-link></li>
                <li style="font-size: 13px;margin-top: 20px;background-color: #fb5e5e;"><router-link :to="{name: 'adminLogin'}" class="nav-link">Go to admin dashboard</router-link></li>
            </ul>
         </nav>
         <div id="content">
            <section class="hero hero-page gray-bg padding-small" style="padding: 24px 0 !important;">
               <div class="container">
                  <div class="row justify-content-center">
                     <div class="col-md-6">
                        <div class="search_pro">
                           <i class="fa fa-search"></i><input type="text" id="myInput" autocomplete="off" v-model="searchKeyWord" @input="myFunction" @keyup.enter="enter" @keyup.down="down" @keyup.up="up" placeholder="Search products" title="Type in a name">
                        </div>
                        <ul id="myUL" class="col-11" v-if="searchproduct.length > 0">
                           <li v-for="(product, index) in searchproduct"><a href="#" class="visit-product" :class="{'act-how': scroll_index==index}" @click="openProduct(product.id)" style="color: #8f50a7;">{{product.name}}<span class="float-right"><i class="fa fa-rupee"></i>{{product.amount}}</span></a></li>
                        </ul>
                     </div>
                  </div>
                  <div class="row d-flex">
                     <div class="col-lg-9 order-2 order-lg-1">
                        <h1 style="font-size: 2.5rem;">Items</h1><p class="lead text-muted"></p>
                     </div>
                  </div>
               </div>
            </section>
            <main>
               <div class="container">
                  <div class="row">
                    <!-- Grid -->
                    <div class="products-grid col-12 sidebar-none" style="padding:unset">
                      <!-- <div class="alert alert-info">
                        <strong>Info!</strong> Indicates a neutral informative change or action.
                      </div> -->
                      <div class="row" v-if="products.length == 0">
                        <p class="lead text-muted item col-xl-12 col-lg-12 col-md-12 alert alert-info" style="text-align:center;font-size: 2em;"><strong>Oops!</strong> products not available.</p>
                      </div>
                      <div class="row">
                        <!-- item-->
                        <div class="item col-xl-3 col-lg-4 col-md-6" v-for="product in products" style="background-color: #ededed;margin: 1%;max-width: 23%;">
                          <div class="product is-gray">
                            <div class="image d-flex align-items-center justify-content-center" style="margin-top: 6%;">
                              <img v-bind:src="urlimage + '/product_images/' + product.images[0].image_name" class="img-fluid"/>
                              <div class="hover-overlay d-flex align-items-center justify-content-center">
                                <div class="CTA d-flex align-items-center justify-content-center"><a @click="addToCart(product.id)" class="add-to-cart"><i class="fa fa-shopping-cart"></i></a><router-link :to="{name: 'productDetail', params: {'proId': product.id}}" class="visit-product active"><i class="icon-search"></i>View</router-link><a href="#" @click="productModel(product.name, product.amount, product.images[0].image_name, product.id)" data-toggle="modal" data-target="#exampleModal" class="quick-view"><i class="fa fa-arrows-alt"></i></a></div>
                              </div>
                            </div>
                            <div class="title"><small class="text-muted">{{product.product_category[0].category.name}}</small><router-link :to="{name: 'productDetail', params: {'proId': product.id}}">
                                <h3 class="h6 text-uppercase no-margin-bottom">{{product.name}}</h3></router-link><span class="price text-muted"><i class="fa fa-rupee"></i>{{product.amount}}</span></div>
                          </div>
                        </div>
                      </div>
                      <pagination v-model="page" :records="products.length" :per-page="20" v-if="products.length>20"></pagination>
                    </div>
                    <!-- / Grid End-->
                  </div>
               </div>
            </main>
            <!-- Overview Popup    -->
            <div v-if="exampleModal" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true" class="modal fade overview">
               <div role="document" class="modal-dialog">
               <div class="modal-content">
                  <button type="button" data-dismiss="modal" aria-label="Close" class="close" @click="close"><span aria-hidden="true"><i class="icon-close"></i></span></button>
                  <div class="modal-body"> 
                     <!-- <div class="ribbon-primary text-uppercase">Sale</div> -->
                        <div class="row d-flex align-items-center">
                           <div class="image col-lg-5" style="border-right: 1px solid;"><img v-if="productimage != ''" v-bind:src="urlimage + '/product_images/' + productimage" alt="..." class="img-fluid d-block"></div>
                           <div class="details col-lg-7">
                              <h2>{{productname}}</h2>
                              <ul class="price list-inline">
                                 <li class="list-inline-item current"><i class="fa fa-rupee"></i>{{productprice}}</li>
                              </ul>
                              <p>Food is a lot like fashion. Items may be popular for a short time or may exist indefinitely. To keep customers interested, it's important to determine what popular foods your menu is going to feature.</p>
                              <div class="d-flex align-items-center">
                                 <div class="quantity d-flex align-items-center">
                                    <div class="dec-btn" @click="minusQuantity">-</div>
                                    <input type="text" class="quantity-no" v-model="quantity">
                                    <div class="inc-btn" @click="plusQuantity">+</div>
                                 </div>
                              </div>
                              <ul class="CTAs list-inline">
                                 <li class="list-inline-item"><a @click="addToCart(proid)" class="btn btn-template wide"> <i class="fa fa-shopping-cart"></i>Add in Order</a></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import domain from '../domain_config.js'
import axios from 'axios'
export default {
  name: 'productView',
  data () {
    return {
      searchKeyWord: '',
      searchproduct: [],
      exampleModal: true,
      // plusCat: false,
      // minusCat: true,
      quantity: 1,
      page: 1,
      cartProduct: [],
      productId: [],
      urlimage: domain.domain,
      productname: '',
      productprice: '',
      productimage: '',
      proid: '',
      products: [],
      categories: [],
      selectCatFilter: [],
      prodFilterd: [],
      filterproduct: [],
      scroll_index: 0
    }
  },
  methods: {
    openProduct: function (proid) {
      window.open(this.$router.resolve({name: 'productDetail', params: {'proId': proid}}).href, '_blank')
    },
    enter: function () {
      if (this.searchproduct.length > 0) {
        this.openProduct(this.searchproduct[this.scroll_index].id)
      }
    },
    up: function() {
      if (this.searchproduct.length > 0) {
        if (this.scroll_index !== 0) {
           this.scroll_index = this.scroll_index - 1
        } else {
           this.scroll_index = this.searchproduct.length -1
        }
      }
    },
    down: function() {
      if (this.searchproduct.length > 0) {
        if (this.scroll_index < this.searchproduct.length -1) {
           this.scroll_index = this.scroll_index + 1
        } else {
           this.scroll_index = 0
        }
      }
    },
    myFunction: function () {
      if (this.searchKeyWord.trim() != '') {
        axios.get(domain.endpoint + 'searchproducts/' + this.searchKeyWord.trim()).then(response => {
          this.searchproduct = response.data.data
        })
        .catch(error => {
          console.log(error.response)
        })
      } else {
        this.searchproduct = []
      }
    },
    selectCategoryFilter: function () {
      localStorage.setItem('categoryFilter', JSON.stringify(this.selectCatFilter))
      if (this.selectCatFilter.length > 0) {
        this.prodFilterd = []
        this.filterproduct.forEach((val)=>{
          val.product_category.forEach((cat)=>{
            if(this.selectCatFilter.indexOf(cat.category.id) > -1) {
              if (this.prodFilterd.indexOf(val) > -1 == false) {
                this.prodFilterd.push(val)
              }
            }
          })
        })
        this.products = this.prodFilterd
      } else {
        this.products = this.filterproduct
      }
    },
    // filterCategory: function () {
    //   if (this.plusCat == true) {
    //     this.minusCat = true
    //     this.plusCat = false 
    //   } else {
    //     this.minusCat = false
    //     this.plusCat = true
    //   }
    // },
    productModel: function (proName, proPrice, proImage, proId) {
      this.exampleModal = true
      this.productname = proName
      this.productprice = proPrice
      this.productimage = proImage
      this.proid = proId
    },
    plusQuantity () {
      this.quantity = this.quantity+1
    },
    minusQuantity () {
      if (this.quantity != 0) {
        this.quantity = this.quantity-1
      }
    },
    close () {
      this.quantity = 1
    },
    addToCart (proId) {
      if (this.quantity != 0) {
        if (localStorage.getItem('proId')) {
          var localStorageCart = JSON.parse(localStorage.getItem('proId'))
          localStorageCart.forEach((val)=>{
            this.productId.push(val.proId)
            if (val.proId == proId) {
              this.cartProduct.push({'proId': proId, 'qty': this.quantity})
            } else {
              this.cartProduct.push(val)
            }
          })
          if (!this.productId.includes(proId)) {
            this.cartProduct.push({'proId': proId, 'qty': this.quantity})
          }
        } else {
          this.cartProduct.push({'proId': proId, 'qty': this.quantity})
        }
        localStorage.setItem('proId', JSON.stringify(this.cartProduct))
        location.reload()
      }
    },
    productCollection() {
      axios.get(domain.endpoint + 'products').then(response => {
        this.products = response.data.data
        this.filterproduct = response.data.data
        if (localStorage.getItem('categoryFilter')) {
          this.selectCatFilter = JSON.parse(localStorage.getItem('categoryFilter'))
          this.selectCategoryFilter()
        }
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    categoryCollection() {
      axios.get(domain.endpoint + 'category').then(response => {
          this.categories = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  mounted: function () {
    this.productCollection()
    this.categoryCollection()

  }
}
</script>
<style>
.VuePagination__count  {
   position: absolute;
   top: -4%;
   margin-bottom: 40px;
   align-items: flex-start!important;
   justify-content: space-between!important;
   display: flex!important;
}
.VuePagination {
  width: 100%
}
.pagination {
  justify-content: center;
}
#myInput {
  width: 96.8%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  /* margin-bottom: 12px; */
}

#myUL {
  list-style-type: none;
  padding: 0;
  margin: 0;
  /* display: none; */
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}

#myUL li a {
  border: 1px solid #ddd;
  margin-top: -1px; /* Prevent double borders */
  background-color: #f6f6f6;
  padding: 12px;
  font-size: 18px;
  color: black;
  display: block
}

#myUL li a:hover:not(.header) {
  background-color: #eee;
}

.search_pro .fa-search { 
  position: absolute;
  top: 17px;
  left: 13px;
}
.search_pro {
  position: relative;
  color: #aaa;
  font-size: 16px;
}
.act-how {
   background-color: #e5e5e5 !important;
}
</style>
