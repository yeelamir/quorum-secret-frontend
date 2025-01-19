<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-gray-600">Email</label>
          <input
            v-model="email"
            type="text"
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
            class="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            :disabled="loading"
          >
            Login
          </button>
        </div>

        <p class="text-center text-gray-600">
          Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
        </p>
      </form>

      <!-- Display error message -->
      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // for error feedback
      loading: false // to show loading state
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        this.errorMessage = ''; // clear previous error message

        // Make the POST request to the login API
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.email,
            password: this.password
          })
        });

        // Parse the response as JSON
        const data = await response.json();

        if (response.ok) {
          // Handle successful login
          if (data.validation) {
            console.log('Login successful!');
            // Optionally redirect after successful login
            this.$router.push('/register');
          } else {
            this.errorMessage = 'Invalid credentials. Please try again.';
          }
        } else {
          // Handle non-200 status codes (e.g., 400, 500)
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
        console.error('Login error:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* You can add any additional styles here */
</style>
