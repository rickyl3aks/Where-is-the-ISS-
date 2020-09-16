const api = "https://api.wheretheiss.at/v1/satellites/25544";
const mymap = L.map("issMap").setView([51.5074, -0.1278], 13);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const title = L.tileLayer(tileUrl, { attribution });
title.addTo(mymap);

async function getISS() {
  const response = await fetch(api);
  const data = await response.json();
  const { latitude, longitude } = data;

  L.marker([latitude, longitude]).addTo(mymap);
  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;
}

setInterval(getISS, 1000);
