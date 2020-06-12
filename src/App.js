import React, { Component } from 'react';
import './App.css';
import data_dbd from './data/tweets_geojson_dbd.json';
import data_covid from './data/tweets_geojson_covid.json';
import data_hepatitis_a from './data/tweets_geojson_hepatitis_a.json';
import data_hepatitis_b from './data/tweets_geojson_hepatitis_b.json';
import data_malaria from './data/tweets_geojson_malaria.json';
import data_difteri from './data/tweets_geojson_difteri.json';
import data_kusta from './data/tweets_geojson_kusta.json';
import data_rabies from './data/tweets_geojson_rabies.json';
import data_pneumonia from './data/tweets_geojson_pneumonia.json';
import data_leptospirosis from './data/tweets_geojson_leptospirosis.json';
import data_filariasis from './data/tweets_geojson_filariasis.json';

let L = window.L;
let map = window.map;

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedDisease: "dbd"
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({selectedDisease: event.target.value});
    console.log(this.state.selectedDisease);
    this.initializeMap(event.target.value);
  }

  hovering = false

  componentDidMount() {
    this.initializeMap(this.state.selectedDisease);
  }

  initializeMap = (disease) => {

    var positionCenter = L.latLng(-1.959678, 122.214959);

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
        popup.innerHTML = "<div> <b>" + feature.properties.penyakit + " - " + feature.properties.lokasi + "</b></br>"
        var sumbers = feature.properties.sumber;
        for (var i in sumbers) {
          var openLink = "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + sumbers[i]['link'] + "\">";
          var title = sumbers[i]['judul'] + " - " + sumbers[i]['nama'];
          var closeLink = "</a></br>";
          var fullLink = openLink + title + closeLink;
          popup.innerHTML += fullLink;
        }
        popup.innerHTML += "</div>";
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

    var ACCESS_TOKEN = 'pk.eyJ1IjoiYXphaHJhbmRhbmkiLCJhIjoiY2tiYTRydGl5MGNiZDJ4cWtsN2c3c2tpNCJ9.5LzhinKOZhxMZgSd7-eOag'
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ACCESS_TOKEN,
    }).addTo(map);

  };

  optionDbd = () => '<div>heyy</div>';

  render() {
    
    return (
      <div> 
        <h2>Peta Persebaran Penyakit di Indonesia</h2>
        <div onChange={this.onChangeValue} id="radioButtonGroup">
          <input type="radio" value="dbd" name="disease" checked={this.state.selectedDisease === "dbd"} /> DBD
          <input type="radio" value="covid" name="disease" checked={this.state.selectedDisease === "covid"}/> Covid
          <input type="radio" value="hepatitis_a" name="disease" checked={this.state.selectedDisease === "hepatitis_a"} /> Hepatitis A
          <input type="radio" value="hepatitis_b" name="disease" checked={this.state.selectedDisease === "hepatitis_b"}/> Hepatitis B
          <input type="radio" value="malaria" name="disease" checked={this.state.selectedDisease === "malaria"}/> Malaria
          <input type="radio" value="difteri" name="disease" checked={this.state.selectedDisease === "difteri"} /> Difteri
          <input type="radio" value="kusta" name="disease" checked={this.state.selectedDisease === "kusta"}/> Kusta
          <input type="radio" value="pneumonia" name="disease" checked={this.state.selectedDisease === "pneumonia"}/> Pneumonia
          <input type="radio" value="filariasis" name="disease" checked={this.state.selectedDisease === "filariasis"}/> Filariasis
          <input type="radio" value="rabies" name="disease" checked={this.state.selectedDisease === "rabies"} /> Rabies
          <input type="radio" value="leptospirosis" name="disease" checked={this.state.selectedDisease === "leptospirosis"}/> Leptospirosis
        </div>
        <div id="mapContainer">
          <div id="map"/>
        </div>
        <p>by Azahra Putri Andani</p>
      </div>
    );
  }
}

export default App;
