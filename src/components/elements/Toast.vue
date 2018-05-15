<template>
<div class="toast" :class="{show: !hide}">
  <div v-if="success" class="toast__icon text-success icon-check"></div>
  <div v-if="info" class="toast__icon text-info icon-info-circle"></div>
  <div v-if="warn" class="toast__icon text-warning icon-warning"></div>
  <div v-if="error" class="toast__icon text-danger icon-error"></div>
  <div class="toast__body">
      <div class="toast__title">{{title}}</div>
      <div class="toast__message">{{message}}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
    warn: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.vtoast {
  visibility: hidden; /* Hidden by default. Visible on click */
  text-align: center; /* Centered text */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

.vtoast.show {
  visibility: visible; /* Show the snackbar */

  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
