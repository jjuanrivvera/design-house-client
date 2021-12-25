<template>
  <div>
    <!-- Section Cards -->
    <section class="authentication">
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Login
        </h1>
        <form class="auth-form" @submit.prevent="submit">
          <alert-error v-if="form.errors.has('message')" :form="form">
            {{ form.errors.get('message') }}
            <nuxt-link :to="{ name: 'verification.resend'}">Resend verification email</nuxt-link>
          </alert-error>
          <div class="form-group">
          <base-input
            v-model="form.email"
            :form="form"
            field="email"
            placeholder="Email"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            v-model="form.password"
            input-type="password"
            :form="form"
            field="password"
            placeholder="Password"
          ></base-input>
        </div>
          <div class="mt-4 mb-4 clearfix">
            <nuxt-link to='/password/email' class="forgot-pass color-blue font-14 fw-400"> Forgot password? </nuxt-link>
          </div>
          <div class="text-right">
            <base-button :loading="form.busy">
              Login
            </base-button>
          </div>
          <p class="font-14 fw-400 text-center mt-4">
            Don't have an account yet?
            <nuxt-link :to="{ name: 'register'}" class="color-blue"> Create an account</nuxt-link>
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
      form: new Form({
        email: '',
        password: ''
      })
    }
  },
  methods: {
    async submit(){
      try {
        await this.$auth.loginWith('local', {
          data: this.form
        })
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

<style>

</style>
