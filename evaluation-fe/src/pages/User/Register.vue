<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="first_name"
        label="First Name"
        lazy-rules
        readonly
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="last_name"
        label="Last Name"
        lazy-rules
        readonly
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="ic"
        label="Identity card"
        lazy-rules
        readonly
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        readonly
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="phone"
        label="Telephone number"
        type="tel"
        emailhint="Telephone number"
        lazy-rules
        readonly
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        filled
        v-model="categories_selected"
        option-value="id"
        option-label="name"
        :options="categories_select"
        label="Select Categories"
        style="width: 250px"
        @input="getCoursesCategory()"
      />

      <q-select
        filled
        v-model="courses_selected"
        option-value="id"
        option-label="name"
        :options="courses_select"
        label="Select Courses"
        style="width: 250px"
      />
      <div class="q-pt-md q-gutter-sm">
        <q-btn label="Add Course" color="primary" @click="addCourse()" />
      </div>
      <table-component
        :title="course"
        :data="data"
        :columns="columns"
        class="q-gutter-pt-md"
      />
      <div class="q-pt-md q-gutter-sm">
        <q-btn label="Save" type="submit" color="primary" />
        <q-btn label="Cancel" color="deep-orange" to="/user/index" />
      </div>
    </q-form>
  </div>
</template>

<script>
import TableComponent from "src/components/TableComponent.vue";
import { api } from "src/boot/axios.js";
export default {
  components: { TableComponent },
  data() {
    return {
      id: 0,
      name: null,
      first_name: null,
      last_name: null,
      ic: null,
      email: null,
      phone: null,
      years: null,
      columns: [
        {
          name: "category_course_id",
          align: "left",
          label: "ID",
          field: "category_course_id",
          sortable: true,
        },
        {
          name: "category_name",
          align: "left",
          label: "Category",
          field: "name",
          sortable: true,
        },
        {
          name: "course_name",
          align: "left",
          label: "Courses",
          field: "course_name",
          sortable: true,
        },
        {
          name: "delete",
          align: "left",
          label: "Delete",
          field: "delete",
          sortable: false,
        },
      ],
      data: [],
      course: "Registers",
      courses_selected: [],
      categories_selected: [],
      courses_select: [],
      categories_select: [],
      all_courses: [],
      max_id: 0,
      selected_courses_save: [],
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    addCourse() {
      this.all_courses.push(this.courses_selected);
      this.max_id++;
      this.selected_courses_save.push(this.courses_selected.id);
      this.data.push({
        id: this.max_id,
        category_name: this.categories_selected.name,
        course_name: this.courses_selected.name,
        temporal: true,
      });
      this.courses_selected = [];
      this.categories_selected = [];
    },
    getCoursesCategory() {
      api
        .get("/course")
        .then((response) => {
          this.courses_select = response.data.filter(
            (x) => x.category_id == this.categories_selected.id
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      api
        .put("/user/course/" + this.$route.params.id, {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          ic: this.ic,
          email: this.email,
          phone: this.phone,
          years: this.years,
          courses_id: this.selected_courses_save,
        })
        .then((response) => {
          this.$router.push("/user/index");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onLoad() {
      api
        .get("/user/" + this.$route.params.id)
        .then((response) => {
          this.id = response.data.id;
          this.first_name = response.data.first_name;
          this.last_name = response.data.last_name;
          this.ic = response.data.ic;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.years = response.data.years;
        })
        .catch((err) => {
          console.log(err);
        });
      this.getCourses();
      this.getCourseSelect();
      this.getCategoriesSelect();
    },
    remove(id) {
      let row = this.data.find(x=>x.id == id)
      this.selected_courses_save = this.selected_courses_save.filter((x) => x !== row.course_id);
      this.data = this.data.filter((x) => x.id !== id);
    },
    getCourseSelect() {
      api
        .get("/course")
        .then((response) => {
          this.courses_select = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategoriesSelect() {
      api
        .get("/category")
        .then((response) => {
          this.categories_select = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCourses() {
      api
        .get("/user/course/" + this.$route.params.id)
        .then((response) => {
          this.data = response.data;
          this.selected_courses_save = this.data.reduce((acc, el) => {
            if (el) {
              acc.push(el.course_id);
            }
            return acc;
          }, []);
          this.max_id = this.data.reduce((acc, el) => (acc > el.id ? acc : el.id), 0);
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
