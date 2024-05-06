import * as React from 'react';
import DrawerComponent from '../../components/Drawer/Drawer';
import HeaderComponent from '../../components/Header/Header';
import MapComponent from '../../components/Map/Map';

function MainComponent() {
  const [open, setOpen] = React.useState(false);
  const [selectedCoordinates, setSelectedCoordinates]: [number[], any] = React.useState([]);

  const handleDrawerOpen = (coordinates: number[]) => {
    const clickFromTheMap = Array.isArray(coordinates);
    if (clickFromTheMap) {
      setSelectedCoordinates(coordinates);
    }

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeaderComponent open={open} handleDrawerOpen={handleDrawerOpen} />
      <MapComponent handleDrawerOpen={handleDrawerOpen} />
      <DrawerComponent selectedCoordinates={selectedCoordinates} open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
}

export default MainComponent;
