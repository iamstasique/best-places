import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CoordinatePlane } from '../../enums/coordinate-plane.enum';
import style from './PointForm.module.scss';
import { Point } from '../../types/point-form.type';

function PointForm({ selectedCoordinates }: { selectedCoordinates: number[] }) {
  const initialPointForm: Point = {
    title: '',
    description: '',
    coordinates: {
      [CoordinatePlane.X]: selectedCoordinates[0],
      [CoordinatePlane.Y]: selectedCoordinates[1],
    },
  };

  const [pointForm, setPointForm] = useState(initialPointForm);

  useEffect(
    () =>
      setPointForm({
        ...initialPointForm,
        coordinates: { [CoordinatePlane.X]: selectedCoordinates[0], [CoordinatePlane.Y]: selectedCoordinates[1] },
      }),
    [selectedCoordinates]
  );

  const updateCoordinates = function (coordinatePlane: CoordinatePlane, newValue: number) {
    // TODO: если залогать, то будет выводиться предыдущее значение
    setPointForm({ ...pointForm, coordinates: { ...pointForm.coordinates, [coordinatePlane]: newValue } });
  };

  const updateTitle = function (title: string) {
    // TODO: если залогать, то будет выводиться предыдущее значение
    setPointForm({ ...pointForm, title });
  };

  const updateDescription = function (description: string) {
    // TODO: если залогать, то будет выводиться предыдущее значение
    setPointForm({ ...pointForm, description });
  };

  return (
    <div className={style['point-form']}>
      <div className={style['point-form-fields']}>
        <TextField
          id='outlined-controlled'
          label='Title'
          required
          value={pointForm.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateTitle(event.target.value);
          }}
        />
        <TextField
          id='outlined-controlled'
          label='Description'
          required
          value={pointForm.description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateDescription(event.target.value);
          }}
        />
        <TextField
          id='outlined-controlled'
          label={`${CoordinatePlane.X.toUpperCase()} plane`}
          type='number'
          required
          value={pointForm.coordinates.x}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateCoordinates(CoordinatePlane.X, +event.target.value);
          }}
        />
        <TextField
          id='outlined-controlled'
          label={`${CoordinatePlane.Y.toUpperCase()} plane`}
          value={pointForm.coordinates.y}
          type='number'
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            updateCoordinates(CoordinatePlane.Y, +event.target.value);
          }}
        />
      </div>

      {/* TODO: сделать блокировку конпку если какое-то из полей не валидно */}
      <div className={style['point-form-actions']}>
        <Button variant='contained'>Save</Button>
        <Button variant='outlined' color='error'>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default PointForm;
