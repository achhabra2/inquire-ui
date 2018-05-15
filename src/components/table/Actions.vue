  <template>
    <div class="custom-actions">
      <button class="btn btn--icon btn--small" @click="onAction('view-item', rowData, rowIndex)"><span class="icon-zoom-in"></span></button>
      <button class="btn btn--icon btn--small" @click="onAction('edit-item', rowData, rowIndex)"><span class="icon-draw"></span></button>
      <button class="btn btn--icon btn--small btn--negative" @click="onAction('delete-item', rowData, rowIndex)"><span class="icon-trash"></span></button>
    </div>
  </template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
    },
    onAction: {
      type: Function,
      required: true,
    },
  },
  methods: {
    itemAction(action, data, index) {
      this.$emit(action, data, index);
    },
  },
};
</script>

  <style>
.custom-actions {
  min-width: 120px;
}
</style>
