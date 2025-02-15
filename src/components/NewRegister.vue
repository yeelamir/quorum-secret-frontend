<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-tabs">
        <button :class="{ active: isSignUp }" @click="isSignUp = true">Sign Up</button>
        <button :class="{ active: !isSignUp }" @click="isSignUp = false">Log In</button>
      </div>

      <div class="auth-form">
        <div v-if="isSignUp">
          <h3>Sign Up</h3>
          <form @submit.prevent="register">
            <input 
              v-model="username1"
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
            <input 
            v-model="password_confirmation"
              type="password"
              id="password_confirmation"
              placeholder="Confirm your password"
              required
            />
            <button>Sign Up</button>
          </form>
        </div>

        <div v-else>
          <h3>Log In</h3>
          <form @submit.prevent="login">
            <input type="text" placeholder="User Name" />
            <input type="password" placeholder="Password" />
            <button>Log In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSignUp: true,
    };
  },
  methods: {
    login() {
      // Handle login logic here
      console.log("Logging in...");
    },
    register() {
      // Handle registration logic here
      console.log("Registering..." + this.username1);
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

.auth-tabs {
  display: flex;
  justify-content: space-between;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.auth-tabs button {
  flex: 1;
  background: none;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  font-weight: bold;
}

.auth-tabs .active {
  color: black;
  border-bottom: 2px solid black;
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
</style>