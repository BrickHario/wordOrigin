var map = L.map('map', {
  center: [52.5, 13.05],
  zoom: 5,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  dragging: false,
  touchZoom: false
});

const start = [52.5, 13.05];

const end = [52.5, 13.95];

L.polyline([start, end], {
  color: 'red',
  weight: 4,
  opacity: 0.8
}).addTo(map);

L.marker(end).bindTooltip("≈ 100 km", {permanent: true, direction: 'right'}).addTo(map);

L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles © Esri', maxZoom: 16 }
).addTo(map);

var countryLayers = {};
var legendControl = null;

var originColor = {
  "Germanic": "#1f77b4",
  "Latin": "#d62728",
  "Slavic": "#2ca02c",
  "Turkic": "#ff7f0e",
  "Indo-Iranian": "#9467bd",
  "Greek": "yellow",
  "Uralic": "#17becf",
  "Celtic": "#bcbd22",
  "Baltic": "#e377c2",
  "Semitic": "#7f7f7f",
  "Kartvelian": "#aec7e8",
  "Altaic": "#8c564b",
  "Finnic": "#2b2b64"
};



var translation = {
  "cloud": {
    "Österreich":    "Germanic",
    "Rumänien":      "Latin",
    "Albanien":      "Slavic",
    "Andorra":       "Latin",
    "Armenien":      "Indo-Iranian",
    "Belarus":       "Slavic",
    "Belgien":       "Latin",
    "Bosnien und Herzegowina": "Slavic",
    "Bulgarien":     "Slavic",
    "Kroatien":       "Slavic",
    "Zypern":         "Greek",
    "Tschechien":     "Slavic",
    "Dänemark":       "Germanic",
    "Estland":        "Finnic",
    "Finnland":       "Finnic",
    "Frankreich":     "Latin",
    "Georgien":       "Kartvelian",
    "Deutschland":    "Germanic",
    "Griechenland":   "Greek",
    "Ungarn":         "Uralic",
    "Island":         "Germanic",
    "Irland":         "Celtic",
    "Italien":        "Latin",
    "Kosovo":         "Slavic",
    "Lettland":       "Baltic",
    "Liechtenstein":  "Germanic",
    "Litauen":        "Baltic",
    "Luxemburg":      "Germanic",
    "Malta":          "Semitic",
    "Moldau":         "Slavic",
    "Monaco":         "Latin",
    "Montenegro":     "Slavic",
    "Niederlande":    "Germanic",
    "Nordmazedonien": "Slavic",
    "Norwegen":       "Germanic",
    "Polen":          "Slavic",
    "Portugal":       "Latin",
    "San Marino":     "Latin",
    "Serbien":        "Slavic",
    "Slowakei":       "Slavic",
    "Slowenien":      "Slavic",
    "Spanien":        "Latin",
    "Schweden":       "Germanic",
    "Schweiz":        "Germanic",
    "Türkei":         "Turkic",
    "Ukraine":        "Slavic",
    "Vereinigtes Königreich": "Germanic",
    "Vatikan":        "Latin"
  }
};


var countries = [
  { file: 'data/ALB.geojson', label: 'Albanien' },
  { file: 'data/AND.geojson', label: 'Andorra' },
  { file: 'data/ARM.geojson', label: 'Armenien' },
  { file: 'data/AUT.geojson', label: 'Österreich' },
  { file: 'data/BLR.geojson', label: 'Belarus' },
  { file: 'data/BEL.geojson', label: 'Belgien' },
  { file: 'data/BIH.geojson', label: 'Bosnien und Herzegowina' },
  { file: 'data/BGR.geojson', label: 'Bulgarien' },
  { file: 'data/HRV.geojson', label: 'Kroatien' },
  { file: 'data/CYP.geojson', label: 'Zypern' },
  { file: 'data/CZE.geojson', label: 'Tschechien' },
  { file: 'data/DNK.geojson', label: 'Dänemark' },
  { file: 'data/EST.geojson', label: 'Estland' },
  { file: 'data/FIN.geojson', label: 'Finnland' },
  { file: 'data/FRA.geojson', label: 'Frankreich' },
  { file: 'data/GEO.geojson', label: 'Georgien' },
  { file: 'data/DEU.geojson', label: 'Deutschland' },
  { file: 'data/GRC.geojson', label: 'Griechenland' },
  { file: 'data/HUN.geojson', label: 'Ungarn' },
  { file: 'data/ISL.geojson', label: 'Island' },
  { file: 'data/IRL.geojson', label: 'Irland' },
  { file: 'data/ITA.geojson', label: 'Italien' },
  { file: 'data/XKX.geojson', label: 'Kosovo' },
  { file: 'data/LVA.geojson', label: 'Lettland' },
  { file: 'data/LIE.geojson', label: 'Liechtenstein' },
  { file: 'data/LTU.geojson', label: 'Litauen' },
  { file: 'data/LUX.geojson', label: 'Luxemburg' },
  { file: 'data/MLT.geojson', label: 'Malta' },
  { file: 'data/MDA.geojson', label: 'Moldau' },
  { file: 'data/MCO.geojson', label: 'Monaco' },
  { file: 'data/MNE.geojson', label: 'Montenegro' },
  { file: 'data/NLD.geojson', label: 'Niederlande' },
  { file: 'data/MKD.geojson', label: 'Nordmazedonien' },
  { file: 'data/NOR.geojson', label: 'Norwegen' },
  { file: 'data/POL.geojson', label: 'Polen' },
  { file: 'data/PRT.geojson', label: 'Portugal' },
  { file: 'data/ROU.geojson', label: 'Rumänien' },
  { file: 'data/SMR.geojson', label: 'San Marino' },
  { file: 'data/SRB.geojson', label: 'Serbien' },
  { file: 'data/SVK.geojson', label: 'Slowakei' },
  { file: 'data/SVN.geojson', label: 'Slowenien' },
  { file: 'data/ESP.geojson', label: 'Spanien' },
  { file: 'data/SWE.geojson', label: 'Schweden' },
  { file: 'data/CHE.geojson', label: 'Schweiz' },
  { file: 'data/TUR.geojson', label: 'Türkei' },
  { file: 'data/UKR.geojson', label: 'Ukraine' },
  { file: 'data/GBR.geojson', label: 'Vereinigtes Königreich' },
  { file: 'data/VAT.geojson', label: 'Vatikan' }
];

countries.forEach(c => {
  fetch(c.file)
    .then(res => res.json())
    .then(geo => {
      var layer = L.geoJson(geo, {
        style: styleCountry.bind(null, c.label),
        onEachFeature: onEachCountry.bind(null, c.label)
      }).addTo(map);
      countryLayers[c.label] = layer;
      if (Object.keys(countryLayers).length === countries.length) {
        updateLegend();
      }
    })
    .catch(err => console.error(`${c.label} GeoJSON error:`, err));
});

function styleCountry(label, feature) {
  var origin = translation["cloud"][label] || "Latin";
  return {
    color: originColor[origin],
    weight: 2,
    fillColor: originColor[origin],
    fillOpacity: 0.5
  };
}

var translated = {
  "Österreich":                "Wolke",
  "Rumänien":                  "nor",
  "Albanien":                  "re",
  "Andorra":                   "núvol",
  "Armenien":                  "amp",
  "Belarus":                   "voblaka",
  "Belgien":                   "wolk",
  "Bosnien und Herzegowina":   "oblak",
  "Bulgarien":                 "oblak",
  "Kroatien":                  "oblak",
  "Zypern":                    "synnefo",
  "Tschechien":                "mrak",
  "Dänemark":                  "sky",
  "Estland":                   "pilv",
  "Finnland":                  "pilvi",
  "Frankreich":                "nuage",
  "Georgien":                  "ghrubeli",
  "Deutschland":               "Wolke",
  "Griechenland":              "synnefo",
  "Ungarn":                    "felho",
  "Island":                    "sky",
  "Irland":                    "scamall",
  "Italien":                   "nuvola",
  "Kosovo":                    "re",
  "Lettland":                  "makonis",
  "Liechtenstein":             "Wolke",
  "Litauen":                   "debesys",
  "Luxemburg":                 "Wollek",
  "Malta":                     "shab",
  "Moldau":                    "nor",
  "Monaco":                    "nuage",
  "Montenegro":                "oblak",
  "Niederlande":               "wolk",
  "Nordmazedonien":            "oblak",
  "Norwegen":                  "sky",
  "Polen":                     "chmura",
  "Portugal":                  "nuvem",
  "San Marino":                "nuvola",
  "Serbien":                   "oblak",
  "Slowakei":                  "oblak",
  "Slowenien":                 "oblak",
  "Spanien":                   "nube",
  "Schweden":                  "moln",
  "Schweiz":                   "Wolke",
  "Türkei":                    "bulut",
  "Ukraine":                   "khmara",
  "Vereinigtes Königreich":    "cloud",
  "Vatikan":                   "nuvola"
};

function onEachCountry(label, feature, layer) {
  layer.on('click', e => {
    var translatedWord = translated[label] || "cloud";
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`cloud → <b>${translatedWord}</b>`)
      .openOn(map);
  });
}


var legendInfo = {
  "cloud": {
    "Germanic": `
      <em>z. B. Deutschland, Island, UK:</em><br>
      • Proto-Germanisch *<em>wlōkō</em>* → ahd. <em>wolka</em>, engl. <em>cloud</em>
    `,
    "Latin": `
      <em>z. B. Italien, Frankreich, Spanien:</em><br>
      • Lat. <em>nūbēs</em> → frz. <em>nuage</em>, ital. <em>nuvola</em>, span. <em>nube</em>
    `,
    "Slavic": `
      <em>z. B. Polen, Serbien, Ukraine:</em><br>
      • Prot.-Slaw. *<em>mъlъka</em>* → <em>oblak</em>, poln. <em>chmura</em>
    `,
    "Turkic": `
      <em>Türkei, Aserbaidschan:</em><br>
      • Prot.-Turk. *<em>köl</em>* → türk. <em>bulut</em>, aserb. <em>bulud</em>
    `,
    "Indo-Iranian": `
      <em>Armenien:</em><br>
      • Altarmenisch <em>kułkʾ</em> → modern <em>kułkʾ</em>
    `,
    "Greek": `
      <em>Griechenland, Zypern:</em><br>
      • Altgr. <em>νεφέλη</em> → neugriech. <em>synnefo</em>
    `,
    "Uralic": `
      <em>Ungarn (uralisch):</em><br>
      • Prot.-Finnoug. *<em>sä̃kʷʰa</em>* → ung. <em>felhő</em>
    `,
    "Finnic": `
      <em>Finnland, Estland:</em><br>
      • Prot.-Finnoug. *<em>sä̃kʷʰa</em>* → finn. <em>pilvi</em>, estn. <em>pilv</em>
    `,
    "Celtic": `
      <em>Irland:</em><br>
      • Altir. <em>scamaill</em> → modern <em>scamall</em>
    `,
    "Baltic": `
      <em>Lettland, Litauen:</em><br>
      • Prot.-Balt. *<em>sīrmē</em>* → lett. <em>mākoņa</em>, lit. <em>debesys</em>
    `,
    "Semitic": `
      <em>Malta:</em><br>
      • Arab. <em>ghayma</em> → maltes. <em>shab</em> (Lehnwort)
    `,
    "Kartvelian": `
      <em>Georgien:</em><br>
      • Altgeorg. <em>ghurebel(i)</em> → modern <em>ghrubeli</em>
    `,
    "Altaic": `
      <em>Zentralasien (historisch):</em><br>
      • Prot.-Altaic *<em>bolga</em>* → türk. <em>bolga</em>, <em>bulutl</em>
    `
  }
};



function updateLegend() {
  if (legendControl) {
    map.removeControl(legendControl);
    legendControl = null;
  }
  var info = legendInfo["cloud"];
  legendControl = L.control({ position: 'bottomleft' });
  legendControl.onAdd = function() {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
      <div style="font-weight:bold; margin-bottom:0.75em; font-size:1.2em;">
        Etymologie: „cloud“
      </div>
    `;
    Object.entries(info).forEach(([family, html]) => {
      var color = originColor[family] || "#999";
      div.innerHTML += `
        <div style="margin-bottom:0.75em;">
          <span class="legend-color" style="background:${color}"></span>
          <strong style="font-size:1.1em;">${family}</strong><br>${html}
        </div>
        <hr>
      `;
    });
    return div;
  };
  legendControl.addTo(map);
}

updateLegend();

