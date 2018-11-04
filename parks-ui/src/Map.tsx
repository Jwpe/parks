import { Map, TileLayer } from 'react-leaflet';
import React, { Component } from 'react';

import { GeoJsonObject } from 'geojson';

import Park from './Park';

import './Map.css'

const THUNDERFOREST_API_KEY = process.env.REACT_APP_THUNDERFOREST_API_KEY;

interface ParkData {
  recordid: string;
  fields: {
    site_name: string;
    geo_shape: GeoJsonObject;
  }
}

interface State {
  parkData: ParkData[];
}


export default class ParkMap extends Component<{}, State> {

  public constructor(props:{}) {
    super(props);
    this.state = {
      parkData: []
    }
  }


  private getParkData(): void {
    fetch("https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=parks-and-greens-spaces&rows=500")
      .then(response => response.json())
      .then(data => {
        this.setState({parkData: data.records})  
      }
    )
  }
  public componentDidMount() {
    this.getParkData();
  }

  private renderParks() {
    console.log("Rendering parks from GEOJSON")
    const parks = this.state.parkData.map(p => <Park key={p.recordid} name={p.fields.site_name} geoJsonData={p.fields.geo_shape}/>)
    return parks
  }

  public render() {
    const position: [number, number] = [51.4545, -2.5879];
  
    return (
      <Map className="parkmap" center={position} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={`https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${THUNDERFOREST_API_KEY}`}
        />
        {this.renderParks()}
      </Map>
    )
  }
}