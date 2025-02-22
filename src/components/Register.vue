<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-form">
        <h3>Register</h3>
        <form @submit.prevent="register">
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
          <input 
            v-model="password_confirmation"
            type="password"
            id="password_confirmation"
            placeholder="Confirm your password"
            required
          />
          <button>Register</button>
        </form>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="didRegistered" class="success-message">{{ username + " successfully registered! Downloading your private key..." }}</p>
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
      password_confirmation: '',
      didRegistered: false,
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async register() {
      if (this.password !== this.password_confirmation) {
        this.errorMessage = 'Passwords do not match. Please try again.';
        return;
      }

      try {
        this.loading = true;
        this.errorMessage = '';

        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        });

        const data = await response.json();

        if (response.ok) {
          if (data.validation) {
            console.log('Registration successful!');
            this.didRegistered = true;
            this.downloadPrivateKey(data.public_key);
            await new Promise(r => setTimeout(r, 5000));
            this.$router.push('/login');
          } else {
            this.errorMessage = 'Username already taken.';
          }
        } else {
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
      const blob = new Blob([privateKeyData], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'private.key';
      link.click();
      URL.revokeObjectURL(link.href);
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

.success-message {
  color: green;
  margin-top: 10px;
  font-size: 1.2em;
}
</style>

  