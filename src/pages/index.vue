<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
const login = ref({
  email: '',
  password: '',
})
const adresse = ref()
const auth = useAuthStore()
const router = useRouter()

function submitLogin() {
  auth.login(login.value)
}
</script>

<template>
  <div class="container px-6 py-12 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 sm:hidden xl:block">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image"
        >
      </div>
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form @submit.prevent="submitLogin">
          <!-- Email input -->
          <div class="mb-6">
            <input
              v-model="login.email"
              type="text"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
            >
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <InputText
              v-model="login.password"
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <!-- Submit button -->
          <Button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Se connecter
          </Button>
        </form>
        <div class="flex flex-wrap">
          <p> pas de compte ?</p>
          <button class="ml-6" @click="router.push({ path: '/register' })">
            S'incrire
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  needAuth: false
</route>
