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
   <div class="orders" v-else>
      <section class="hero hero-page gray-bg padding-small">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;">Orders</h1>
             </div>
           </div>
         </div>
      </section>
      <section class="padding-small" style="padding: 10px 0 !important;">
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
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="order in limitBy(orders, 10, page * 10 - 10)">
                     <th># {{order.id}}</th>
                     <td>{{order.created_at.date | moment('DD/MM/YYYY')}}</td>
                     <td><i class="fa fa-rupee"></i>{{order.total_amount}}</td>
                     <td><router-link :to="{name: 'counterorderdetail', params: {'orderId': order.id}}" class="btn btn-primary btn-sm">View</router-link></td>
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
      page: 1
    }
  },
  mounted: function () {
    axios.get(domain.endpoint + 'salesorders').then(orderResponse => {
      this.orders = orderResponse.data.data
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
