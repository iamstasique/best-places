import * as bootstrap from 'bootstrap';
import { Map } from 'ol';
import Feature from 'ol/Feature.js';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { RefObject } from 'react';
import { MapPoint } from '../../types/point-form.type';

export function setPointsHelper(points: MapPoint[]): VectorLayer<VectorSource<Feature<Point>>>[] {
  if (!points) {
    return [];
  }

  const resultArr = [];
  for (const point of points) {
    const iconFeature = new Feature({
      geometry: new Point([point.coordinates.x, point.coordinates.y]),
      title: point.title,
    });

    const iconStyle = new Style({
      image: new Circle({
        radius: 12,
        fill: new Fill({
          color: 'white',
        }),
        stroke: new Stroke({
          color: 'black',
          width: 1,
        }),
      }),
      text: new Text({
        text: point.title,
        font: 'bold 16px Calibri,sans-serif',
        fill: new Fill({
          color: 'black',
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    });

    iconFeature.setStyle(iconStyle);

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

export function onMapClickHelper(popupDivRef: RefObject<HTMLElement>, popupOverlay: Overlay, coordinate: number[]): void {
  if (!popupDivRef.current) {
    return;
  }

  const element = popupOverlay.getElement() as Element;
  let popover = bootstrap.Popover.getInstance(element);

  if (popover) {
    popover.dispose();
  }

  popupOverlay.setPosition(coordinate);
  popover = new bootstrap.Popover(element, {
    animation: true,
    container: element,
    content: '<span>Fill form and save this point</span>',
    html: true,
    placement: 'top',
    // title: 'Welcome to OpenLayers',
  });
  popover.show();
}

export function onPointHoverHelper(map: Map, mapDivRef: RefObject<HTMLDivElement>, event: MapBrowserEvent<any>): void {
  const pixel = map.getEventPixel(event.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);

  if (mapDivRef.current) {
    mapDivRef.current.style.cursor = hit ? 'pointer' : '';
  }
}
