<template>
  <div class="login">
    <h2>Admin Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <div v-if="accessGranted !== null">
      <p v-if="accessGranted">Access granted</p>
      <p v-else>Access denied</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      accessGranted: null, // Holds the access granted status
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Send the username and password to the FastAPI endpoint
        const response = await fetch('http://127.0.0.1:8000/admin?username=' + this.username + '&password=' + this.password);
        
        // Parse the JSON response
        const data = await response.json();
        
        // Set the accessGranted state based on the API response
        this.accessGranted = data["access granted"];
        console.log(data)
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
  font-weight: bold;
}

p:first-of-type {
  color: green;
}

p:last-of-type {
  color: red;
}
</style>
