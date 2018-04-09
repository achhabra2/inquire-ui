<template>
<div class="content">
  <div class="container">
  <div class="panel panel--mdgray panel--bordered">
    <div class="container">
      <div class="row">
        <div class="col text-center">
      <span class="icon-lock"></span>
        <h1>
        You must authenticate to continue.
        </h1>
        <p></p>
        <p></p>
        <div class="divider divider--thicker divider--accent-blue"></div>
      <h3>Inquire requires that users have rights to access the FAQ content. </h3>
        <h4>Inquire will be requesting minimal permissions.</h4>
        <div class="subheader">Note: You will be leaving this site to log in. </div>
        <button @click="redirect" class="btn btn--primary">Login</button>
            </div>
      </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    redirect(event) {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = '/auth/ciscospark';
      } else window.location.href = this.$store.getters.loginUrl;
    },
  },
};
</script>
