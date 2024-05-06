import { CoordinatePlane } from '../enums/coordinate-plane.enum';

export type Coordinates = {
  [CoordinatePlane.X]: number;
  [CoordinatePlane.Y]: number;
};

export type Point = {
  id?: any;
  title: string;
  description: string;
  coordinates: Coordinates;
};
