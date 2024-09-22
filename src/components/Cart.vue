<template>
   <div>
      <!-- Hero Section-->
      <section class="hero hero-page gray-bg padding-small">
         <div class="container">
            <div class="row d-flex">
               <div class="col-lg-9 order-2 order-lg-1">
                  <h1 style="font-size: 2.5rem;">Order Items</h1><p class="lead text-muted">You currently have {{totalProduct}} items in your shopping cart</p>
               </div>
            </div>
         </div>
      </section>
      <!-- Shopping Cart Section-->
      <section class="shopping-cart" style="padding: unset;">
         <div class="container">
            <div class="basket">
               <div class="basket-holder">
                  <div class="basket-header">
                     <div class="row">
                        <div class="col-5">Product</div>
                        <div class="col-2">Price</div>
                        <div class="col-2">Quantity</div>
                        <div class="col-2">Total</div>
                        <div class="col-1 text-center">Remove</div>
                     </div>
                  </div>
                  <div class="basket-body">
                    <!-- Product-->
                     <div class="item" v-for="(cartproduct, index) in cartproducts">
                        <div class="row d-flex align-items-center">
                           <div class="col-5">
                              <div class="d-flex align-items-center"><img v-bind:src="urlimage + '/product_images/' + cartproduct.images[0].image_name" alt="..." class="img-fluid">
                                 <div class="title"><a @click="showProduct(cartproduct.id)" style="cursor: pointer;">
                                   <h5>{{cartproduct.name}}</h5></a></div>
                              </div>
                           </div>
                           <div class="col-2"><span><i class="fa fa-rupee"></i>{{cartproduct.amount.toFixed(2)}}</span></div>
                           <div class="col-2">
                              <div class="d-flex align-items-center">
                                 <div class="quantity d-flex align-items-center">
                                    {{cartproduct.total_qty}}
                                 </div>
                              </div>
                           </div>
                           <div class="col-2"><span><i class="fa fa-rupee"></i>{{cartproduct.total_price.toFixed(2)}}</span></div>
                           <div class="col-1 text-center"><a @click="deletePro(cartproduct.id)" class="delete"><i class="delete fa fa-trash"></i></a></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <!-- <div class="container">
            <div class="CTAs d-flex align-items-center justify-content-center justify-content-md-end flex-column flex-md-row"><router-link :to="{name: 'productView'}" class="btn btn-template-outlined wide">Continue Shopping</router-link></div>
         </div> -->
      </section>
      <!-- Order Details Section-->
      <section class="order-details no-padding-top">
         <div class="container">
            <div class="row">
               <div class="col-lg-6"></div>
               <!-- <div class="col-lg-6">
                  <div class="block">
                     <div class="block-header">
                        <h6 class="text-uppercase">Order Summary</h6>
                     </div>
                     <div class="block-body">
                        <p>Shipping and additional costs are calculated based on values you have entered.</p>
                        <ul class="order-menu list-unstyled">
                           <li class="d-flex justify-content-between"><span>Order Subtotal </span><strong><i class="fa fa-rupee"></i>{{totalPrice.reduce((acc, item) => acc + item, 0).toFixed(2)}}</strong></li>
                           <li class="d-flex justify-content-between"><span>Shipping and handling</span><strong><i class="fa fa-rupee"></i>10.00</strong></li>
                           <li class="d-flex justify-content-between"><span>Total</span><strong class="text-primary price-total"><i class="fa fa-rupee"></i>{{(totalPrice.reduce((acc, item) => acc + item, 0) + 10).toFixed(2)}}</strong></li>
                        </ul>
                     </div>
                  </div>
               </div> -->
               <div class="col-lg-12 text-center CTAs">
                <!-- <a @click="saveOrder()" class="btn btn-template btn-lg wide" style="margin-right: 26px;"><i class="fa fa-long-arrow-left"></i>Place To Counter</a> -->
                <router-link :to="{name: 'productView'}" style="margin-right: 26px; padding: 0.7rem 3.45rem" class="btn btn-template-outlined wide">Continue For Order</router-link><a @click="kitchenOrder()" class="btn btn-template btn-lg wide">Place To Kitchen<i class="fa fa-long-arrow-right"></i></a></div>
            </div>
         </div>
      </section>
   </div>
</template>
<script>
import axios from 'axios'
import domain from '../domain_config.js'
export default {
  name: 'cart',
  data () {
    return {
      orders: '',
      cartproducts: [],
      totalProduct: '',
      priceTotal: '',
      totalPrice: [],
      saveorder: {
         total_amount: '',
         status: 'pending',
         product: []
      },
      removeProduct: [],
      urlimage: domain.domain
    }
  },
  methods: {
    showProduct: function (proId) {
      window.location.assign(this.$router.resolve({name: 'productDetail', params: {'proId': proId}}).href)
    },
    deletePro: function (proId) {
      var localStorageCart = JSON.parse(localStorage.getItem('proId'))
      localStorageCart.forEach((val)=>{
        if (val.proId != proId) {
          this.removeProduct.push(val)
        }
      })
      localStorage.setItem('proId', JSON.stringify(this.removeProduct))
      location.reload()
    },
    saveOrder: function () {
      this.priceTotal = this.totalPrice.reduce((acc, item) => acc + item, 0)
      this.saveorder.total_amount = this.priceTotal
      this.saveorder.product = this.cartproducts
      axios.post(domain.endpoint + 'salesorders', this.saveorder).then(proResponse => {
         localStorage.removeItem('proId')
         window.location.assign(this.$router.resolve({name: 'ordersdetail', params: {'orderId': proResponse.data.id}}).href)
      })
      .catch(error => {
       console.log(error.response)
      })
    },
    kitchenOrder: function () {
      this.priceTotal = this.totalPrice.reduce((acc, item) => acc + item, 0)
      this.saveorder.total_amount = this.priceTotal
      this.saveorder.product = this.cartproducts
      if (localStorage.getItem('orderId')) {
        // if (this.orders.sales_product) {

        // }
        axios.post(domain.endpoint + 'kitchenproduct', this.saveorder.product).then(kichenResponse => {
         })
        .catch(error => {
         console.log(error.response)
        })
        this.orders.sales_product.forEach((val)=>{
          this.saveorder.product.forEach((val1)=>{
            if (val.product_id == val1.product_id) {
              var qty = val.total_qty + val1.total_qty
              val1.total_qty = val.total_qty + val1.total_qty
              // var total_price = qty * 
              var price = qty * val.product.amount
              val1.total_price = price
            }
          })
        })
        // console.log(this.saveorder.product)
        this.saveorder.total_amount = this.priceTotal + this.orders.total_amount
        axios.put(domain.endpoint + 'kitchenorders/' + localStorage.getItem('orderId'), this.saveorder).then(proResponse => {
          console.log(proResponse)
         localStorage.removeItem('proId')
         localStorage.setItem('orderId', proResponse.data.id)
         window.location.assign(this.$router.resolve({name: 'ordersdetail', params: {'orderId': proResponse.data.id}}).href)
         // window.location.assign(this.$router.resolve({name: 'productView'}).href)
        })
        .catch(error => {
         console.log(error.response)
        })
      } else {
        axios.post(domain.endpoint + 'kitchenorders', this.saveorder).then(proResponse => {
         localStorage.removeItem('proId')
         localStorage.setItem('orderId', proResponse.data.id)
         window.location.assign(this.$router.resolve({name: 'ordersdetail', params: {'orderId': proResponse.data.id}}).href)
        })
        .catch(error => {
         console.log(error.response)
        })
      }
    }
  },
  mounted: function () {
    if (localStorage.getItem('proId')) {
      this.totalProduct = JSON.parse(localStorage.getItem('proId')).length
      if (this.totalProduct > 0) {
         JSON.parse(localStorage.getItem('proId')).forEach((val)=>{
           axios.get(domain.endpoint + 'products/' + val.proId).then(proResponse => {
             this.cartproducts.push(Object.assign(proResponse.data.data, { 'product_id': val.proId, 'total_qty': val.qty }, {'total_price': val.qty * proResponse.data.data.amount}))
             this.totalPrice.push(val.qty * proResponse.data.data.amount)
           })
           .catch(error => {
             console.log(error.response)
           })
         })
         if (localStorage.getItem('orderId')) {
            axios.get(domain.endpoint + 'kitchenorders/' + localStorage.getItem('orderId')).then(orderResponse => {
              this.orders = orderResponse.data.data
              // this.orders.sales_product.forEach((val)=>{
              //   axios.get(domain.endpoint + 'products/' + val.product_id).then(proResponse => {
              //     this.productDetail.push(Object.assign(proResponse.data.data, {'qty': val.total_qty}, {'total_price': val.total_price}))
              //   })
              // })
            })
            .catch(error => {
              console.log(error.response)
            })
          }
      } else {
         window.location.assign(this.$router.resolve({name: 'productView'}).href)
      }
    } else {
      window.location.assign(this.$router.resolve({name: 'productView'}).href)
    }
  }
}
</script>
