<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Navigation Tabs -->
      <div class="auth-tabs">
        <button 
          :class="{ active: isLogin }"
          @click="isLogin = true"
        >
          Log In
        </button>
        <button 
          :class="{ active: !isLogin }"
          @click="isLogin = false"
        >
          Sign Up
        </button>
      </div>

      <!-- Auth Forms -->
      <div class="auth-form">
        <h3>{{ isLogin ? "Log In" : "Sign Up" }}</h3>
        
        <form v-if="isLogin" @submit.prevent="login">
          <input 
            v-model="username"
            type="text"
            placeholder="Enter your username"
            required
          />
          <input 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <button :disabled="loading">Log In</button>
        </form>

        <form v-else @submit.prevent="register">
          <input 
            v-model="username"
            type="text"
            placeholder="Enter your username"
            required
          />
          <input 
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <input 
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            required
          />
          <button>Sign Up and get a private key</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      </div>
    </div>
     
    <!-- Success Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <img src="@/assets/alert-icon.svg" alt="Alert Icon" class="alert-icon" />
          <h3>You Must Read</h3>
        </div>
        <p>
          You've just got your private key downloaded to your computer, 
          you must save it for managing your secrets.
        </p>
        <button @click="closeModal">I understood & saved my private key</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true, // Default to login tab
      username: '',
      password: '',
      password_confirmation: '',
      showModal: false,
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
          this.$router.push('/secrets');
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async register() {
      if (this.password !== this.password_confirmation) {
        this.errorMessage = 'Passwords do not match.';
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
            this.downloadPrivateKey(data.public_key);
            this.showModal = true; // Show the modal
            this.errorMessage = "Registration successful! Please log in.";
          } else {
            this.errorMessage = 'Username already taken.';
          }
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
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
    },
    closeModal() {
      this.showModal = false; 
      this.isLogin = true; // Navigate only when modal is closed
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
  background: #f5f5f5; /* Light gray background */
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
}

.auth-tabs button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  color: #333;
}

.auth-tabs button.active {
  background: black;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.auth-tabs button:not(.active):hover {
  background: rgba(0, 0, 0, 0.1);
}

.auth-form {
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  width: 500px; /* Increased width */
  height: 400px;
  max-width: 90%;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

/* Header styling with SVG */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-header h3 {
  font-size: 2.5em;
  color: #444;
}

/* SVG Icon */
.alert-icon {
  width: 100px;
  height: 100px;
}

.modal-content p {
  font-size: 1.5em;
  color: #555;
  margin: 15px 0;
  padding: 0 20px;
}

.modal-content button {
  background: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.4em;
}

.modal-content button:hover {
  background: #333;
}
</style>

