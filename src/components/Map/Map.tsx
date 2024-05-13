import {
  Map,
  MapBrowserEvent,
  Overlay, //objects
  View,
} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import React, { RefObject, useEffect } from 'react';
import { useGetPointsQuery } from '../../api/points.api';
import { onMapClickHelper, onPointHoverHelper, setPointsHelper } from '../helpers/map.helper';

function MapComponent({ handleDrawerOpen }: { handleDrawerOpen: any }) {
  const mapDivRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  const popupDivRef: RefObject<HTMLElement> = React.createRef<HTMLElement>();
  const contentDivRef: RefObject<HTMLElement> = React.createRef<HTMLElement>();

  const { data: points } = useGetPointsQuery('');

  // TODO: надо сделать так, чтобы после добавления точки не обновлялась карта, но точка добавлялась (если возможно)
  useEffect(() => {
    const source: VectorSource = new VectorSource({ features: undefined });
    const layer: VectorLayer<any> = new VectorLayer({ source });

    const popupOverlay = new Overlay({
      element: popupDivRef.current ?? undefined,
    });

    const tileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      }),
    });

    const map = new Map({
      target: mapDivRef.current ?? '',
      layers: [tileLayer, ...setPointsHelper(points)],
      view: new View({
        center: [2338378.964363548, 6842137.232060028],
        zoom: 15,
      }),
    });

    const onMapClick = (event: MapBrowserEvent<any>) => {
      onMapClickHelper(popupDivRef, popupOverlay, event.coordinate);
      handleDrawerOpen(event.coordinate);
    };
    const onPointHover = (event: MapBrowserEvent<any>) => {
      onPointHoverHelper(map, mapDivRef, event);
    };

    map.addOverlay(popupOverlay);
    map.addLayer(layer);

    map.on('singleclick', onMapClick);
    map.on('pointermove', onPointHover);

    return () => map.setTarget('');
  }, [contentDivRef, handleDrawerOpen, mapDivRef, points, popupDivRef]);

  return (
    <>
      <div ref={mapDivRef} style={{ height: '100vh', width: '100vw' }} />
      <div ref={popupDivRef as React.RefObject<HTMLDivElement>}></div>
    </>
  );
}

export default React.memo(MapComponent);
