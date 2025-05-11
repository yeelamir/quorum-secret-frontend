
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg relative">
        <button @click="closeNewSecret" class="close-button">&times;</button>
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">New Secret</h2>
        <div class="flex justify-center mb-4">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="2" class="w-12 h-12">
            <rect x="20" y="28" width="24" height="20" rx="2" stroke="#000" stroke-width="2" fill="none"/>
            <path d="M24 28V20a8 8 0 0 1 16 0v8" stroke-width="2"/>
            <circle cx="32" cy="38" r="2" fill="#000"/>
            </svg>
        </div>
        
        <form @submit.prevent="saveSecret" class="space-y-4">
            <div>
            <label class="block text-gray-600">Name</label>
            <input v-model="newSecret.name" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
    
            <div>
            <label class="block text-gray-600">Secret</label>
            <input v-model="newSecret.secret" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
    
            <div>
            <label class="block text-gray-600">Group Users</label>
            <div class="relative w-full max-w-lg border p-2 rounded-md flex flex-wrap items-center bg-gray-200">
                <div v-for="user in selectedUsers" :key="user.Id" class="bg-gray-500 text-white px-2 py-1 rounded-full flex items-center mr-1 mb-1">
                <span>{{ user.Username }}</span>
                <button @click="removeUser(user.Id)" class="ml-1 text-white">&times;</button>
                </div>
                <input
                ref="inputField"
                v-model="searchQuery"
                @input="fetchSuggestions"
                @keydown.down.prevent="highlightNext"
                @keydown.up.prevent="highlightPrev"
                @keydown.enter.prevent="selectHighlighted"
                @keydown.delete="handleBackspace"
                placeholder="Search users..."
                class="flex-grow min-w-[150px] p-1 outline-none bg-transparent"
                />
                <div v-if="filteredUsers.length && searchQuery.length >= 2" class="absolute left-0 top-full w-full bg-white border mt-1 rounded shadow-md z-10">
                <ul>
                    <li
                    v-for="(user, index) in filteredUsers"
                    :key="user.Id"
                    @click="selectUser(user)"
                    :class="{ 'bg-gray-300': index === highlightedIndex }"
                    class="cursor-pointer px-4 py-2 hover:bg-gray-400"
                    >
                    {{ user.Username }}
                    </li>
                </ul>
                </div>
            </div>
            </div>
    
            <div>
            <label class="block text-gray-600">Quorum</label>
            <input v-model="newSecret.quorum" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
    
            <div>
            <label class="block text-gray-600">Comment</label>
            <input v-model="newSecret.comment" class="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
    
            <div>
            <label class="block text-gray-600">Starting Date</label>
            <input v-model="newSecret.starting_date" type="date" class="w-full p-3 border border-gray-300 rounded-lg" required />
            </div>
            
            <button type="submit" class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800">Save and Share</button>
        </form>
        </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import { ref, computed, onMounted, nextTick } from "vue";
  import { useRoute, useRouter } from 'vue-router'
  
  export default {
    setup() {
      const newSecret = ref({
        name: "",
        secret: "",
        quorum: "",
        comment: "",
        starting_date: "",
        group_users: []
      });
      
      const users = ref([]);
      const selectedUsers = ref([]);
      const searchQuery = ref("");
      const highlightedIndex = ref(-1);
      const inputField = ref(null);
      const router = useRouter();
  
      const fetchUsers = async () => {
        try {
          const token = sessionStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:8000/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          users.value = response.data;
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      onMounted(fetchUsers);
  
      const filteredUsers = computed(() =>
        searchQuery.value.length >= 2
          ? users.value.filter(
              (user) =>
                user.Username.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
                !selectedUsers.value.some((selected) => selected.Id === user.Id)
            )
          : []
      );
  
      const selectUser = (user) => {
        if (!selectedUsers.value.find((u) => u.Id === user.Id)) {
          selectedUsers.value.push(user);
        }
        searchQuery.value = "";
        highlightedIndex.value = -1;
        nextTick(() => inputField.value?.focus());
      };
  
      const removeUser = (userId) => {
        selectedUsers.value = selectedUsers.value.filter((user) => user.Id !== userId);
      };
  
      const saveSecret = async () => {
        try {
          const token = sessionStorage.getItem('accessToken');
          await axios.post('http://localhost:8000/secrets', {
            ...newSecret.value,
            group_users: selectedUsers.value.map(user => user.Id)

          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          router.push('/secrets') // Close the modal and navigate back to Secrets.vue
        } catch (error) {
          console.error("Error saving secret:", error);
        }
      };
  
      return {
        newSecret,
        selectedUsers,
        searchQuery,
        filteredUsers,
        inputField,
        highlightedIndex,
        fetchUsers,
        selectUser,
        removeUser,
        saveSecret
      };
    },

    methods: {
    closeNewSecret() {
      this.$router.push('/Secrets'); // Navigate back to Secrets.vue
    }
  }
 };
</script>

<style>
  
  .min-h-screen {
    background: url('@/assets/background.png') no-repeat center center;
    background-size: cover;
    height: 120vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: gray;
    }

    .close-button:hover {
        color: black;
    }
</style>
 