<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="fetchUsers">Fetch Users</button>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
import { getUsers } from '@/api/userService';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await getUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
};
</script>