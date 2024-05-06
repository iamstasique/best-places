import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import PointForm from '../PointForm/PointForm';
import style from './Drawer.module.scss';
import { DRAWER_WIDTH } from '../../constants/drawer.constants';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

function DrawerComponent({
  selectedCoordinates,
  open,
  handleDrawerClose,
}: {
  selectedCoordinates: number[];
  open: boolean;
  handleDrawerClose: any;
}) {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
        },
      }}
      variant='persistent'
      anchor='right'
      open={open}
    >
      <DrawerHeader theme={theme}>
        <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        New Point
      </DrawerHeader>
      <div className={style['drawer-content']}>
        {selectedCoordinates.length ? <PointForm selectedCoordinates={selectedCoordinates} /> : <p>Please select a point on the map</p>}
      </div>
    </Drawer>
  );
}

export default DrawerComponent;
