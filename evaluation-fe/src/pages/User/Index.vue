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
        { name: "ic", align: "left", label: "Identity card", field: "ic", sortable: true },
         {
          name: "register",
          align: "left",
          label: "Register",
          field: "register",
          sortable: false,
        },
        { name: "edit", align: "left", label: "Edit", field: "edit", sortable: false },
        {
          name: "delete",
          align: "left",
          label: "Delete",
          field: "delete",
          sortable: false,
        }
      ],
      data: [],
      course: "Users",
    };
  },
  mounted() {
    this.onload();
  },
  methods: {
    onload() {
      api
        .get("/user")
        .then((response) => {
          let objValues = [];

          if (response.data) {
            objValues = response.data.reduce((acc, el) => {
               const objValue = {
                  name: el.first_name + " " + el.last_name,
                  id: el.id,
                    ic: el.ic,
              };
              acc.push(objValue);
              return acc;
            }, []);
          }
         
          this.data = objValues;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    remove(id) {
      api
        .delete("/user/" + id)
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
