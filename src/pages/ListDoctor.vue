<script setup>
import { useRouter } from 'vue-router'
import { supabase } from '~/superbase.js'

const patriciens = ref()
const patricien = ref()
const isModal = ref(false)
const route = useRouter()
const calendar = ref()
const auth = useAuthStore()
function displayModal(doc) {
  isModal.value = true
  patricien.value = doc
}
async function sendRdv() {
  isModal.value = false
  await supabase.from('appointments').insert([
    {
      date: calendar.value,
      user_id: auth.user.id,
      practitioner_id: patricien.value.id,
      validate_appointment: 'accept',
    },
  ])
}
onMounted(async () => {
  const { data } = await supabase.from('profiles').select('*').eq('is_doctor', true)
  patriciens.value = data
})
</script>

<template>
  <div>
    <Dialog v-if="patricien" v-model:visible="isModal" :style="{ width: '450px' }" :modal="true" header="Header">
      <div class="flex flex-col items-center">
        {{ patricien.username }}
        <Calendar v-model="calendar" placeholder="date" class="w-2/3" />
        <Button class=" mt-2 text-black" label="Prendre le rendez-vous" @click="sendRdv" />
      </div>
    </Dialog>
    <DataTable class="w-2/3" :value="patriciens">
      <template #header>
        <div style="text-align: left" />
      </template>
      <Column field="username" header="Patricien" />
      <Column field="profession" header="Profession" />
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-show" class="mr-2 text-black" label="Prendre rendez-vous"
            @click="displayModal(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<route lang="yaml">
meta:
  needAuth: true
</route>
