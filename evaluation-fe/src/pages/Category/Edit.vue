<template>
  <div class="q-pa-md" >

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Category name"
        hint="Programming,"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
        <q-btn label="Save" type="submit" color="primary"/>
        <q-btn  label="Cancel"  color="deep-orange" to="/category/index" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { api } from 'src/boot/axios.js'
export default {
  components: {  },
  data () {
    return {
      id:0,
      name: null,
      course: [],
      courses_selected: [],
    }
  },
 mounted() {
      this.onLoad()
    },
  methods: {
    onSubmit () {
       api.put('/category/'+ this.$route.params.id,{name:this.name,id:this.id, coursesSelected: this.courses_selected })
      .then((response) => {
         this.$router.push('/category/index');
      })
      .catch((err) => {
        console.log(err)
      })
    },
  
    onLoad(){
       api
        .get("/course")
        .then((response) => {
          this.course = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
      api.get('/category/'+ this.$route.params.id)
      .then((response) => {
        this.name = response.data.name;
        this.id = response.data.id;
        this.courses_selected = response.data.coursesSelected;
      })
      .catch((err) => {
        console.log(err)
      })
      
    },

    onReset () {
      this.category_name = null
    }
  }
  
}
</script>