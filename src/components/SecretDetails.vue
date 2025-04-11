
  <template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg relative">
        
        <button @click="router.push('/Secrets')" class="close-button">&times;</button>
  
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">{{ secret.Name }}</h2>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-gray-100 p-4 rounded">
            <div class="text-sm text-gray-500 font-semibold">Access Requests</div>
            <div class="text-lg font-medium">{{ secret.NDecryptRequest }}</div>
          </div>
  
          <div class="bg-gray-100 p-4 rounded">
            <div class="text-sm text-gray-500 font-semibold">Quorum</div>
            <div class="text-lg font-medium">{{ secret.Quorum }}</div>
          </div>
  
          <div class="bg-gray-100 p-4 rounded">
            <div class="text-sm text-gray-500 font-semibold">Starting Date</div>
            <div class="text-lg font-medium">{{ formatDate(secret.StartingDate) }}</div>
          </div>
  
          <div class="bg-gray-100 p-4 rounded">
            <div class="text-sm text-gray-500 font-semibold">Sent Request</div>
            <div class="text-lg font-medium">
              <span v-if="secret.DecryptRequest">✅ Sent</span>
              <span v-else>❌ Not yet</span>
            </div>
          </div>
  
          <div class="bg-gray-100 p-4 rounded col-span-full">
            <div class="text-sm text-gray-500 font-semibold">Comments</div>
            <div class="text-base">{{ secret.Comments }}</div>
          </div>
        </div>
  
        <div class="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <template v-if="secret.IsOwner">
            <button @click="revealSecret" class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded">Reveal Secret</button>
            <button @click="deleteSecret" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Delete Secret</button>
          </template>
          <template v-else-if="!secret.EncryptedSecret">
            <button @click="sendRequest" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Send Request</button>
          </template>
          <template v-else>
            <button @click="revealSecret" class="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded">Reveal Secret</button>
          </template>
        </div>
  
        <div v-if="secretContent" class="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
          <strong class="text-gray-600">Secret Content:</strong>
          <p class="mt-2 font-mono break-words">{{ secretContent }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const secret = ref({})
  const secretContent = ref(null)
  const route = useRoute()
  const router = useRouter()
  
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString()
  
  onMounted(async () => {
    const token = sessionStorage.getItem('accessToken')
    const { data } = await axios.get(`http://localhost:8000/secrets/${route.params.secretId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    secret.value = data
  })
  
  const sendRequest = async () => {
    const token = sessionStorage.getItem('accessToken')
    await axios.post(`http://localhost:8000/secrets/${secret.value.SecretId}/decrypt`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    secret.value.DecryptRequest = true
  }
  
  const revealSecret = () => {
    secretContent.value = secret.value.EncryptedSecret || secret.value.SecretShare
  }
  
  const deleteSecret = async () => {
    const token = sessionStorage.getItem('accessToken')
    await axios.delete(`http://localhost:8000/secrets/${secret.value.SecretId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    router.push('/secrets')
  }
  </script>
  
  <style scoped>
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
  