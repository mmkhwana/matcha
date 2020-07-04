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
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyABDN7KmuK0NJA7fWwcQoWh2EO0h_LEwac&libraries=places&callback=getLocations'
  script.onerror = errorResults
  document.querySelector('head').appendChild(script)
  return promise
}
