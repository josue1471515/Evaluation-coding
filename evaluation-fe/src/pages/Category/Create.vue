<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Category name"
        hint="Programming,"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        filled
        v-model="courses_selected"
        multiple
        option-value="id"
        option-label="name"
        :options="course"
        label="Select Courses"
        style="width: 250px"
      />

      <div class="q-pt-md q-gutter-sm">
        <q-btn label="Save" color="primary" @click="save()" />
        <q-btn label="Cancel" color="deep-orange" to="./index" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { api } from "src/boot/axios.js";
export default {
  data() {
    return {
      name: null,
      course: [],
      courses_selected: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onSubmit() {},
    onLoad() {
      api
        .get("/course")
        .then((response) => {
          this.course = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    save() {
      api
        .post("/category", { name: this.name, coursesSelected: this.courses_selected })
        .then((response) => {
          this.$router.push("./index");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onReset() {
      this.category_name = null;
    },
  },
};
</script>
