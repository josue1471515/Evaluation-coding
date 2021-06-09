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

      <div class="q-pt-md q-gutter-sm" >
        <q-btn label="Save" type="submit" color="primary" />
        <q-btn label="Cancel" color="deep-orange" to="/user/index" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { api } from "src/boot/axios.js";
export default {
  components: {},
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
    };
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    onSubmit() {
      api
        .put("/user/" + this.$route.params.id, {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          ic: this.ic,
          email: this.email,
          phone: this.phone,
          years: this.years,
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
    },

    onReset() {
      this.category_name = null;
    },
  },
};
</script>
