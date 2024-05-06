import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const drawerWidth = 240;

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
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
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
      {selectedCoordinates.length ? selectedCoordinates : <p>Please select a point on the map</p>}
    </Drawer>
  );
}

export default DrawerComponent;
