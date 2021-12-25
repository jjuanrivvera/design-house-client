<template>
  <div>
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Upload a design
        </h1>
      </div>
    </section>

    <div class="upload-shot">
      <div class="container">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div v-if="error" class="alert alert-danger">
                  <p>An error occurred during the upload process</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions">
                  <input type="file" name="image" />
                </slim-cropper>
                <div v-if="uploading" class="text-success caption-sm mt-2">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                Your image dimensions must be at least 800px x 600px in size.
                Also the image size should be a maximum of 2MB. Please resize
                your file accordingly before you upload.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slim from '@/components/slim/slim.vue';
export default {
  components: {
    'slim-cropper': Slim
  },
  middleware: ['auth'],
  data() {
    return {
      slimOptions: {
        service: this.slimService,
        post: 'output',
        defaultInputName: 'image',
        minSize: '800,600',
        label: 'Select Image...',
        maxFileSize: 2 // value is 2MB
      },
      uploading: false,
      error: ''
    };
  },

  methods: {
    async slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;

      try {
        const response = await this.$axios.post('/designs', formdata);
        this.$router.push({
          name: 'designs.edit',
          params: { id: response.data.id }
        });
      } catch (error) {
        const message = error.response.data.errors;
        this.error = message[Object.keys(message)[0]][0];
        failure(500);
      } finally {
        this.uploading = false;
      }
    }
  }
};
</script>

<style></style>
