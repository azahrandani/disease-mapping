import React, { Component, useState, useEffect } from 'react';
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

function DiseaseButton(props) {
  const [isClicked, setIsClicked] = useState(false);

  const buttonStyleClicked = {
    background: 'rgba(' + props.red + ',' + props.green + ',' + props.blue + ', 0.4)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2em',
    padding: '10px' 
  }

  const onClick = () => {
    console.log(props.diseaseName + ' was clicked!');
    setIsClicked(true);
  }

  const buttonStyle = {
    background: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.2em',
    padding: '10px' 
  }

  return (
    <div>
      <button class="disease-button" style={isClicked ? buttonStyleClicked : buttonStyle} onClick={onClick}>{props.diseaseName}</button>
    </div>
  );
};

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
  }
}

export default App;
