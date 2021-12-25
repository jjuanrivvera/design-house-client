<template>
  <div>
    <!-- Start Hero -->
    <section class="hero text-center bg-secondary mb-4 text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Update Design Information
        </h1>
      </div>
    </section>
    <!-- End Hero -->

    <!-- Upload Shot -->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div v-if="design.images" class="card-body p-1">
              <img :src="design.images.large" class="w-100 mb-4" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                  Design successfully updated
                </alert-success>
                <div class="form-group">
                  <base-input
                    v-model="form.title"
                    :form="form"
                    field="title"
                    placeholder="Enter a title"
                  ></base-input>
                </div>
                <div class="form-group">
                  <base-textarea
                    v-model="form.description"
                    :form="form"
                    field="description"
                    placeholder="Enter a description"
                  ></base-textarea>
                </div>
                <div class="form-group">
                  <client-only>
                    <better-input-tag
                      :tags="form.tags"
                      placeholder="Tags separated by commas"
                      on-paste-delimiter=","
                    ></better-input-tag>
                  </client-only>
                </div>
                <template v-if="teams.length">
                  <div class="form-group custom-control custom-checkbox">
                    <input
                      id="assign_to_team"
                      v-model="form.assign_to_team"
                      type="checkbox"
                      class="custom-control-input"
                    />
                    <label
                      class="custom-control-label"
                      value="true"
                      for="assign_to_team"
                    >
                      Assign to team
                    </label>
                  </div>
                  <div class="form-group">
                    <select
                      v-model="form.team"
                      :disabled="!form.assign_to_team"
                      class="custom-select"
                      :class="{ 'is-invalid': form.errors.has('team') }"
                    >
                      <option :value="null">Select a team</option>
                      <option
                        v-for="team in teams"
                        :key="team.id"
                        :value="team.id"
                      >
                        {{ team.name }}
                      </option>
                    </select>
                    <has-error :form="form" field="team"></has-error>
                  </div>
                </template>
                <div class="form-group custom-control custom-checkbox">
                  <input
                    id="is_live"
                    v-model="form.is_live"
                    type="checkbox"
                    class="custom-control-input"
                  />
                  <label
                    class="custom-control-label"
                    value="true"
                    for="is_live"
                  >
                    Publish this design
                  </label>
                </div>

                <div class="text-right">
                  <nuxt-link :to="{ name: 'settings.designs' }"
                    >Cancel</nuxt-link
                  >
                  <base-button :loading="form.busy">
                    Update Design
                  </base-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Upload Shot -->
  </div>
</template>

<script>
import { Form } from 'vform'
import BetterInputTag from 'better-vue-input-tag';

export default {
  components: {
    BetterInputTag
  },
  middleware: ['auth'],

  async asyncData({ $axios, params, error, redirect }) {
    try {
      const design = await $axios.$get(`/designs/${params.id}`);
      const teams = await $axios.$get(`/users/teams`);

      return { design: design.data, teams: teams.data };
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Design not found' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Internal server error' });
      }
    }
  },
  data() {
    return {
      form: new Form({
        title: '',
        description: '',
        is_live: false,
        tags: [],
        assign_to_team: false,
        team: null
      })
    };
  },

  mounted() {
    if (this.design) {
      Object.keys(this.form).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(this.design, key)) {
          this.form[key] = this.design[key];
        }
      });

      this.form.tags = this.design.tag_list.tags || [];

      if (this.design.team) {
        this.form.team = this.design.team.id;
        this.form.assign_to_team = true;
      } else {
        this.form.assign_to_team = false;
      }
    }
  },

  methods: {
    submit() {
      this.form
        .put(`/designs/${this.$route.params.id}`)
        .then(res => {
          setTimeout(() => {
            this.$router.push({ name: 'settings.designs' });
          }, 1000);
        })
        .catch(err => {
          this.error = err
        });
    }
  }
};
</script>

<style></style>
