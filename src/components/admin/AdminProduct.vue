<template>
  <!-- <div v-if="products.length == ''">
    <section class="hero hero-page gray-bg padding-small">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;" align="center">You have no any product.</h1>
             </div>
           </div>
         </div>
      </section>
  </div> -->
   <div class="orders" v-else>
      <section class="hero hero-page gray-bg padding-small">
         <div id="snackbar" v-if="snackbar" v-bind:style="{ background: activeColor }">{{ message }}</div>
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;">Products</h1>
             </div>
             <div class="col-lg-3 order-2 order-lg-1">
               <router-link :to="{name: 'addproduct'}" style="font-size: 1.5em;margin-top: 1%;float: right;" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></router-link>
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
                     <th>Product</th>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Amount</th>
                     <th>Date</th>
                     <th colspan="2" style="text-align:center;">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="product in limitBy(products, 10, page * 10 - 10)">
                     <th># {{product.id}}</th>
                     <th><img v-bind:src="urlimage + '/product_images/' + product.images[0].image_name" class="img-fluid" width="70"/></th>
                     <td>{{product.name}}</td>
                     <td><i class="fa fa-rupee"></i>{{product.amount}}</td>
                     <td>{{product.created_at.date | moment('DD/MM/YYYY')}}</td>
                     <td style="text-align:center;"><a href="#" @click="productModel(product.name, product.amount, product.images, product.id, product.product_category, 'view')" data-toggle="modal" data-target="#exampleModal" class="quick-view btn btn-primary btn-sm">View</a></td>
                     <td style="text-align:center;"><a href="#" @click="productModel(product.name, product.amount, product.images, product.id, product.product_category, 'edit')" data-toggle="modal" data-target="#exampleModal" class="quick-view"><i style="font-size: 2.2em;" class="fa fa-edit"></i></a></td>
                   </tr>
                   <tr v-if="products.length == ''" align="center" style="background-color: #e5e5e5;">
                     <td colspan="6">You have no any product.</td>
                   </tr>
                 </tbody>
               </table>
              <pagination v-model="page" :records="products.length" :per-page="10" v-if="products.length>10"></pagination>
             </div>
           </div>
         </div>
      </section>
      <div v-if="exampleModal" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true" class="modal fade overview">
         <div role="document" class="modal-dialog" style="max-width: 500px;">
          <div class="modal-content" v-if="event == 'view'">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true"><i class="icon-close"></i></span></button>
            <div class="modal-body"> 
              <div class="ribbon-primary text-uppercase">Sale</div>
              <div class="row d-flex align-items-center">
                <div class="image col-lg-5"><img v-if="productimage != ''" v-bind:src="urlimage + '/product_images/' + productimage['0'].image_name" alt="..." class="img-fluid d-block" width="160" style="height: 200px;"></div>
                <div class="details col-lg-7">
                  <h2>{{productname}}</h2>
                  <ul class="price list-inline">
                    <li class="list-inline-item current"><i class="fa fa-rupee"></i>{{productprice}}</li>
                  </ul>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                  <!-- <ul class="CTAs list-inline">
                    <li class="list-inline-item"><a class="btn btn-template wide"> <i class="fa fa-shopping-cart"></i>Add to Cart</a></li>
                  </ul> -->
                </div>
              </div>
            </div>
          </div>
          <!-- edit product -->
          <div class="modal-content" v-if="event == 'edit'">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true"><i class="icon-close"></i></span></button>
            <div class="model-header">
              <div v-if="warning" class="alert alert-danger" style="margin: 5px 54px 0px 6px; padding: 0.55rem 1.25rem;">
                <strong>Warning!</strong> Please fill all field.
              </div>
            </div>
            <div class="modal-body"> 
              <!-- <div class="ribbon-primary text-uppercase">Sale</div> -->
              <div class="row d-flex align-items-center">
                <div class="details col-lg-12">
                  <!-- <ul class="CTAs list-inline">
                    <li class="list-inline-item"><a class="btn btn-template wide"> <i class="fa fa-shopping-cart"></i>Add to Cart</a></li>
                  </ul> -->
                  <div class="form-group">
                    <label for="name" class="form-label">Product Name</label>
                    <input id="name" v-model="productname" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="amount" class="form-label">Amount</label>
                    <input id="amount" v-model="productprice" type="text" class="form-control">
                  </div>
                  <div class="form-group">
                    <label for="images" class="form-label">Images</label>
                    <input id="images" ref="myFileInput" type="file" v-on:change="onFileChange" class="form-control" multiple="multiple">
                  </div>
                  <div class="form-group">
                    <label for="images" class="form-label">Select Category</label>
                    <!-- <select class="form-control" multiple="multiple" v-model="selectcat" style="border-radius: 0;">
                      <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                    </select> -->
                    <multiselect v-model="selectcat" placeholder="Search and select category" label="name" track-by="code" :options="options" :multiple="true"></multiselect>
                   </div>
                   <div class="form-group" v-if="productimage.length > 0" style="display: flex;">
                      <div v-for="image in productimage" style="margin-left: 11px; background-color: #e7e7e7;">
                        <i class="fa fa-window-close" aria-hidden="true" style="cursor: pointer;" @click="removeImage(image.id, proid)"></i>
                        <img v-bind:src="urlimage + '/product_images/' + image.image_name" alt="..." class="img-fluid d-block" width="70" style="height: 100px;">
                      </div>
                   </div>
                  <div class="form-group text-center">
                    <button @click="saveProduct()" class="btn btn-primary"><i class="fa fa-save"></i> Save</button>
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
import domain from '../../domain_config.js'
import axios from 'axios'
import Vue2Filters from 'vue2-filters'
export default {
  name: 'adminproduct',
  mixins: [Vue2Filters.mixin],
  data () {
    return {
      exampleModal: true,
      productname: '',
      productprice: '',
      productimage: [],
      event: '',
      proid: '',
      saveproduct: {
         name: '',
         amount: '',
         images: [],
         category: []
      },
      page: 1,
      urlimage: domain.domain,
      products: [],
      categories: [],
      selectcat: [],
      snackbar: false,
      message: '',
      activeColor: '#f54d4d',
      warning: false,
      options: []
    }
  },
  methods: {
    productModel: function (proName, proPrice, proImage, proId, category, event) {
      this.warning = false
      this.event = event
      this.exampleModal = true
      this.productname = proName
      this.selectcat = []
      this.options = []
      this.productprice = proPrice
      this.productimage = []
      this.categories.forEach((val)=>{
        this.options.push({'name': val.name, 'code': val.id})
      })
      proImage.forEach((val)=>{
        this.productimage.push(val)
      })
      category.forEach((val)=>{
        this.selectcat.push({'name': val.category.name, 'code': val.category.id})
      })
      this.proid = proId
    },
    productCollection() {
      axios.get(domain.endpoint + 'products').then(response => {
        this.products = response.data.data
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
    },
    removeImage (imageId, proid) {
      axios.delete(domain.endpoint + 'productimages/' + imageId).then(response => {
        axios.get(domain.endpoint + 'products/' + proid).then(response => {
          this.productimage = []
          response.data.data.images.forEach((val)=>{
            this.productimage.push(val)
          })
        })
        .catch(error => {
          console.log(error.response)
        })
        // category collection
        this.productCollection()
        this.categoryCollection()
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      let vm = this
      if (files.length) {
         for (var i = 0; i < files.length; i++) {
            let reader = new FileReader()
            reader.onload = (e) => {
               vm.saveproduct.images.push(e.target.result)
            }
            reader.readAsDataURL(files[i])
         }
      }
    },
    saveProduct () {
      this.saveproduct.name = this.productname
      this.saveproduct.amount = this.productprice
      this.saveproduct.category = this.selectcat
      if (this.productname != '' && this.productprice != '' && this.selectcat.length > 0) {
        axios.put(domain.endpoint + 'products/' + this.proid, this.saveproduct).then(response => {
          this.productname = ''
          this.productprice = ''
          this.saveproduct.images = []
          this.selectcat = []
          this.options = []
          this.productimage = []
          this.$refs.myFileInput.value = ''
          window.$('#exampleModal').modal('hide')
          // reactive product
          this.productCollection()
          this.categoryCollection()
          this.snackbar = true
          this.activeColor = 'green'
          this.message = 'Product successfully updated.'
          let vm = this
          setTimeout(function () { vm.snackbar = false }, 2000)
        })
        .catch(error => {
          console.log(error.response)
        })
      } else {
        this.warning = true
      }
    }
  },
  mounted: function () {
    // body...
    this.productCollection()
    this.categoryCollection()
  }
}
</script>
<style type="text/css">
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
#snackbar {
 min-width: 383px;
 margin-left: -187px;
 background-color: #f54d4d;
 color: #fff;
 text-align: center;
 border-radius: 2px;
 padding: 16px;
 position: fixed;
 z-index: 1;
 left: 49%;
 margin-top: 5%;
 /* bottom: 30px; */
 font-size: 17px;
 bottom:100px;
}

#snackbar {
 visibility: visible;
 -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
 animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
.multiselect__content-wrapper {
  background: #e1e1e1 !important
}
.multiselect__tags {
  border-radius: 30px;
  padding: 13px 24px 5px 21px;
  border: 1px solid #ddd;
  font-size: 16px;
  font-weight: 300;
}
.multiselect__select {
  padding: none !important;
  height: 51px; 
}
</style>
