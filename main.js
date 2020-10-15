const api = "https://api.wheretheiss.at/v1/satellites/25544";
const mymap = L.map("issMap").setView([51.5074, -0.1278], 13);
const issIcon = L.icon({
  iconUrl: "images/iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    accessToken:
      "pk.eyJ1IjoiY29uc28iLCJhIjoiY2tmNXRoZnV0MDNxZjJxbzNwcXlzZDF6MyJ9.a4PvuIOzeOJa8ogQrXAyRA",
  }
).addTo(mymap);
let firstTime = true;

async function getISS() {
  const response = await fetch(api);
  const data = await response.json();
  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
  }

  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;
}

setInterval(getISS, 1000);
