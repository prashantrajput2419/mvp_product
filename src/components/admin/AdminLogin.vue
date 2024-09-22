<template>
	<div class="adminlogin">
		<section class="padding-small">
			<div class="container">
				<div class="row">
				  <div class="col-lg-12">
				  	 <div class="block col-lg-3" style="float: left;"></div>
					 <div class="block col-lg-6" style="float: left;">
					 	<div class="block-header" style="text-align: center;">
						  <img src="@/assets/logo-epos.png" style="height: 150px;" />
						</div>
						<div class="block-header" style="text-align: center;">
						  <h5>Login</h5>
						</div>
						<div class="block-body">
						  <!-- <form> -->
							 <div class="form-group">
								<label for="email" class="form-label">Email</label>
								<input v-model="email" type="text" class="form-control">
							 </div>
							 <div class="form-group">
								<label for="password" class="form-label">Password</label>
								<input v-model="password" type="password" class="form-control">
							 </div>
							 <div class="form-group text-center">
								<button @click="login()" class="btn btn-primary"><i class="fa fa-sign-in"></i> Log in</button>
							 </div>
						  <!-- </form> -->
						</div>
					 </div>
				  </div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
import axios from 'axios'
import domain from '../../domain_config.js'
// import Vue2Filters from 'vue2-filters'
export default {
  name: 'adminlogin',
  // mixins: [Vue2Filters.mixin],
  data () {
    return {
      email: 'kaushal@gmail.com',
  		password: 'india123'
    }
  },
  methods: {
   login: function () {
		if (this.email == 'kaushal@gmail.com' && this.password == 'india123') {
 			localStorage.setItem('is_login', 'true')
 			window.location.assign(this.$router.resolve({name: 'admindashboard'}).href)
		}
   }
  }
}
</script>
