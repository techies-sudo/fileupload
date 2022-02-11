import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

const NavLayout = () => (
  <>
    <Navbar />
    <Outlet /> 
  </>
);

export default NavLayout