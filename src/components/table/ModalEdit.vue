<template>
<div class="modal modal--animated" :class="{hide: hidden}" id="modal-login">
    <div class="modal__dialog">
        <div class="modal__content">
            <a class="modal__close" @click="$emit('close')"><span class="icon-close"></span></a>
            <div class="modal__header">
                <h2 class="modal__title">Edit Question</h2>
            </div>
            <div class="modal__body">
               <form>
                   <div class="form-group">
                       <div class="form-group__text">
                           <textarea v-model="inputText" class="textarea textarea--well" rows="5" required></textarea>
                           <!-- <input type="text" v-model="inputText" required> -->
                           <label>Content</label>
                           <div class="required-block">
                               <span class="icon-asterisk"></span>
                           </div>
                       </div>
                   </div>
               </form>
            </div>
            <div class="modal__footer">
                <button class="btn btn--secondary" @click="$emit('action', inputText)">Save</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.inputText = this.text;
  },
  data() {
    return {
      inputText: '',
    };
  },
};
</script>
