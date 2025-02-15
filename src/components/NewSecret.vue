<template>
    <div class="container">
      <h1 class="title">NEW SECRET</h1>
      <div class="lock-icon">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2">
          <rect x="20" y="28" width="24" height="20" rx="2" stroke="#000" stroke-width="2" fill="none"/>
          <path d="M24 28V20a8 8 0 0 1 16 0v8" stroke-width="2"/>
          <circle cx="32" cy="38" r="2" fill="#000"/>
        </svg>
      </div>
      <form @submit.prevent="saveSecret">
        <label>Name: <input v-model="secret.name" type="text" class="input-box" /></label>
        <label>Secret: <input v-model="secret.secret" type="text" class="input-box" /></label>
        <label>Group Users: <button type="button" class="group-button">Select users</button></label>
        <label>Quorum: <input v-model="secret.quorum" type="text" class="input-box" /></label>
        <label>Comment: <input v-model="secret.comment" type="text" class="input-box" /></label>
        <label>Starting Date: <input v-model="secret.startingDate" type="date" class="input-box" /></label>
        <button type="submit" class="save-button">Save and share</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        secret: {
          name: '',
          secret: '',
          quorum: '',
          comment: '',
          startingDate: ''
        }
      };
    },
    methods: {
      async saveSecret() {
        try {
          const token = sessionStorage.getItem('accessToken');
          await axios.post('http://localhost:8000/secrets', this.secret, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Error saving secret:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f8f8f0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }
  .lock-icon {
    width: 50px;
    height: auto;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
  label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .input-box {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #d4e6c3;
  }
  .group-button {
    padding: 8px;
    background-color: #5c5c5c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .save-button {
    padding: 10px;
    background-color: #5c5c5c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  