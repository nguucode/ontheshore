// crm.ontheshore.biz serves the Houseura demo that zweihander's build ships at
// /zweihander/crm/. The page is built with relative URLs (../assets/…), so the
// root maps to the demo page and every other path to zweihander's own folder.
// Needs crm.ontheshore.biz added as a custom domain on this Pages project.
const HOST = 'crm.ontheshore.biz'

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url)
  if (url.hostname !== HOST) return next()
  url.pathname = url.pathname === '/' ? '/zweihander/crm/' : `/zweihander${url.pathname}`
  return env.ASSETS.fetch(new Request(url, request))
}
