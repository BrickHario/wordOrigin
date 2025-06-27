# Word Origins Europe Map

A **detailed report** covering the target user, data sources, methodology, design choices, analysis, potential improvements, critical reflection, and key takeaways from the project.

## 🗺️ Overview

This project visualizes the **etymological origin** of the word **"cloud"** across European countries. It uses:
- Historical language family data
- Country-based GeoJSON layers
- A Leaflet-based interactive map

## 🌍 Features

- Map of Europe with country-specific etymologies for "cloud"
- Color-coded language families
- Click on a country to see the translation
- Legend showing the proto-language root and examples
- Static 100 km reference line
- Base map using Esri Light Gray Canvas

## 🏗️ Technologies

- [Leaflet.js](https://leafletjs.com/)
- GeoJSON (per-country layers)
- Vanilla JavaScript
- HTML & CSS

## 📁 Data

- `/data/*.geojson`: GeoJSON shapes for each European country
- `translation`: Mapping from country name to language family
- `translated`: Modern translation of "cloud" in each language

## 📏 Reference Distance

A red polyline with tooltip (≈100 km) shows approximate scale on the map for spatial orientation.

## 📌 How to Run

1. Clone/download the project
2. Ensure you serve the project with a local server (e.g., using VS Code Live Server or Python's `http.server`)
3. Open `index.html` in your browser

## 🔧 Potential Improvements

- Add support for more words
- Expand to global etymology
- Add time slider to visualize historical language shifts
- Improve mobile support

## 🧠 Critical Reflection

This map helps visualize linguistic diversity and shared roots across European languages. It reveals cultural and historical connections often invisible in modern maps.

## 📚 Sources

- Etymological dictionaries
- Wiktionary and academic language family trees
- ISO 3166-1 country codes and shapes

