<template>
   <div class="ordersdetail">
    <section class="hero hero-page gray-bg padding-small">
      <div class="container" v-if="orders != ''">
        <div class="row d-flex">
          <div class="col-lg-9 order-2 order-lg-1">
            <h1 style="font-size: 2.5rem;">Order #{{orders.id}}</h1><p class="lead">Order #{{orders.id}} was created on <strong>{{orders.created_at.date | moment('DD/MM/YYYY')}}</strong> and is currently <strong>Being prepared</strong>.</p><p class="text-muted">If you have any questions, please feel free to <a href="#">contact us</a>, our customer service center is working for you 24/7.</p>
          </div>
          <div class="col-lg-3 text-right order-1 order-lg-2">
            <ul class="breadcrumb justify-content-lg-end">
              <li class="breadcrumb-item active">Order #{{orders.id}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="padding-small" style="padding: 36px 0 !important;">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-xl-12 pl-lg-3">
            <div class="basket basket-customer-order">
              <div class="basket-holder">
                <div class="basket-header">
                  <div class="row">
                    <div class="col-6">Product</div>
                    <div class="col-2">Price</div>
                    <div class="col-2">Quantity</div>
                    <div class="col-2 text-right">Total</div>
                  </div>
                </div>
                <div class="basket-body">
                  <!-- Product-->
                  <div class="item" v-for="product in orders.sales_product">
                    <div class="row d-flex align-items-center">
                      <div class="col-6">
                        <div class="d-flex align-items-center"><img v-bind:src="urlimage + '/product_images/' + product.product.images[0].image_name" alt="..." class="img-fluid">
                          <div class="title"><router-link :to="{name: 'productDetail', params: {'proId': product.product_id}}">
                              <h6>{{product.product.name}}</h6></router-link></div>
                        </div>
                      </div>
                      <div class="col-2"><span><i class="fa fa-rupee"></i>{{product.product.amount}}</span></div>
                      <div class="col-2">{{product.total_qty}}</div>
                      <div class="col-2 text-right"><span><i class="fa fa-rupee"></i>{{product.total_price}}</span></div>
                    </div>
                  </div>
                </div>
                <div class="basket-footer">
                  <div class="item">
                    <div class="row">
                      <div class="offset-md-6 col-4"> <strong>Order subtotal</strong></div>
                      <div class="col-2 text-right"><strong><i class="fa fa-rupee"></i>{{orders.total_amount}}</strong></div>
                    </div>
                  </div>
                  <!-- <div class="item">
                    <div class="row">
                      <div class="offset-md-6 col-4"> <strong>Shipping and handling</strong></div>
                      <div class="col-2 text-right"><strong>$10.00</strong></div>
                    </div>
                  </div> -->
                  <div class="item">
                    <div class="row">
                      <div class="offset-md-6 col-4"> <strong>Tax</strong></div>
                      <div class="col-2 text-right"><strong><i class="fa fa-rupee"></i>0.00</strong></div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="row">
                      <div class="offset-md-6 col-4"> <strong>Total</strong></div>
                      <div class="col-2 text-right"><strong><i class="fa fa-rupee"></i>{{orders.total_amount + 10}}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12 text-center CTAs" v-if="orders.status != 'complete'">
            <router-link :to="{name: 'productView'}" style="margin-right: 26px; padding: 0.7rem 3.45rem" class="btn btn-template-outlined wide">Continue Shopping</router-link>
            <a @click="saveOrder()" class="btn btn-template btn-lg wide" style="margin-right: 26px;"><i class="fa fa-long-arrow-left"></i>Place To Counter</a>
            <!-- <a @click="kitchenOrder()" class="btn btn-template btn-lg wide">Place To Kitchen<i class="fa fa-long-arrow-right"></i></a> -->
          </div>
        </div>
      </div>
    </section>
   </div>
</template>
<script>
import axios from 'axios'
import domain from '../domain_config.js'
export default {
  name: 'orders',
  data () {
    return {
      orders: '',
      saveorder: {
         total_amount: '',
         product: []
      },
      kitchenorderstatus: {
         status: 'complete'
      },
      productDetail: [],
      urlimage: domain.domain,
      orderId: this.$route.params.orderId
    }
  },
  methods: {
    saveOrder: function () {
      this.saveorder.total_amount = this.orders.total_amount
      this.saveorder.product = this.orders.sales_product
      axios.put(domain.endpoint + 'kitchenorderstatus/' + this.orderId, this.kitchenorderstatus).then(pro => {
         
          axios.post(domain.endpoint + 'salesorders', this.saveorder).then(proResponse => {
            localStorage.removeItem('orderId')
             window.location.assign(this.$router.resolve({name: 'orders'}).href)
          })
          .catch(error => {
           console.log(error.response)
          })
      })
      .catch(error => {
      console.log(error.response)
     })
    },
  },
  mounted: function () {
    axios.get(domain.endpoint + 'kitchenorders/' + this.orderId).then(orderResponse => {
      this.orders = orderResponse.data.data
    })
    .catch(error => {
      console.log(error.response)
    })
  }
}
</script>
