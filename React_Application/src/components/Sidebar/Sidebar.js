import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaSeedling} from 'react-icons/fa';
import { FaLeaf} from 'react-icons/fa';
import { FaBook} from 'react-icons/fa';
import styles from './Sidebar.module.css'
import Logo from './Logo.svg'
import './custom.scss';
import { Link } from 'react-router-dom';


function Sidebar () {
return(
    <div className={styles.Block}>
    <ProSidebar>
        <SidebarHeader className={styles.SidebarHeader}>
<img src={Logo} classname={styles.img}/>
<h4 className={styles.GreenhouseH4}> Greenhouse</h4>
  </SidebarHeader>
        <Menu iconShape="circle">
          <MenuItem icon={<FaSeedling/>} className={styles.MenuItem}>Greenhouse

            <Link to="/greenhouse" />

          </MenuItem>
          <MenuItem icon={<FaLeaf/>} className={styles.MenuItem}>Harvested Plants
            <Link to="/Products" />

          </MenuItem>
          <MenuItem icon={<FaBook/>}className={styles.MenuItem}>Plant Information
            <Link to="/Dictionary" />

          </MenuItem>
        </Menu>
    </ProSidebar>
        </div>
)


}
export default Sidebar