<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Email Verification
      </h1>
      <form class="auth-form">
        <div v-if="success" class="form-group">
          <div class="alert alert-success">
            {{ status }}
          </div>
          <nuxt-link to="/login">Proceed to Login</nuxt-link>
        </div>
        <div v-else class="form-group">
          <div class="alert alert-danger">
            {{ status }}
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['guest'],
  async asyncData({ params, query, app }) {
    const q = await Object.keys(query)
      .map(k => `${k}=${query[k]}`)
      .join('&');
    try {
      const { data } = await app.$axios.post(
        `/verification/verify/${params.id}?${q}`
      );
      return { success: true, status: data.message };
    } catch (e) {
      return { success: false, status: e.response.data.errors.message };
    }
  },
  data() {
    return {
      success: false,
      status: '',
    };
  },
}
</script>
