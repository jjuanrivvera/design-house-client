<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Resend Verification Email
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-error v-if="form.errors.has('message')" :form="form">
          {{ form.errors.get('message') }}
        </alert-error>
        <alert-success :form="form">
          We have resent the verification email
        </alert-success>
        <div class="form-group">
          <input
            v-model="form.email"
            :form="form"
            class="form-control fomr-control-lg font-14 fw-300"
            field="email"
            placeholder="Email"
          />
          <has-error :form="form" field="email" ></has-error>
        </div>

        <div class="text-right">
          <button
            type="submit"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
            :disabled="form.busy"
          >
            <span v-if="form.busy">
              <i class="fas fa spinner fa-spin"></i>
            </span>
            Resend
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { Form } from 'vform'

export default {
  middleware: ['guest'],
  data() {
    return {
      form: new Form({
        email: ''
      })
    };
  },
  methods: {
    async submit() {
      await this.form.post(`/verification/resend`);
      this.form.reset();
    }
  }
};
</script>
