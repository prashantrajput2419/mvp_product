<template>
  <!-- <div v-if="orders.length == ''">
    <section class="hero hero-page gray-bg padding-small">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;" align="center">You have no any order.</h1>
             </div>
           </div>
         </div>
      </section>
  </div> -->
   <div class="orders">
      <section class="hero hero-page gray-bg padding-small">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;">Orders</h1>
             </div>
           </div>
         </div>
      </section>
      <!-- <section class="padding-small" style="padding: 10px 0 !important;">
         <div class="container">
           <div class="row">
             <div class="col-lg-8 col-xl-12 pl-lg-3" align="center">
               <table class="table table-hover table-responsive-md">
                 <thead>
                   <tr>
                     <th>Order</th>
                     <th>Date</th>
                     <th>Total</th>
                     <th>Action</th>
                     <th>Complete</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="order in limitBy(orders, 10, page * 10 - 10)">
                     <th># {{order.id}}</th>
                     <td>{{order.created_at.date | moment('DD/MM/YYYY')}}</td>
                     <td>${{order.total_amount}}</td>
                     <td><router-link :to="{name: 'adminorderdetail', params: {'orderId': order.id}}" class="btn btn-primary btn-sm">View</router-link></td>
                     <td><a href="javascript:void(0)" @click="categoryDelete(category.id)"><i style="font-size: 2.2em;" class="fa fa-trash" aria-hidden="true"></i></a></td>
                   </tr>
                   <tr v-if="orders.length == ''" align="center" style="background-color: #e5e5e5;">
                    <td colspan="4">You have no any order.</td>
                    </tr>
                 </tbody>
               </table>
              <pagination v-model="page" :records="orders.length" :per-page="10" v-if="orders.length>10"></pagination>
             </div>
           </div>
         </div>
      </section> -->
      <section class="shopping-cart" style="padding: unset;margin-bottom: 100px;">
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
                              <div class="d-flex align-items-center"><img v-bind:src="urlimage + '/product_images/' + cartproduct.product.images[0].image_name" alt="..." class="img-fluid">
                                 <div class="title">
                                   <h5>{{cartproduct.product.name}}</h5></div>
                              </div>
                           </div>
                           <div class="col-2"><span><i class="fa fa-rupee"></i>{{cartproduct.product.amount.toFixed(2)}}</span></div>
                           <div class="col-2">
                              <div class="d-flex align-items-center">
                                 <div class="quantity d-flex align-items-center">
                                    {{cartproduct.total_qty}}
                                 </div>
                              </div>
                           </div>
                           <div class="col-2"><span><i class="fa fa-rupee"></i>{{cartproduct.total_price.toFixed(2)}}</span></div>
                           <div class="col-1 text-center"><a @click="deletePro(cartproduct.id)" class="delete"><i class="delete fa fa-trash"></i><!-- <i class="fa fa-check" aria-hidden="true"></i> --></a></div>
                        </div>
                     </div>
                      <div v-if="cartproducts.length <= 0" align="center" style="background-color: #e5e5e5;">
                        <div colspan="4">You have no any order.</div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
         <!-- <div class="container">
            <div class="CTAs d-flex align-items-center justify-content-center justify-content-md-end flex-column flex-md-row"><router-link :to="{name: 'productView'}" class="btn btn-template-outlined wide">Continue Shopping</router-link></div>
         </div> -->
      </section>
   </div>
</template>
<script>
import axios from 'axios'
import domain from '../../domain_config.js'
import Vue2Filters from 'vue2-filters'
export default {
  name: 'adminorders',
  mixins: [Vue2Filters.mixin],
  data () {
    return {
      orders: '',
      page: 1,
      cartproducts: [],
      urlimage: domain.domain
    }
  },
  methods: {
    deletePro (id) {
      axios.delete(domain.endpoint + 'kitchenproduct/' + id).then(response => {
        location.reload()
      })
      .catch(error => {
        console.log(error.response)
      })
    }
  },
  mounted: function () {
    axios.get(domain.endpoint + 'kitchenproduct').then(orderResponse => {
      this.cartproducts = orderResponse.data.data
    })
    .catch(error => {
      console.log(error.response)
    })
  }
}
</script>
<style>
.VuePagination__count  {
   position: absolute;
   top: -8%;
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
</style>
