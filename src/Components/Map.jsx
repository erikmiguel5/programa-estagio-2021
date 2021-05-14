import React, {Component} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css'


class Map extends Component {


  state = {
    lat: -23.5475000,
    lng: -46.6361100,
    zoom: 13,
  }
  
    render(){
      const position = [this.state.lat, this.state.lng];

      return(
        <div className="map-container">
          <MapContainer className="map" center={position} zoom={this.state.zoom} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-23.5475000, -46.6361100]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
        </MapContainer>
      </div>
      )
    }
}

export default Map;

