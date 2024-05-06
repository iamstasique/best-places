import {
    Map,
    MapBrowserEvent, //objects
    View,
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import React, { useEffect } from 'react';

function MapComponent({ handleDrawerOpen }: { handleDrawerOpen: any }) {
  const mapDivFer = React.createRef<HTMLDivElement>();

  const source: VectorSource = new VectorSource({ features: undefined });
  const layer: VectorLayer<any> = new VectorLayer({ source });

  const onMapClick = (event: MapBrowserEvent<any>) => {
    // const featureToAdd = new Feature({
    //   geometry: new Point(event.coordinate),
    // });

    handleDrawerOpen(event.coordinate);

    // cons`t style = new Style({
    //   image: new Circle(event.coordinate, 6),
    // });

    // featureToAdd.setStyle(style);
    // source.clear();
    // source.addFeatures([featureToAdd]);

    // const fillStyle = new Fill({ color: [84, 118, 255, 1] });
    // const strokeStyle = new Stroke({ color: [46, 45, 45, 1], width: 1.2 });
    // cons`t circleStyle = new Circle([1, 2], 1.2);
  };

  useEffect(() => {
    const map = new Map({
      target: mapDivFer.current ?? '',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [2338378.964363548, 6842137.232060028],
        zoom: 15,
      }),
    });

    map.addLayer(layer);
    map.on('singleclick', onMapClick);

    return () => map.setTarget('');
  }, [mapDivFer]);

  return <div ref={mapDivFer} style={{ height: '100vh', width: '100vw' }} className='map' />;
}

export default MapComponent;
