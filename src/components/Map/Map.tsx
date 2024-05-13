import * as bootstrap from 'bootstrap';
import {
  Map,
  MapBrowserEvent,
  Overlay, //objects
  View,
} from 'ol';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import React, { RefObject, useEffect } from 'react';
import { useGetPointsQuery } from '../../api/points.api';
import { MapPoint } from '../../types/point-form.type';

function setPoints(points: MapPoint[]): VectorLayer<VectorSource<Feature<Point>>>[] {
  if (!points) {
    return [];
  }

  const resultArr = [];
  for (const point of points) {
    const iconFeature = new Feature({
      geometry: new Point([point.coordinates.x, point.coordinates.y]),
      name: point.title,
    });

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    resultArr.push(vectorLayer);
  }

  return resultArr;
}

function MapComponent({ handleDrawerOpen }: { handleDrawerOpen: any }) {
  const mapDivFer: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  const popupDivFer: RefObject<HTMLElement> = React.createRef<HTMLElement>();
  const contentDivFer: RefObject<HTMLElement> = React.createRef<HTMLElement>();

  const { data: points } = useGetPointsQuery('');

  useEffect(() => {
    const source: VectorSource = new VectorSource({ features: undefined });
    const layer: VectorLayer<any> = new VectorLayer({ source });

    const popup = new Overlay({
      element: popupDivFer.current ?? undefined,
    });

    const tileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    const map = new Map({
      target: mapDivFer.current ?? '',
      layers: [tileLayer, ...setPoints(points)],
      view: new View({
        center: [2338378.964363548, 6842137.232060028],
        zoom: 15,
      }),
    });

    const onMapClick = (event: MapBrowserEvent<any>) => {
      if (!popupDivFer.current) {
        return;
      }

      const element = popup.getElement() as Element;
      let popover = bootstrap.Popover.getInstance(element);
      const coordinate = event.coordinate;

      if (popover) {
        popover.dispose();
      }

      popup.setPosition(coordinate);
      popover = new bootstrap.Popover(element, {
        animation: true,
        container: element,
        content: '<span>Fill form and save this point</span>',
        html: true,
        placement: 'top',
        // title: 'Welcome to OpenLayers',
      });
      popover.show();

      handleDrawerOpen(event.coordinate);
    };

    map.addOverlay(popup);
    map.addLayer(layer);
    map.on('singleclick', onMapClick);

    return () => map.setTarget('');
  }, [contentDivFer, handleDrawerOpen, mapDivFer, points, popupDivFer]);

  return (
    <>
      <div ref={mapDivFer} style={{ height: '100vh', width: '100vw' }} />
      <div ref={popupDivFer as React.RefObject<HTMLDivElement>}>
      </div>
    </>
  );
}

export default React.memo(MapComponent);
