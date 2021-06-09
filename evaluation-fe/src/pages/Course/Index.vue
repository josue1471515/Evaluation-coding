<template>
  <div class="q-pt-md">
    <q-form>
      <div>
        <q-btn label="Create" type="submit" color="primary" to="./create" />
      </div>
    </q-form>
    <table-component
      :title="course"
      :data="data"
      :columns="columns"
      class="q-gutter-pt-md"
    />
  </div>
</template>

<script>
import TableComponent from "src/components/TableComponent.vue";
import { api } from "src/boot/axios.js";

export default {
  components: { TableComponent },
  data() {
    return {
      columns: [
        { name: "id", align: "left", label: "ID", field: "id", sortable: true },
        { name: "name", align: "left", label: "Name", field: "name", sortable: true },
        { name: "edit", align: "left", label: "Edit", field: "edit", sortable: false },
        {
          name: "delete",
          align: "left",
          label: "Delete",
          field: "delete",
          sortable: false,
        },
      ],
      data: [],
      course: "Course",
    };
  },
  mounted() {
    this.onload();
  },
  methods: {
    onload() {
      api
        .get("/course")
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          console.log(err);
 
        });
    },
    remove(id) {
      api
        .delete("/course/" + id)
        .then((response) => {
          this.onload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      return null;
    },

    onReset() {},
  },
};
</script>
