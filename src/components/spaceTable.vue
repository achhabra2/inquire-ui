<template>
<div>
  <div class="row">
    <div class="col-sm-5">
      <add-question :space="space" @action="handleQuestionAdd"></add-question>
    </div>
    <div class="col-sm-5">
      <filter-bar @filter-set="onFilterSet" @filter-reset="onFilterReset"></filter-bar>
    </div>
    <div class="col-sm-2">
      <filter-select v-model="selection"></filter-select>
    </div>
  </div>
  <p></p>
  <div class="row">
    <div class="col">
      <vuetable ref="vuetable" v-bind:api-url="apiUrl" :fields="fields" pagination-path=""
      @vuetable:loaded="onLoadingChange(false)" @vuetable:loading="onLoadingChange(true)"
      @vuetable:pagination-data="onPaginationData" detail-row-component="my-detail-row" @vuetable:cell-clicked="onCellClicked" track-by="_id" :append-params="moreParams" :http-options="httpOptions" :query-params="queryParams"
        :per-page="perPage" :css="css">
        <template slot="question" scope="props">
          <!-- <modal-text-area
            :initial-data="(props.rowData.html) ? props.rowData.html : props.rowData.text"
            v-if="showModalEdit">
          </modal-text-area> -->
          <vue-markdown :source="(props.rowData.html) ? props.rowData.html : props.rowData.text">
          </vue-markdown>
        </template>
        <template slot="actions" scope="props">
            <actions :row-data="props.rowData" :row-index="props.rowIndex" :on-action="onAction">
            </actions>
        </template>
      </vuetable>
      </div>
  </div>
  <div class="row">
    <div class="col">
      <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
    </div>
  </div>
  <div v-if="showModalEdit">
    <div class="modal-backdrop"
      :class="{hide: !showModalEdit}"></div>
    <modal-edit
      :class="{hide: !showModalEdit}"
      @close="toggleModalEdit"
      @action="handleEditQuestion"
      :text="modalEditData.html? modalEditData.html : modalEditData.text"
      title="Edit Question"></modal-edit>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import mapState from 'vuex';
import VueMarkdown from 'vue-markdown';
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import moment from 'moment';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
import DetailRow from './DetailRow.vue';
import FilterBar from './FilterBar.vue';
import addQuestion from './addQuestion.vue';
import Actions from './table/Actions.vue';
import ModalEdit from './table/ModalEdit.vue';
import FilterSelect from './table/Select.vue';
import ModalTextArea from './table/ModalTextArea.vue';

Vue.component('my-detail-row', DetailRow);
Vue.component('Vuetable', Vuetable);
Vue.component('addQuestion', addQuestion);
Vue.component('VuetablePagination', VuetablePagination);
Vue.component('actions', Actions);

export default {
  name: 'spacetable',
  props: ['space'],
  components: {
    Vuetable,
    VuetablePagination,
    DetailRow,
    FilterBar,
    addQuestion,
    VueMarkdown,
    Actions,
    ModalEdit,
    FilterSelect,
    ModalTextArea,
  },
  data() {
    return {
      loading: true,
      showModalEdit: false,
      css: {
        tableClass:
          'table table--bordered table--hover table--highlight table--wrap',
      },
      fields: [
        {
          name: 'sequence',
          title: '#',
          sortField: 'sequence',
        },
        {
          name: '__slot:question',
          title: 'Question',
        },
        {
          name: 'displayName',
          title: 'Questioner',
          sortField: 'displayName',
        },
        {
          name: 'createdOn',
          title: 'Date',
          callback: 'formatDate|MM-DD-YYYY',
          sortField: 'createdOn',
        },
        {
          name: 'answers.length',
          title: 'Answers',
        },
        {
          name: '__slot:actions',
          title: 'Actions',
        },
      ],
      selection: '',
      perPage: 20,
      modalEditData: {},
      search: '',
    };
  },
  mounted() {
    this.$events.$on('answer', this.handleAnswerAdd);
  },
  computed: {
    apiUrl() {
      return this.$store.state.apiUrl;
    },
    deleteUrl() {
      return `${this.$store.state.baseUrl}/api/questions/`;
    },
    moreParams() {
      const params = {
        _room: this.space,
      };
      if (this.search) params.$search = this.search;
      if (this.selection === 'Answered') {
        params.answered = true;
      } else if (this.selection === 'Unanswered') {
        params.answered = false;
      }
      return params;
    },
    httpOptions() {
      return {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.accessToken}`,
        },
      };
    },
    queryParams() {
      return {
        sort: '$sort',
        page: 'page',
        perPage: '$limit',
      };
    },
  },
  methods: {
    onLoadingChange(event) {
      this.$emit('loading:change', event);
      this.loading = event;
    },
    formatDate(value, fmt = 'D MMM YYYY') {
      return value == null ? '' : moment(value, 'YYYY-MM-DD').format(fmt);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onCellClicked(data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data._id);
    },
    onFilterSet(filterText) {
      this.search = filterText;
    },
    onFilterReset() {
      this.search = '';
    },
    async onAction(action, data, index) {
      switch (action) {
        case 'delete-item':
          try {
            await this.$store.state.api.service('questions').remove(data._id);
            this.openToast('Question Removal Successful', 'et-info');
            this.$nextTick(() => this.$refs.vuetable.refresh());
            break;
          } catch (error) {
            this.openToast('Error removing question', 'et-warn');
            break;
          }
        case 'edit-item':
          this.toggleModalEdit();
          this.modalEditData = data;
          break;
        case 'view-item':
          this.onCellClicked(data, 'actions', action);
          break;
        default:
          break;
      }
    },
    toggleModalEdit() {
      this.showModalEdit = !this.showModalEdit;
    },
    async handleEditQuestion(text) {
      this.toggleModalEdit();
      try {
        await this.$store.state.api
          .service('questions')
          .patch(this.modalEditData._id, { text, html: text });
        this.openToast('Question Update Successful', 'et-info');
        this.$nextTick(() => this.$refs.vuetable.refresh());
      } catch (error) {
        this.openToast('Error Updating Question', 'et-warn');
      }
    },
    async handleQuestionAdd(text) {
      this.$emit('loading:change', true);
      this.loading = true;
      const { sequence, _id } = this.$store.state.spaces.keyedById[this.space];
      const spaceUpdate = {
        sequence: sequence + 1,
        lastActivity: Date.now(),
      };
      const newSpace = await this.$store.state.api
        .service('spaces')
        .patch(_id, spaceUpdate);
      const question = {
        _room: newSpace._id,
        personEmail: this.$store.state.auth.user.email,
        personId: this.$store.state.auth.user.ciscosparkId,
        text,
        displayName: this.$store.state.auth.user.displayName,
        sequence: newSpace.sequence,
        createdOn: Date.now(),
      };
      try {
        await this.$store.state.api.service('questions').create(question);
        this.loading = false;
        this.$emit('loading:change', false);
        this.openToast('Question Creation Successful', 'et-info');
        this.$nextTick(() => this.$refs.vuetable.refresh());
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$emit('loading:change', false);
        this.openToast('Could not add question', 'et-warn');
        this.$nextTick(() => this.$refs.vuetable.refresh());
      }
    },
    async handleAnswerAdd(data) {
      console.log('Answer received,', data);
      this.$emit('loading:change', true);
      this.loading = true;
      const answer = {
        personEmail: this.$store.state.auth.user.email,
        personId: this.$store.state.auth.user.ciscosparkId,
        displayName: this.$store.state.auth.user.displayName,
        text: data.answer,
        createdOn: Date.now(),
      };
      const query = {
        _room: data.question._room,
        sequence: data.question.sequence,
      };
      const update = {
        $push: {
          answers: answer,
        },
        answered: true,
      };
      try {
        await this.$store.state.api
          .service('questions')
          .patch(null, update, { query });
        this.loading = false;
        this.$emit('loading:change', false);
        this.openToast('Question Creation Successful', 'et-info');
        this.$nextTick(() => this.$refs.vuetable.refresh());
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.$emit('loading:change', false);
        this.openToast('Could not add question', 'et-warn');
        this.$nextTick(() => this.$refs.vuetable.refresh());
      }
    },
    openToast(message, className) {
      Vue.toast(message, {
        id: 'delete-question',
        className,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
        mode: 'queue',
        transition: 'slide-up',
      });
    },
  },
  watch: {
    moreParams() {
      this.$nextTick(() => this.$refs.vuetable.refresh());
    },
  },
  beforeDestroy() {
    this.$events.$off('answer');
  },
};
</script>
<style>
.wrapfix {
  white-space: normal;
}
</style>
