<template>
    <div class="container">
      <div class="shh-icon">
        <img src="@/assets/shh-icon.svg" alt="Shh Icon" />
      </div>
      <div class="search-container">
        <input v-model="searchQuery" placeholder="Search Secret" class="search-box" />
      </div>
      <h1 class="title">SHH! IT'S A SECRET</h1>
      
      <div v-for="(group, title) in categorizedSecrets" :key="title" class="secrets-group">
        <h2 class="group-title">{{ title }}</h2>
        <div class="secrets-list">
          <div v-for="secret in group" :key="secret.id" class="secret-item" @click="viewSecret(secret.id)">
            {{ secret.Name }}
          </div>
        </div>
      </div>
      
      <button @click="goToNewSecret" class="new-secret-button">New Secret</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        secrets: [],
        searchQuery: ''
      };
    },
    computed: {
    categorizedSecrets() {
        const categories = {
        "My Own Secrets": [],
        "Opened Secrets": [],
        "Other Secrets": []
        };

        this.secrets.forEach(secret => {
        if (secret.IsOwner) {
            categories["My Own Secrets"].push(secret);
        } else if (secret.NDecryptRequest >= secret.quorum) {
            categories["Opened Secrets"].push(secret);
        } else {
            categories["Other Secrets"].push(secret);
        }
        });

        return Object.fromEntries(
        Object.entries(categories).map(([key, secrets]) => [
            key,
            secrets.filter(secret =>
            secret.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        ])
        );
    }
    },
    methods: {
      async fetchSecrets() {
        try {
          const token = sessionStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:8000/secrets', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.secrets = response.data;
        } catch (error) {
          console.error('Error fetching secrets:', error);
        }
      },
      viewSecret(secretId) {
        this.$router.push(`/SecretDetails/${secretId}`);
      },
      goToNewSecret() {
        this.$router.push('/NewSecret');
      }
    },
    mounted() {
      this.fetchSecrets();
    }
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    color: #333;
  }
  .shh-icon {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 250px;
    height: auto;
  }
  .search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .search-box {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
  }
  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .secrets-group {
    text-align: left;
    margin: 20px auto;
    max-width: 600px;
  }
  .group-title {
    background-color: #4a5568; 
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
  }
  .secrets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .secret-item {
    background-color: #edf2f7;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    min-width: 140px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    transition: background 0.2s;
  }
  .secret-item:hover {
    background-color: #cbd5e0;
  }
  .new-secret-button {
    padding: 12px 24px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    transition: background 0.2s;
  }
  .new-secret-button:hover {
    background-color: #2d3748;
  }
  </style>


<!-- <template>
    <div class="container">
      <div class="shh-icon">
        <img src="@/assets/shh-icon.svg" alt="Shh Icon"  />
      </div>
      <div class="search-container">
        <input v-model="searchQuery" placeholder="Search Secret" class="search-box" />
      </div>
      <h1 class="title">SHH! IT'S A SECRET</h1>
      
      <div v-for="(group, title) in categorizedSecrets" :key="title" class="secrets-group">
        <h2 class="group-title">{{ title }}</h2>
        <div class="secrets-list">
          <div v-for="secret in group" :key="secret.id" class="secret-item" @click="viewSecret(secret.id)">
            {{ secret.Name }}
          </div>
        </div>
      </div>
      
      <button @click="goToNewSecret" class="new-secret-button">New Secret</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        secrets: [],
        searchQuery: ''
      };
    },
    computed: {
      categorizedSecrets() {
        const categories = {
          "My Own Secrets": [],
          "Opened Secrets": [],
          "Other Secrets": []
        };
        return this.secrets.filter(secret => 
          secret.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ).reduce((acc, secret) => {

          if (secret.IsOwner === true) acc['My Own Secrets'].push(secret);
          //else if (secret.group === 'OpenedSecrets') acc['Opened Secrets'].push(secret);
          else acc['Other Secrets'].push(secret);
          return acc;
        }, categories);
      }
    },
    methods: {
      async fetchSecrets() {
        try {
            debugger;
          const token = sessionStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:8000/secrets', {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.secrets = response.data;
        } catch (error) {
          console.error('Error fetching secrets:', error);
        }
      },
      viewSecret(secretId) {
        this.$router.push(`/SecretDetails/${secretId}`);
      },
      goToNewSecret() {
        this.$router.push('/NewSecret');
      }
    },
    mounted() {
      this.fetchSecrets();
    }
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f8f8f0;
    position: relative;
  }
  .shh-icon {
    position: absolute;
    top: 10px;
    right: 0px;
    width: 200px; /* Scale up by 100% */
    height: auto;
  }
  .search-container {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .search-box {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
  }
  .secrets-group {
    text-align: left;
    margin: 20px auto;
    max-width: 600px;
  }
  .group-title {
    background-color: #5c5c5c;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .secrets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .secret-item {
    background-color: #d4e6c3;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    min-width: 120px;
    text-align: center;
  }
  .new-secret-button {
    padding: 10px 20px;
    background-color: #5c5c5c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  </style> -->
