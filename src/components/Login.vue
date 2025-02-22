<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-form">
        <h3>Login</h3>
        <form @submit.prevent="login">
          <input 
            v-model="username"
            type="text"
            id="username"
            placeholder="Enter your username"
            required
          />
          <input 
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <button :disabled="loading">Login</button>
        </form>
        
        <p class="text-center">
          Don't have an account? <router-link to="/register" class="link">Register</router-link>
        </p>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        this.errorMessage = '';

        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
          sessionStorage.accessToken = data.token;
          sessionStorage.accessTokenExpiration = data.expiration;
          console.log('Login successful!');
          this.$router.push('/secrets');
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
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
.auth-page {
  background: url('@/assets/background.png') no-repeat center center;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.auth-form {
  padding: 20px;
  text-align: center;
}

.auth-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-form button {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-form button:hover {
  background: #333;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.link {
  color: blue;
  text-decoration: none;
}
</style>
