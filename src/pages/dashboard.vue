<script setup>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { GoogleMap, Marker } from 'vue3-google-map'
import { supabase } from '~/superbase.js'

const auth = useAuthStore()
const center = ref()
const zoom = ref(13)
const appointments = ref()
const appointmentDate = ref()
const appointmentClickable = ref()
const appointmentModal = ref(false)
const user = ref()
const calendarOptions = ref({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  selectable: true,
  events: [
  ],
  eventClick(info) {
    appointmentClickable.value = info
    appointmentModal.value = true
  },
})
function logout() {
  auth.logout()
}
onMounted(async () => {
  const adresses = await supabase.from('adresses_users').select('*').eq('id', auth.user.adresses_id)
  center.value = { lat: adresses.data[0].lat, lng: adresses.data[0].long }
  const appointment = await supabase.from('appointments').select('*, practitioner_id(*, adresses_id(*))').eq('user_id', auth.user.id).eq('appointment_validation_state', 'accept')
  appointments.value = appointment.data
  calendarOptions.value.events = appointment.data.map((app) => {
    return {
      title: app.practitioner_id.username,
      start: app.date,
    }
  })
})
</script>

<template>
  <div class="flex flex-row">
    <Dialog v-if="appointmentClickable" v-model:visible="appointmentModal" :style="{ width: '450px' }" :modal="true" header="Header">
      <div class="flex flex-col items-center">
        Vous avez rendez-vous avec {{ appointmentClickable.event.title }} le {{ appointmentClickable.event.startStr }}
        <div class="flex flex-row">
          <Button class=" mt-2 text-black" label="femer" @click="appointmentModal = false" />
        </div>
      </div>
    </Dialog>
    <GoogleMap api-key="AIzaSyDny_wisQF1y9tIPCKBpyzCSqlgTHWNod4" style="width: 50%; height: 500px" :center="center" :zoom="15">
      <Marker v-for="appointment in appointments" :key="appointment.id" :options="{ position: { lat: appointment.practitioner_id.adresses_id.lat, lng: appointment.practitioner_id.adresses_id.long } }" />
    </GoogleMap>
    <FullCalendar class="w-3/6" :options="calendarOptions" />
  </div>
</template>

<route lang="yaml">
meta:
  needAuth: true
</route>
