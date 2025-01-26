import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import MuseumIcon from '@mui/icons-material/Museum';

const SideBar = () => {
  const links = [
    { path: '/forms', label: 'Формы', icon: <InfoIcon /> },
    { path: '/museums', label: 'Музеи', icon: <MuseumIcon /> },
  ];

  return (
    <Box sx={{ width: '100%', pt: 8 }}>
      <Divider />
      <List sx={{ px: 4 }}>
        {links.map((link) => (
          <ListItem
            key={link.path}
            component={NavLink}
            to={link.path}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&.active': {
                backgroundColor: '#00162e', // Цвет активной ссылки
                color: '#fff',
                borderRadius: '8px',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
