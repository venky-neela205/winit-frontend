import {AiFillDashboard} from 'react-icons/ai'
import {BiSolidReport} from 'react-icons/bi'
import {FaWallet} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {TbReportAnalytics} from 'react-icons/tb'
import {TbReport} from 'react-icons/tb'

import './index.css'

const Header = () => {
    return(
        <div className='header'>
            <ul className='header-dashboard'>
                <li>
                    <AiFillDashboard/>
                    <p>Dashboard</p>
                </li>
                <li>
                    <BiSolidReport/>
                    <p>Reports</p>
                </li>
                <li>
                    <FaWallet/>
                    <p>Transactions</p>
                </li>
                <li>
                    <CgProfile/>
                    <p>Administration</p>
                </li>
                <li>
                    <TbReportAnalytics/>
                    <p>Master</p>
                </li>
                <li>
                    <TbReport/>
                    <p>Endorsement</p>
                </li>
            </ul>
            <div className='header-welcome'>
                <p>Welcome<span> : admin</span> Logout ChangePassword Username : <span>[admin]admin</span> Role : <span>[Administration]Administration</span></p>
            </div>
        </div>
    )
}

export default Header