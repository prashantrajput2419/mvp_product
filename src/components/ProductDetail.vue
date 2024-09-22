<template>
   <div class="productDetail">
   	<!-- Hero Section-->
    <section class="hero hero-page gray-bg padding-small" style="padding: 31px 0 !important;">
      <div class="container">
        <div class="row d-flex">
          <div class="col-lg-9 order-2 order-lg-1">
            <h1>{{productDetail.name}}</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="product-details" style="padding: 31px 0 !important;">
      <div class="container">
        <div class="row">
          <div class="product-images col-lg-6">
            <!-- <div class="ribbon-primary text-uppercase">Sale</div> -->
            <div id="slider">
              <figure>
                <img :id="'si_' + index" v-for="(productimage, index) in productDetail.images" :src="urlimage + '/product_images/' + productimage.image_name" alt>
              </figure>
            </div>
          </div>
          <div class="details col-lg-6">
            <div class="d-flex align-items-center justify-content-between flex-column flex-sm-row">
              <ul class="price list-inline no-margin">
                <li class="list-inline-item current"><i class="fa fa-rupee"></i>{{productDetail.amount}}</li>
              </ul>
              <!-- <div class="review d-flex align-items-center">
                <ul class="rate list-inline">
                  <li class="list-inline-item"><i class="fa fa-star text-primary"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star text-primary"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star text-primary"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star text-primary"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star-o text-primary"></i></li>
                </ul><span class="text-muted">5 reviews</span>
              </div> -->
            </div>
            <p>Food is a lot like fashion. Items may be popular for a short time or may exist indefinitely. To keep customers interested, it's important to determine what popular foods your menu is going to feature.</p>
            <div class="d-flex align-items-center justify-content-center justify-content-lg-start">
              <div class="quantity d-flex align-items-center">
                <div class="dec-btn" @click="minusQuantity">-</div>
                <input type="text" class="quantity-no" v-model="quantity">
                <div class="inc-btn" @click="plusQuantity">+</div>
              </div>
            </div>
            <ul class="CTAs list-inline">
              <li class="list-inline-item"><a @click="addToCart()" class="btn btn-template wide"> <i class="icon-cart"></i>Add in Order</a></li>
            </ul>
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
  name: 'productDetail',
  data () {
    return {
      productDetail: '',
      quantity: 1,
      cartProduct: [],
      productsId: [],
      urlimage: domain.domain,
      productId: this.$route.params.proId
    }
  },
  methods: {
    plusQuantity () {
      this.quantity = this.quantity+1
    },
    minusQuantity () {
      if (this.quantity != 0) {
        this.quantity = this.quantity-1
      }
    },
    addToCart () {
      if (this.quantity != 0) {
        if (localStorage.getItem('proId')) {
          var localStorageCart = JSON.parse(localStorage.getItem('proId'))
          localStorageCart.forEach((val)=>{
            this.productsId.push(val.proId)
            if (val.proId == Number(this.$route.params.proId)) {
              this.cartProduct.push({'proId': Number(this.$route.params.proId), 'qty': this.quantity})
            } else {
              this.cartProduct.push(val)
            }
          })
          if (!this.productsId.includes(Number(this.$route.params.proId))) {
            this.cartProduct.push({'proId': Number(this.$route.params.proId), 'qty': this.quantity})
          }
        } else {
          this.cartProduct.push({'proId': Number(this.$route.params.proId), 'qty': this.quantity})
        }
        localStorage.setItem('proId', JSON.stringify(this.cartProduct))
        window.location.assign(this.$router.resolve({name: 'productView'}).href)
      }
    }
  },
  mounted: function () {
    axios.get(domain.endpoint + 'products/' + this.productId).then(proResponse => {
      this.productDetail = proResponse.data.data
    })
    .catch(error => {
      console.log(error.response)
    })
  }
}
</script>
<style>
@keyframes slidy {
0% { left: 0%; }
20% { left: 0%; }
25% { left: -100%; }
45% { left: -100%; }
50% { left: -100%; }
70% { left: -0%; }
75% { left: -0%; }
95% { left: -100%; }
100% { left: -100%; }
}

body { margin: 0; } 
div#slider { overflow: hidden; }
div#slider figure img { width: 20%; float: left; }
div#slider figure { 
  position: relative;
  width: 500%;
  margin: 0;
  left: 0;
  text-align: left;
  font-size: 0;
  animation: 15s slidy infinite; 
}
figure img {
  max-width: 350px; 
}
#slider {
  width: 57%;
}
</style>
