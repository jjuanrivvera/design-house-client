<template>
  <div>
    <!-- Section Cards -->
    <section class="authentication">
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Reste Password
        </h1>
        <form class="auth-form" @submit.prevent="submit">
          <alert-success :form="form">
            {{ status }}
            <p>
              <nuxt-link :to="{ name: 'login'}">Proceed to login</nuxt-link>
            </p>
          </alert-success>
          <div class="form-group">
            <input
              v-model="form.email"
              type="text"
              name="email"
              readonly
              :class="{ 'is-invalid': form.errors.has('email') }"
              class="form-control form-control-lg font-14 fw-300"
              placeholder="Email"
            />
            <has-error :form="form" field="email" ></has-error>
          </div>
          <div class="form-group">
            <input
              v-model="form.password"
              type="password"
              name="password"
              :class="{ 'is-invalid': form.errors.has('password') }"
              class="form-control form-control-lg font-14 fw-300"
              placeholder="New Password"
            />
            <has-error :form="form" field="password" ></has-error>
          </div>
          <div class="form-group">
            <input
              v-model="form.password_confirmation"
              type="password"
              name="password_confirmation"
              :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
              class="form-control form-control-lg font-14 fw-300"
              placeholder="Password Confirmation"
            />
            <has-error :form="form" field="password_confirmation" ></has-error>
          </div>
          <div class="text-right">
            <button
              type="submit"
              class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase form-control"
              :disabled="form.busy"
            >
              <span v-if="form.busy">
                <i class="fas fa spinner fa-spin"></i>
              </span>
              Reset password
            </button>
          </div>
          <p class="font-14 fw-400 text-center mt-4">
            <nuxt-link :to="{ name: 'login'}" class="color-blue"> Back to login</nuxt-link>
          </p>
        </form>
      </div>
    </section>
    <!-- End Cards -->
  </div>
</template>

<script>
import { Form } from 'vform'

export default {
  middleware: 'guest',
  data(){
    return {
      status: '',
      form: new Form({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      })
    }
  },
  created(){
    this.form.token = this.$route.params.token;
    this.form.email = this.$route.query.email;
  },
  methods: {
    async submit(){
      try {
        const response = await this.form.post('/password/reset');
        this.status = response.data.status;
        this.form.reset();
      } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
          this.form.errors.set(errors)
        }
      }
    }
  }
}
</script>
