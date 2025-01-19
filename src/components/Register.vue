<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label for="name" class="block text-gray-600">Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
  
          <div>
            <label for="email" class="block text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
  
          <div>
            <label for="password" class="block text-gray-600">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
  
          <div>
            <button
              type="submit"
              class="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Register
            </button>
          </div>
  
          <p class="text-center text-gray-600">
            Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        // Handle registration logic (e.g., API call)
        console.log("Register:", this.name, this.email, this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can add any additional styles here */
  </style>
  