import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 350;

const routes = {
  Home: '/',
  Orders: '/orders',
  Items: '/items'
};

const Home = () => {
  const location = useLocation();
  return (
    <Drawer variant="permanent" style={{ width: drawerWidth, flexShrink: 0 }}>
      <List>
        {['Home', 'Orders', 'Items'].map((text, index) => {
          let icon;
          switch (text) {
            case 'Home':
              icon = <HomeIcon />;
              break;
            case 'Orders':
              icon = <ShoppingBasketIcon />;
              break;
            case 'Items':
              icon = <ListAltIcon />;
              break;
            default:
              icon = <HomeIcon />;
              break;
          }
          return (
            <ListItem
              component={Link}
              to={routes[text]}
              button
              key={text}
              style={{ backgroundColor: location.pathname === routes[text] ? 'lightblue' : 'transparent' }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Home;
