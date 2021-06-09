<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
      
            <q-item clickable v-ripple to="/user/index" >
              <q-item-section> Users </q-item-section>
            </q-item>

            <q-item clickable v-ripple  to="/Course/index" >
              <q-item-section> Courses </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/category/index">
              <q-item-section> Categories </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
       <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
       count: 0
    };
  },
};
</script>
