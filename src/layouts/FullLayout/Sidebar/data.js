import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import BallotIcon from '@mui/icons-material/Ballot';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CarCrashOutlinedIcon from '@mui/icons-material/CarCrashOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboards/dashboard1",
    roles: ["ROLE_ADMIN"],
  },
  {
    title: "Clients",
    icon: PeopleOutlineIcon,
    href: "/Clients",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
  {
    title: "Gestionnaires",
    icon: AssignmentIndOutlinedIcon,
    href: "/Gestionnaires",
    roles: ["ROLE_ADMIN"],
  },
  {
    title: "Réclamations",
    icon: BallotIcon,
    href: "/Reclamations",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
  /*  {
     title: "Autocomplete",
     icon: AddToPhotosOutlinedIcon,
     href: "/form-elements/autocomplete",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Buttons",
     icon: AspectRatioOutlinedIcon,
     href: "/form-elements/button",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Checkbox",
     icon: AssignmentTurnedInOutlinedIcon,
     href: "/form-elements/checkbox",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Radio",
     icon: AlbumOutlinedIcon,
     href: "/form-elements/radio",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Slider",
     icon: SwitchCameraOutlinedIcon,
     href: "/form-elements/slider",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Switch",
     icon: SwitchLeftOutlinedIcon,
     href: "/form-elements/switch",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   },
   {
     title: "Form",
     icon: DescriptionOutlinedIcon,
     href: "/form-layouts/form-layouts",
     roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
   }, */

  {
    title: "Sinistres",
    icon: CarCrashOutlinedIcon,
    href: "/Sinistres",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
  {
    title: "Devis",
    icon: PointOfSaleOutlinedIcon,
    href: "/Devis",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
  {
    title: "Garanties",
    icon: PlaylistAddIcon,
    href: "/Garanties",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
  {
    title: "Mon profil",
    icon: AccountCircleOutlinedIcon,
    href: "/Profil",
    roles: ["ROLE_ADMIN", "ROLE_GESTIONNAIRE"],
  },
];

export default Menuitems;


