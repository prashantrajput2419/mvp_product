<template>
  <!-- <div v-if="categories.length == ''">
    <section class="hero hero-page gray-bg padding-small">
         <div class="container">
           <div class="row d-flex">
             <div class="col-lg-9 order-2 order-lg-1">
               <h1 style="font-size: 2.5rem;" align="center">You have no any category.</h1>
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
               <h1 style="font-size: 2.5rem;">Categories</h1>
             </div>
             <div class="col-lg-3 order-2 order-lg-1">
               <a href="#" @click="addCategoryModel('add')" style="font-size: 1.5em;margin-top: 1%;float: right;" data-toggle="modal" data-target="#exampleModal" class="quick-view btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
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
                     <th>Id</th>
                     <th>Name</th>
                     <th>Created Date</th>
                     <th colspan="2" style="text-align:center;">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr v-for="category in limitBy(categories, 10, page * 10 - 10)">
                     <th># {{category.id}}</th>
                     <td>{{category.name}}</td>
                     <td>{{category.created_at | moment('DD/MM/YYYY')}}</td>
                     <td style="text-align:center;"><a href="javascript:void(0)" @click="categoryDelete(category.id)"><i style="font-size: 2.2em;" class="fa fa-trash" aria-hidden="true"></i></a></td>
                     <td style="text-align:center;"><a href="#" @click="categoryModel(category.name, category.id, 'edit')" data-toggle="modal" data-target="#exampleModal" class="quick-view"><i style="font-size: 2.2em;" class="fa fa-edit"></i></a></td>
                   </tr>
                   <tr v-if="categories.length == ''" align="center" style="background-color: #e5e5e5;">
                    <td colspan="4">You have no any category.</td>
                    </tr>
                 </tbody>
               </table>
              <pagination v-model="page" :records="categories.length" :per-page="10" v-if="categories.length>10"></pagination>
             </div>
           </div>
         </div>
      </section>
      <div id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true" class="modal fade overview">
         <div role="document" class="modal-dialog" style="max-width: 500px;">
          <!-- add new categoty -->
          <div class="modal-content" v-if="event == 'add'">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true"><i class="icon-close"></i></span></button>
            <div class="model-header">
              <div v-if="warning" class="alert alert-danger" style="margin: 5px 54px 0px 6px; padding: 0.55rem 1.25rem;">
                <strong>Warning!</strong> Please fill all field.
              </div>
            </div>
            <div class="modal-body" style="padding: 50px 40px;"> 
              <div class="row d-flex align-items-center">
                <div class="details col-lg-12">
                  <h4>Add New Category</h4>
                </div>
                <div class="details col-lg-12" style="margin-top: 27px;">
                  <div class="form-group">
                    <label for="name" class="form-label" style="padding-left: unset;">Category Name</label>
                    <input id="name" v-model="catname" type="text" class="form-control" style="margin-top: 8px;">
                  </div>
                  <div class="form-group text-center">
                    <button @click="saveCat()" class="btn btn-primary"><i class="fa fa-save"></i> Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- edit categoty -->
          <div class="modal-content" v-if="event == 'edit'">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true"><i class="icon-close"></i></span></button>
            <div class="model-header">
              <div v-if="warning" class="alert alert-danger" style="margin: 5px 54px 0px 6px; padding: 0.55rem 1.25rem;">
                <strong>Warning!</strong> Please fill all field.
              </div>
            </div>
            <div class="modal-body" style="padding: 50px 40px;"> 
              <div class="row d-flex align-items-center">
                <div class="details col-lg-12">
                  <h4>Update Category</h4>
                </div>
                <div class="details col-lg-12" style="margin-top: 27px;">
                  <div class="form-group">
                    <label for="name" class="form-label" style="padding-left: unset;">Category Name</label>
                    <input id="name" v-model="catname" type="text" class="form-control" style="margin-top: 8px;">
                  </div>
                  <div class="form-group text-center">
                    <button @click="updateCat()" class="btn btn-primary"><i class="fa fa-save"></i> Update</button>
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
      warning: false,
      catname: '',
      event: '',
      catid: '',
      page: 1,
      urlimage: domain.domain,
      categories: []
    }
  },
  methods: {
    categoryModel: function (catName, catId, event) {
      this.warning = false
      this.event = event
      this.exampleModal = true
      this.catname = catName
      this.catid = catId
    },
    addCategoryModel: function (event) {
      this.warning = false
      this.event = event
      this.exampleModal = true
      this.catname = ''
      this.catid = ''
    },
    categoryDelete: function (catId) {
      axios.delete(domain.endpoint + 'category/' + catId).then(response => {
        const index = this.categories.findIndex(category => category.id === catId) 
        if (~index) {
          this.categories.splice(index, 1)
        }
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    created () {
      this.categoryModel()
    },
    saveCat: function () {
      if (this.catname !== '') {
        axios.post(domain.endpoint + 'category', {'name': this.catname}).then(response => {
          axios.get(domain.endpoint + 'category').then(category => {
            this.categories = category.data
            window.$('#exampleModal').modal('hide')
            this.exampleModal = false
          })
          .catch(error => {
            console.log(error.response)
          })
        })
        .catch(error => {
          console.log(error.response)
        })
      } else {
        this.warning = true
      }
    },
    updateCat () {
      if (this.catname !== '') {
        axios.put(domain.endpoint + 'category/' + this.catid, {'name': this.catname}).then(response => {
          axios.get(domain.endpoint + 'category').then(category => {
            this.categories = category.data
            window.$('#exampleModal').modal('hide')
            this.exampleModal = false
          })
          .catch(error => {
            console.log(error.response)
          })
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
    axios.get(domain.endpoint + 'category').then(response => {
        this.categories = response.data
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
