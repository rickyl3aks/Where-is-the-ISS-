const api = "https://api.wheretheiss.at/v1/satellites/25544";
const mymap = L.map("issMap").setView([51.5074, -0.1278], 13);
const issIcon = L.icon({
  iconUrl:
    "https://p7.hiclipart.com/preview/938/800/6/international-space-station-outer-space-spacecraft-clip-art-cliparts-space-station.jpg",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const title = L.tileLayer(tileUrl, { attribution });
title.addTo(mymap);
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
