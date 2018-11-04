import { GeoJSON, Popup } from 'react-leaflet';
import React, { Component } from 'react';

import { GeoJsonObject } from 'geojson';
import { PathOptions } from 'leaflet';

interface Props {
  name: string;
  geoJsonData: GeoJsonObject,
}

export default class Park extends Component<Props, {}> {

  private getStyles = (): PathOptions => {
    return {
      "fillColor": "#D3FECC",
      "fillOpacity": 0.5,
      "color": "#7cc370",
      "weight": 5,
      "opacity": 0.65
    }
  }


  public render() {
    return (
      <GeoJSON data={this.props.geoJsonData} style={this.getStyles}>
        <Popup>
          <div>
            <p>{this.props.name}</p>
          </div>
        </Popup>
      </GeoJSON>
    )
  }
}