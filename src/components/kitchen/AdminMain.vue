<template>
   <div class="adminmain">
      <!-- navbar-->
      <header class="header">
         <nav class="navbar navbar-expand-lg">
           <div class="search-area">
             <div class="search-area-inner d-flex align-items-center justify-content-center">
               <div class="close-btn"><i class="icon-close"></i></div>
               <form action="#">
                 <div class="form-group">
                   <input type="search" name="search" id="search" placeholder="What are you looking for?">
                   <button type="submit" class="submit"><i class="icon-search"></i></button>
                 </div>
               </form>
             </div>
           </div>
           <div class="container-fluid">  
             <!-- Navbar Header  --><router-link :to="{name: 'kitchenorders'}" class="navbar-brand"><img src="@/assets/logo-epos.png" style="height: 119px;width: 166px;" /></router-link>
             <button type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>
             <!-- Navbar Collapse -->
             <div id="navbarCollapse" class="collapse navbar-collapse">
               <ul class="navbar-nav mx-auto">
                 <!-- <li class="nav-item"><router-link :to="{name: 'kitchenorders'}" class="nav-link">All Orders</router-link></li> -->
                 <!-- <li class="nav-item"><router-link :to="{name: 'adminproduct'}" class="nav-link">Products</router-link></li>
                 <li class="nav-item"><router-link :to="{name: 'admincategory'}" class="nav-link">Categories</router-link> --></li>
               </ul>
               <div class="right-col d-flex align-items-lg-center flex-column flex-lg-row">
                 <div class="cart dropdown show"><a id="cartdetails" @click="logout()" href="https://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-toggle"><i class="fa fa-sign-out" aria-hidden="true" style="font-size: 2em;"></i></a>
                   <!-- <div aria-labelledby="cartdetails" class="dropdown-menu"> -->
                     <!-- cart item-->
                     <!-- <div class="dropdown-item cart-product">
                       <div class="d-flex align-items-center"> -->
                         <!-- <div class="img"><img v-bind:src="urlimage + '/product_images/' + cartproduct.images[0].image_name" alt="..." class="img-fluid"></div> -->
                         <!-- <div class="details d-flex justify-content-between">
                           <div class="text"> <a @click="showProduct(cartproduct.id)" style="cursor: pointer;"><strong>{{cartproduct.name}}</strong></a><small>Quantity: {{cartproduct.qty}} </small><span class="price">${{cartproduct.amount}} </span><small>Total Price: ${{cartproduct.amount * cartproduct.qty}} </small></div><a @click="deletePro(cartproduct.id)" class="delete"><i class="fa fa-trash-o"></i></a>
                         </div> -->
                       <!-- </div>
                     </div> -->
                     <!-- total price-->
                     <!-- <div class="dropdown-item total-price d-flex justify-content-between"><span>Total</span><strong class="text-primary">${{totalPrice.reduce((acc, item) => acc + item, 0)}}</strong></div> -->
                     <!-- call to actions-->
                     <!-- <div class="dropdown-item CTA d-flex"><router-link :to="{name: 'cart'}" class="btn btn-template wide">View Cart</router-link></div>
                   </div> -->
                 </div>
               </div>
             </div>
           </div>
         </nav>
      </header>
      <router-view></router-view>
      <!-- Footer-->
      <!-- <footer class="main-footer">
         <div class="services-block">
           <div class="container">
             <div class="row">
               <div class="col-lg-4 d-flex justify-content-center justify-content-lg-start">
                 <div class="item d-flex align-items-center">
                   <div class="icon"><i class="icon-truck"></i></div>
                   <div class="text">
                     <h6 class="no-margin text-uppercase">Free shipping &amp; return</h6><span>Free Shipping over $300</span>
                   </div>
                 </div>
               </div>
               <div class="col-lg-4 d-flex justify-content-center">
                 <div class="item d-flex align-items-center">
                   <div class="icon"><i class="icon-coin"></i></div>
                   <div class="text">
                     <h6 class="no-margin text-uppercase">Money back guarantee</h6><span>30 Days Money Back Guarantee</span>
                   </div>
                 </div>
               </div>
               <div class="col-lg-4 d-flex justify-content-center">
                 <div class="item d-flex align-items-center">
                   <div class="icon"><i class="icon-headphones"></i></div>
                   <div class="text">
                     <h6 class="no-margin text-uppercase">020-800-456-747</h6><span>24/7 Available Support</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div class="main-block">
           <div class="container">
             <div class="row">
               <div class="info col-lg-4">
                 <div class="logo"><img src="https://d19m59y37dris4.cloudfront.net/hub/1-4-0/img/logo-white.png" alt="..."></div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                 <ul class="social-menu list-inline">
                   <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fa fa-twitter"></i></a></li>
                   <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fa fa-facebook"></i></a></li>
                   <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fa fa-instagram"></i></a></li>
                   <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fa fa-pinterest"></i></a></li>
                   <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fa fa-vimeo"></i></a></li>
                 </ul>
               </div>
               <div class="site-links col-lg-2 col-md-6">
                 <h5 class="text-uppercase">Shop</h5>
                 <ul class="list-unstyled">
                   <li> <a href="#">For Women</a></li>
                   <li> <a href="#">For Men</a></li>
                   <li> <a href="#">Stores</a></li>
                   <li> <a href="#">Our Blog</a></li>
                   <li> <a href="#">Shop</a></li>
                 </ul>
               </div>
               <div class="site-links col-lg-2 col-md-6">
                 <h5 class="text-uppercase">Company</h5>
                 <ul class="list-unstyled">
                   <li> <a href="#">Login</a></li>
                   <li> <a href="#">Register</a></li>
                   <li> <a href="#">Wishlist</a></li>
                   <li> <a href="#">Our Products</a></li>
                   <li> <a href="#">Checkouts</a></li>
                 </ul>
               </div>
               <div class="newsletter col-lg-4">
                 <h5 class="text-uppercase">Daily Offers & Discounts</h5>
                 <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
                 <form action="#" id="newsletter-form">
                   <div class="form-group">
                     <input type="email" name="subscribermail" placeholder="Your Email Address">
                     <button type="submit"> <i class="fa fa-paper-plane"></i></button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
         <div class="copyrights">
           <div class="container">
             <div class="row d-flex align-items-center">
               <div class="text col-md-6">
                 <p>&copy; 2018<a href="https://ondrejsvestka.cz" target="_blank">Ondrej Svestka </a> All rights reserved.</p>
               </div>
               <div class="payment col-md-6 clearfix">
                 <ul class="payment-list list-inline-item pull-right">
                   <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/hub/1-4-0/img/visa.svg" alt="..."></li>
                   <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/hub/1-4-0/img/mastercard.svg" alt="..."></li>
                   <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/hub/1-4-0/img/paypal.svg" alt="..."></li>
                   <li class="list-inline-item"><img src="https://d19m59y37dris4.cloudfront.net/hub/1-4-0/img/western-union.svg" alt="..."></li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
      </footer> -->
   </div>
</template>
<script>
import axios from 'axios'
import domain from '../../domain_config.js'
export default {
  name: 'adminmain',
  methods: {
   logout: function () {
      localStorage.removeItem('is_login')
      this.$router.push({name: 'kitchenLogin'})
   }
  }
}
</script>
