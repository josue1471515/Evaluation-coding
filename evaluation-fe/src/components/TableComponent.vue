<template>
  <div class="q-pt-md">
    <q-table :title="title" dense :data="data" :columns="columns" row-key="name">
      <template v-slot:body="data">
        <q-tr :props="data">
          <q-td key="id" :data="data">
            {{ data.row.id }}
          </q-td>
          <q-td v-show="data.row.name" key="name" :props="data">
            {{ data.row.name }}
          </q-td>
          <q-td v-show="data.row.ic" key="ic" :props="data">
            {{ data.row.ic }}
          </q-td>
          <q-td v-show="data.row.category_name" key="category_name" :props="data">
            {{ data.row.category_name }}
          </q-td>
          <q-td v-show="data.row.course_name" key="course_name" :props="data">
            {{ data.row.course_name }}
          </q-td>
          <q-td v-show="data.row.ic" key="register" :props="data">
            <q-btn color="secondary" label="Register" @click="register(data.row.id)" />
          </q-td>
          <q-td key="edit" :props="data">
            <q-btn color="primary" label="Edit" @click="edit(data.row.id)" />
          </q-td>
          <q-td key="delete" :props="data">
            <q-btn color="deep-orange" label="Delete" @click="remove(data.row.id)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    redirectEdit() {},
    edit(id) {
      this.$router.push("./edit/" + id);
    },
    register(id) {
      this.$router.push("./register/" + id);
    },

    remove(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to remove this row?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          try {
            this.$parent.remove(id);
          } catch {
            this.$parent.$parent.remove(id);
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
  props: ["columns", "data", "title"],
};
</script>
