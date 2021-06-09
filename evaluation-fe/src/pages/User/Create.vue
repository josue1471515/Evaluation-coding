<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="first_name"
        label="First Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="last_name"
        label="Last Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="ic"
        label="Identity card"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="phone"
        label="Telephone number"
        type="tel"
        emailhint="Telephone number"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
  data() {
    return {
      first_name: null,
      last_name: null,
      ic: null,
      email: null,
      phone: null,
      years: null,
    };
  },

  methods: {
    onSubmit() {
        
    },
    save(){
       api.post('/user',{first_name: this.first_name,
      last_name: this.last_name,
      ic: this.ic,
      email: this.email,
      phone: this.phone,
      years: this.years,})
      .then(() => {
         this.$router.push('./index');
      })
      .catch((err) => {
        console.log(err)
      })
    },
    onReset() {
      this.category_name = null;
    },
    
  },
};
</script>
