<template>
<button class="btn" :class="classNames" @click="exportData">
  Export
</button>
</template>


<script>
import json2csv from 'json2csv';

export default {
  data() {
    return {
      loading: false,
      successActive: false,
      errorActive: false,
    };
  },
  props: {
    space: {
      type: String,
      required: true,
    },
  },
  computed: {
    classNames() {
      return {
        disabled: this.loading,
        'btn--primary': !this.successActive && !this.errorActive,
        'btn--negative': this.errorActive,
        'btn--success': this.successActive,
      };
    },
  },
  methods: {
    async exportData() {
      this.loading = true;
      const fields = [
        {
          label: 'Index',
          value: 'sequence',
          default: 'NULL',
        },
        {
          label: 'Question',
          value: 'text',
          default: 'NULL',
        },
        {
          label: 'Questioner',
          value: 'displayName',
          default: 'NULL',
        },
        {
          label: 'Date',
          value: 'createdOn',
          default: 'NULL',
        },
        {
          label: 'Answer',
          value(row, field, data) {
            if (row.answers[0]) {
              return row.answers[0].text;
            }
            return 'None';
          },
          default: 'None', // default if value is not found (optional, overrides `defaultValue` for column)
        },
        {
          label: 'Answerer', // (optional, column will be labeled 'path.to.something' if not defined)
          value(row, field, data) {
            if (row.answers[0]) {
              return row.answers[0].displayName;
            }
            return 'N/A';
          },
          default: 'N/A', // default if value is not found (optional, overrides `defaultValue` for column)
        },
        {
          label: 'Date', // (optional, column will be labeled 'path.to.something' if not defined)
          value(row, field, data) {
            if (row.answers[0]) {
              return row.answers[0].createdOn;
            }
            return 'N/A';
          },
          default: 'N/A', // default if value is not found (optional, overrides `defaultValue` for column)
        },
      ];
      const params = {
        query: {
          _room: this.space,
          $limit: 500,
        },
      };
      try {
        const response = await this.$store.state.api
          .service('questions')
          .find(params);
        const { data } = response;
        console.log('Response', response);
        try {
          const result = json2csv.parse(data, {
            fields,
          });
          const blob = new Blob([result], {
            type: 'text/csv',
          });
          const url = window.URL.createObjectURL(blob);
          window.location.href = url;
          this.loading = false;
          this.successActive = true;
        } catch (err) {
          this.loading = false;
          this.errorActive = true;
          console.error(err);
        }
      } catch (error) {
        this.loading = false;
        this.errorActive = true;
        console.log('Erorr getting API Data');
        console.error(err);
      }
    },
  },
};
</script>

<style>

</style>
