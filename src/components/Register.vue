<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label for="username" class="block text-gray-600">username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
              required
            />
          </div>
  
          <div>
            <label for="password" class="block text-gray-600">password</label>
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
            <label for="password_confirmation" class="block text-gray-600">password confirmation</label>
            <input
              v-model="password_confirmation"
              type="password"
              id="password_confirmation"
              class="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Confirm your password"
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

        <!-- Display error message -->
      <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>

      <p v-if="didRegistered" class="text-center text-green-500 mt-4 text-xl">{{ username + " succesfully registered! Downloading your private key..." }}</p>
      </div>
    </div>
  </template>
  
  <script>
import { ssrModuleExportsKey } from 'vite/module-runner';

  export default {
    data() {
      return {
        username: '',
        password: '',
        password_confirmation: '',
        didRegistered: false,
        errorMessage: '', // for error feedback
      loading: false // to show loading state
      };
    },
    methods: {
    async register() {
      // Check if passwords match
      if (this.password !== this.password_confirmation) {
        this.errorMessage = 'Passwords do not match. Please try again.';
        return;
      }

      try {
        this.loading = true;
        this.errorMessage = ''; // clear previous error message

        // Make the POST request to the registration API
        const response = await fetch('http://localhost:8000/register', { // Correct API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        // Parse the response as JSON
        const data = await response.json();

        if (response.ok) {
          // Handle successful registration
          if (data.validation) {
            console.log('Registration successful!');
            this.didRegistered = true;
            this.downloadPrivateKey(data.public_key);
            // Sleep for 5 sec
            await new Promise(r => setTimeout(r, 5000));
            this.$router.push('/login');
          } else {
            this.errorMessage = 'Username already taken.';
          }
        } else {
          // Handle non-200 status codes (e.g., 400, 500)
          this.errorMessage = data.message || 'An error occurred. Please try again later.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
        console.error('Registration error:', error);
      } finally {
        this.loading = false;
      }
    },
    downloadPrivateKey(privateKeyData) {
      // Step 3: Create a Blob object with the private key data
      const blob = new Blob([privateKeyData], { type: 'application/octet-stream' });

      // Create an anchor element
      const link = document.createElement('a');

      // Create a URL for the Blob and set it as the href attribute of the anchor
      link.href = URL.createObjectURL(blob);
      link.download = 'private.key'; // File name for the download

      // Programmatically click the anchor to trigger the download
      link.click();

      // Optionally revoke the Object URL after the download
      URL.revokeObjectURL(link.href);
    }

  }
  };
</script>

<style scoped>
/* You can add any additional styles here */
</style>
  