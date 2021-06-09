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
        label="Course name"
        hint="C#,php..."
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div class="q-pt-md q-gutter-sm">
        <q-btn label="Save" type="submit" color="primary"/>
        <q-btn  label="Cancel"  color="deep-orange" to="/course/index" />
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
    
    }
  },
 mounted() {
      this.onLoad()
    },
  methods: {
    onSubmit () {
       api.put('/course/'+ this.$route.params.id,{name:this.name,id:this.id})
      .then((response) => {
         this.$router.push('/course/index');
      })
      .catch((err) => {
        console.log(err)
      })
    },
  
    onLoad(){
      api.get('/course/'+ this.$route.params.id)
      .then((response) => {
        this.name = response.data.name;
        this.id = response.data.id;
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