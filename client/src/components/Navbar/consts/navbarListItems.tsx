import * as React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const mainNavbarItems = [
  {
    id: 0,
    icon: <PersonRoundedIcon />,
    label: 'Profile',
    route: '/profile',
  },
  {
    id: 1,
    icon: <AppRegistrationRoundedIcon />,
    label: 'Applications',
    route: '/applied',
  },
  {
    id: 2,
    icon: <ReviewsRoundedIcon />,
    label: 'Reviews',
    route: '/reviews',
  },
  {
    id: 3,
    icon: <MoodRoundedIcon />,
    label: 'Interviews',
    route: '/interviewlist',
  },
  {
    id: 4,
    icon: <AttachMoneyIcon />,
    label: "Salary",
    route: "/salary",
  },
  {
    id: 5,
    icon: <CoPresentRoundedIcon />,
    label: 'Website',
    route: '/personalwebsiteview',
  },

]