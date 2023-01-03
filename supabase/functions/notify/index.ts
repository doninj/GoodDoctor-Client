// @ts-expect-error
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
// @ts-expect-error
import * as OneSignal from 'https://esm.sh/@onesignal/node-onesignal@1.0.0-beta7?target=deno&no-check'

const _OnesignalAppId_ = 'ba0e6ef7-d107-480b-b1f1-f59f36039676'
const _OnesignalUserAuthKey_ = 'M2M2NjcwMWEtYzgzYi00Mjg4LWIwNDUtMjZhMzY0MzU0OTE5'
const _OnesignalRestApiKey_ = 'OWRiOWY2MjAtMWYxYy00NjA4LThmN2UtYTFiZjdkMzBlM2Q3'
const configuration = OneSignal.createConfiguration({
  userKey: _OnesignalUserAuthKey_,
  appKey: _OnesignalRestApiKey_,
})

const onesignal = new OneSignal.DefaultApi(configuration)

serve(async (req) => {
  try {
    const { record } = await req.json()

    // Build OneSignal notification object
    const notification = new OneSignal.Notification()
    notification.app_id = _OnesignalAppId_
    notification.include_external_user_ids = [record.user_id]
    notification.contents = {
      en: `You just spent $${record.price}!`,
    }
    const onesignalApiRes = await onesignal.createNotification(notification)

    return new Response(
      JSON.stringify({ onesignalResponse: onesignalApiRes }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
  catch (err) {
    console.error('Failed to create OneSignal notification', err)
    return new Response('Server error.', {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
