import React, {Component} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import bus from '../assets/bus2.png'
import busStop from '../assets/busStop.png'
import L from 'leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'


class Map extends Component {

  state = {
    validate: false,
    veiculosPosition: [],
    paradasPositio: []
  }

  busIcon = L.icon({
    iconUrl: bus,
    iconSize: [30, 30],
    iconAnchor: [22, 10]
  })

  busStopIcon = L.icon({
    iconUrl: busStop,
    iconSize: [40, 40],
    iconAnchor: [22, 10]
  })


  /* Realiza a autenticação da API olho vivo */
  autenticarApiMap(){
    console.log("Autenticando API")
    axios.post('https://aiko-olhovivo-proxy.aikodigital.io/Login/Autenticar?token={token}')
        .then((response) => {
            this.setState((state) => {
              return {validate: response.data}
            })
          })
  }

  carregarParadas(){
    axios.get('https://aiko-olhovivo-proxy.aikodigital.io/Parada')
        .then((response) => {
            this.setState({paradasPosition: response.data})
            console.log("parada")
            console.log(this.state.paradasPosition)
        })

  }

  componentDidMount(){
    console.log("Component did mount here ...")

    this.map = L.map('map', {
      center: [-23.5475000, -46.6361100],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });;

    this.autenticarApiMap()
    this.veiculosPos()
    this.createBusVet()
    this.carregarParadas()

    /*Cria layer que armazena os marcadores no mapa */
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.state.veiculosPosition);
}

  updateMarkers(veiculosPosition) {
    //this.layer.clearLayers();
    veiculosPosition.forEach(marker => {
      L.marker(
        marker.latLng,
        { title: marker.title, icon: this.busStopIcon }
      ).addTo(this.layer);
    });
  }

  componentDidUpdate({ markersData }) {
    // check if data has changed
    if (this.props.markersData !== markersData) {
      this.updateMarkers(this.props.markersData);
    }
  }


  /*Adiciona marcador com posição do ônibus no mapa */
  createBusVet(){
      console.log("criando vetor onibus")
      let bus = []

      if(this.state.veiculosPosition){
        if(this.state.veiculosPosition.l){
          this.state.veiculosPosition.l.map(function(item){
            return item.vs.map(function(pos){
              if(pos){
                console.log(pos.px)
                console.log(pos.py)
                //bus.push(pos)
                //this.setState({busVet: this.bus})

              }
            })
          })
        }
      }
      console.log("aqui =>")
      console.log(bus[5]) 
      
      var position  = [-23.6222737749999998, -46.698079249999996]
      //var markers = new L.Marker(new L.LatLng(-23.6242737749999998, -46.698079249999996));

  }


  veiculosPos(){
    console.log("Recebendo posicao dos veiculos")
    axios.get('https://aiko-olhovivo-proxy.aikodigital.io/Posicao')
        .then((response) => {
            this.setState({veiculosPosition: response.data})
        }) 
  }
  
    render(){
      const position  = [-23.6222737749999998, -46.678079249999996];
      console.log(this.state.veiculosPosition)
      

      return(
        <div className="map-container" >
          <div id="map"></div>
        </div>
      )
    }
}

export default Map;

