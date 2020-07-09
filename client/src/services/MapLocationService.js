let okayResults
let errorResults
const promise = new Promise(async (resolve, reject) => {
  okayResults = resolve
  errorResults = reject
})
export default () => {
  window['getLocations'] = () => okayResults(window.google)
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = 'https://maps.googleapis.com/maps/'
  script.onerror = errorResults
  document.querySelector('head').appendChild(script)
  return promise
}
