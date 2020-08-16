import React, { Component, useState, useEffect } from 'react';
import { HalfCircleSpinner } from 'react-epic-spinners';
import './App.css';
import data_dbd from './data/geojson_dbd.json';
import data_covid from './data/geojson_covid.json';
import data_hepatitis_a from './data/geojson_hepatitis_a.json';
import data_hepatitis_b from './data/geojson_hepatitis_b.json';
import data_malaria from './data/geojson_malaria.json';
import data_difteri from './data/geojson_difteri.json';
import data_kusta from './data/geojson_kusta.json';
import data_rabies from './data/geojson_rabies.json';
import data_pneumonia from './data/geojson_pneumonia.json';
import data_leptospirosis from './data/geojson_leptospirosis.json';
import data_filariasis from './data/geojson_filariasis.json';

let L = window.L;
let map = window.map;

const MapComponent = ({isLoading}) => {
  return (
    <div id="map-component">
      <div id="map" style={isLoading ? {visibility: 'hidden'} : {visibility: 'visible'}}/>
    </div>
  )
} 

const LoadingContainer = ({isLoading, diseaseName}) => {
  var color = "#9D52DF";
  if (diseaseName === "covid") {
    color = "#FB5151";
  } else if (diseaseName === "hepatitis_a") {
    color = "#00B181";
  } else if (diseaseName === "hepatitis_b") {
    color = "#32D552";
  } else if (diseaseName === "malaria") {
    color = "#0A74EC";
  } else if (diseaseName === "difteri") {
    color = "#FFB324";
  } else if (diseaseName === "kusta") {
    color = "#979B9D";
  } else if (diseaseName === "pneumonia") {
    color = "#F789EF";
  } else if (diseaseName === "filariasis") {
    color = "#000000";
  } else if (diseaseName === "rabies") {
    color = "#B3720C";
  } else if (diseaseName === "leptospirosis") {
    color = "#1A1A96";
  }
  
  return (
    <div id="loading-container" style={isLoading ? {display: 'block'} : {display: 'none'}}>
      <div id="loading-container-child">
        <HalfCircleSpinner color={color}/>
      </div>
    </div>
  )
}

const DiseaseButton = ({active, diseaseName, diseaseText, diseaseButtonClickHandle, color}) => {
  const backgroundColorPassive = {
    backgroundColor : 'white'
  }

  return (
    <button onClick={() => diseaseButtonClickHandle(diseaseName)} class={active ? 'disease-button-active' : 'disease-button-passive'} style={active ? {backgroundColor: color} : backgroundColorPassive}>
      {diseaseText}
    </button>
  )
}

function App() {

  const [selectedDisease, setSelectedDisease] = useState("dbd");
  const [isLoading, setIsLoading] = useState(false);

  function diseaseClicked (diseaseName) {
    setSelectedDisease(diseaseName);
    setIsLoading(true);
    console.log(diseaseName);
    console.log("uhuy");
  }

  const hovering = false;

  const initializeMap = (disease) => {

    var positionCenter = L.latLng(-1.637444, 117.286060);

    if (map) map.remove();
    
    map = L.map("map", {
      center: positionCenter,
      zoom: 5,
    });

    if (disease === 'dbd') {
      var geojsonFeatures = data_dbd['data'];
    } else if (disease === 'covid') {
      var geojsonFeatures = data_covid['data'];
    } else if (disease === 'hepatitis_a') {
      var geojsonFeatures = data_hepatitis_a['data'];
    } else if (disease === 'hepatitis_b') {
      var geojsonFeatures = data_hepatitis_b['data'];
    } else if (disease === 'malaria') {
      var geojsonFeatures = data_malaria['data'];
    } else if (disease === 'difteri') {
      var geojsonFeatures = data_difteri['data'];
    } else if (disease === 'pneumonia') {
      var geojsonFeatures = data_pneumonia['data'];
    } else if (disease === 'rabies') {
      var geojsonFeatures = data_rabies['data'];
    } else if (disease === 'filariasis') {
      var geojsonFeatures = data_filariasis['data'];
    } else if (disease === 'leptospirosis') {
      var geojsonFeatures = data_leptospirosis['data'];
    } else if (disease === 'kusta') {
      var geojsonFeatures = data_kusta['data'];
    }

    var ACCESS_TOKEN = 'pk.eyJ1IjoiYXphaHJhbmRhbmkiLCJhIjoiY2tiYTRydGl5MGNiZDJ4cWtsN2c3c2tpNCJ9.5LzhinKOZhxMZgSd7-eOag'
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ACCESS_TOKEN,
    }).addTo(map);
    
    var layerGroup = L.geoJSON(geojsonFeatures, {
      pointToLayer: function(feature, latlng) {
        if (feature.properties.penyakit === 'DBD') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_purple.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Hepatitis A') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_green.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Hepatitis B') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_light_green.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Malaria') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_blue.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Difteri') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_orange.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Pneumonia') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_pink.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Kusta') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_grey.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Filariasis') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_black.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Rabies') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_brown.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Leptospirosis') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_dark_blue.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        } else if (feature.properties.penyakit === 'Covid') {
          var myIcon = new L.Icon({
            iconUrl: require('./asset/pin_icon_4_red.png'),
            iconSize: new L.Point(30, 30),
            iconAnchor: new L.Point(14, 30),
            popupAnchor: new L.Point(0, -20)
          });
        }
        return L.marker(latlng, {icon: myIcon});
      },
      onEachFeature: function(feature, layer) {
        layer.on('mouseover', function (e) {
          window.hovering = true;
          this.openPopup();
        });
        layer.on('mouseout', function (e) {
          setTimeout(() => { if (!window.hovering) this.closePopup() }, 700);
          window.hovering = false;
        });

        var popup = L.DomUtil.create('div', 'infoWindow');
        popup.innerHTML = "<div> <b>" + feature.properties.penyakit + " - " + feature.properties.lokasi + "</b><ul>"
        var sumbers = feature.properties.sumber;
        for (var i in sumbers) {
          var openLink = "<li><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + sumbers[i]['link'] + "\">";
          var title = sumbers[i]['judul'] + " - " + sumbers[i]['nama'];
          var closeLink = "</a></li>";
          var fullLink = openLink + title + closeLink;
          popup.innerHTML += fullLink;
        }
        popup.innerHTML += "</ul></div>";
        popup.addEventListener('mouseover', function(e) {
          window.hovering = true
        });
        popup.addEventListener('mouseout', function(e) {
          setTimeout(() => { if (!window.hovering) layer.closePopup() }, 700);
          window.hovering = false
        });
        layer.bindPopup(popup);
      }
    }).addTo(map);

    setTimeout(() => setIsLoading(false), 100);
  };

  useEffect(() => {
    initializeMap(selectedDisease);
  });

  // render() {
    return (
      <div> 
        <h2>Peta Persebaran Penyakit di Indonesia</h2>
        <div id="radioButtonGroup">
          <DiseaseButton active={selectedDisease === "dbd"} diseaseName="dbd" diseaseText="DBD" color="#D8BAF2" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "covid"} diseaseName="covid" diseaseText="Covid-19" color="#FDB9B9" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "hepatitis_a"} diseaseName="hepatitis_a" diseaseText="Hepatitis A" color="#99E0CD" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "hepatitis_b"} diseaseName="hepatitis_b" diseaseText="Hepatitis B" color="#ADEEBA" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "malaria"} diseaseName="malaria" diseaseText="Malaria" color="#9DC7F7" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "difteri"} diseaseName="difteri" diseaseText="Difteri" color="#FFE1A7" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "kusta"} diseaseName="kusta" diseaseText="Kusta" color="#D5D7D8" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease ==="pneumonia"} diseaseName="pneumonia" diseaseText="Pneumonia" color="#FCD0F9" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "filariasis"} diseaseName="filariasis" diseaseText="Filariasis" color="#999999" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "rabies"} diseaseName="rabies" diseaseText="Rabies" color="#E1C79E" diseaseButtonClickHandle={diseaseClicked}/>
          <DiseaseButton active={selectedDisease === "leptospirosis"} diseaseName="leptospirosis" diseaseText="Leptospirosis" color="#A3A3D5" diseaseButtonClickHandle={diseaseClicked}/>
        </div>
        <LoadingContainer isLoading={isLoading} diseaseName={selectedDisease} />
        <div id="mapContainer">
          <MapComponent isLoading={isLoading}/>
        </div>
        <p>oleh <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/azahra-andani/">Azahra Putri Andani</a> | azahra.andani[at]gmail.com </p>
        <p>Data yang ditampilkan di atas bersumber dari dokumen berita dan tweet yang digunakan pada penelitian. Sejauh ini, belum ada update otomatis untuk data yang ditampilkan di atas.</p>
        <div class="credits">
          <p>
            Globe icon made by <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/authors/payungkead" title="Payungkead">Payungkead</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> |
            Pin icons made by <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </p>
        </div>
      </div>
    );
  // }
}

export default App;
