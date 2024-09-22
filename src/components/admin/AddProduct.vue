<template>
   <div>
      <section class="hero hero-page gray-bg padding-small" style="padding: 26px 0 !important;">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;">Add Products</h1>
             </div>             
           </div>
         </div>
      </section>
      <section class="hero hero-page gray-bg padding-small" style="padding: 30px 0 !important;">
         <div id="snackbar" v-if="snackbar" v-bind:style="{ background: activeColor }">{{ message }}</div>
         <div class="row justify-content-sm-center">
            <div class="col-sm-4 col-sm-offset-8">
               <div class="form-group">
                  <label for="name" class="form-label">Product Name</label>
                  <input id="name" type="text" v-model="productname" class="form-control">
               </div>
               <div class="form-group">
                  <label for="amount" class="form-label">Amount</label>
                  <input id="amount" type="text" v-model="productprice" class="form-control">
               </div>
               <div class="form-group">
                  <label for="images" class="form-label">Images</label>
                  <input id="images" ref="myFileInput" type="file" v-on:change="onFileChange" class="form-control" multiple="multiple">
               </div>
               <div class="form-group">
                  <label for="images" class="form-label">Select Category</label>
                  <multiselect v-model="selectcat" placeholder="Search and select category" label="name" track-by="code" :options="options" :multiple="true"></multiselect>
               </div>
               <div class="col-sm-12 text-center" style="margin-top: 37px;">
                  <button @click="saveProduct()" class="btn btn-primary"><i class="fa fa-save"></i>Save product</button>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>
<script>
import domain from '../../domain_config.js'
import axios from 'axios'
export default {
  name: 'addproduct',
  data () {
    return {
      productname: '',
      productprice: '',
      snackbar: false,
      message: '',
      activeColor: '#f54d4d',
      saveproduct: {
         name: '',
         amount: '',
         images: [],
         category: []
      },
      createImage: [],
      categories: [],
      selectcat: [],
      options: []
    }
  },
  methods: {
    saveProduct () {
      if (this.productname != '' && this.productprice != '' && this.saveproduct.images.length > 0 && this.selectcat.length > 0) {
         this.saveproduct.name = this.productname
         this.saveproduct.amount = this.productprice
         this.saveproduct.category = this.selectcat
         let vm = this
         axios.post(domain.endpoint + 'products', this.saveproduct).then(response => {
           this.productname = ''
           this.productprice = ''
           this.selectcat = []
           this.$refs.myFileInput.value = ''
           this.snackbar = true
           this.activeColor = 'green'
           this.message = 'Product create successfully.'
           setTimeout(function () { vm.snackbar = false }, 2000)
         })
         .catch(error => {
           console.log(error.response)
         })
      } else {
        this.activeColor = 'red'
        this.snackbar = true
        this.message = 'Please fill all field.'
        let vm = this
        setTimeout(function () { vm.snackbar = false }, 2000)
      }
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
    }
  },
  mounted: function () {
    // body...
    axios.get(domain.endpoint + 'category').then(response => {
      this.categories = response.data
      response.data.forEach((val)=>{
        this.options.push({'name': val.name, 'code': val.id})
      })
    })
    .catch(error => {
      console.log(error.response)
    })
  }
}
</script>
<style type="text/css">
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

