<template>
  <div>
    <!-- Section Cards -->
    <section class="authentication">
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Register
        </h1>
        <form class="auth-form" @submit.prevent="register">
          <alert-success :form="form">
            We have sent you an email with a link to verify your account.
          </alert-success>
          <div class="form-group">
            <input
              v-model.trim="form.name"
              type="text"
              name="name"
              class="form-control form-control-lg font-14 fw-300"
              :class="{ 'is-invalid': form.errors.has('name') }"
              placeholder="Full Name"
            />
            <has-error :form="form" field="name" ></has-error>
          </div>
        <div class="form-group">
          <base-input
            v-model.trim="form.username"
            :form="form"
            input-type="text"
            field="username"
            placeholder="Username"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            v-model.trim="form.email"
            :form="form"
            input-type="email"
            field="email"
            placeholder="Email"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            v-model.trim="form.password"
            :form="form"
            input-type="password"
            field="password"
            placeholder="Password"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            v-model.trim="form.password_confirmation"
            :form="form"
            input-type="password"
            field="password_confirmation"
            placeholder="Confirm Password"
          ></base-input>
        </div>

          <div class="text-right">
            <base-button :loading="form.busy">Register</base-button>
          </div>
          <p class="font-14 fw-400 text-center mt-4">
            Already have an account?
            <nuxt-link :to="{ name: 'login'}" class="color-blue"> Login</nuxt-link>
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
  data() {
    return {
      form: new Form({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      }),
    };
  },
  methods: {
    register() {
      this.form.post(`/register`)
        .then(response => {
          this.form.reset();
        })
        .catch(error => {
          this.form.errors.record(error.response.data.errors);
        });
    },
  }
}
</script>

<style>

</style>
