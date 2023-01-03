import OneSignalVuePlugin from '@onesignal/onesignal-vue3'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  if (isClient) {
    app.use(OneSignalVuePlugin, {
      appId: 'b2f7f966-d8cc-11e4-bed1-df8f05be55ba',
    })
  }
}
