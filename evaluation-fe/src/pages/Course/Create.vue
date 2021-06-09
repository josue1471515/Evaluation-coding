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
        <q-btn  label="Save"  color="primary" @click="save()" />
        <q-btn  label="Cancel"  color="deep-orange" to="./index" />
      </div>
     
    </q-form>
  </div>
</template>

<script>
import { api } from 'src/boot/axios.js'
export default {
  data () {
    return {
      name: null,
    
    }
  },

  methods: {
    onSubmit () {
    },
    save(){
       api.post('/course',{name:this.name})
      .then(() => {
         this.$router.push('./index');
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