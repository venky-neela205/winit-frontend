import  {Component} from 'react'

import './index.css'
import Header from '../Header'

class MainRoute extends Component{

    render(){
        return(
            <div>
                <Header/>
                <hr/>
            <div className='add-route-bg'>
                <h4>Search Criteria :</h4>
                <p>Code: <span>All</span>, Name: <span>All</span>, Start Date: <span>01 Sep 2023</span>, End Date: <span>08 Sep 2023</span>, Status: <span>Active</span></p>
                <br/>
                <h1>Add Route</h1>
                <div>
                    <table>
                        <tr>
                            <th>S.no</th>
                            <th>Code</th>
                            <th>name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Is Active</th>
                            <th>User</th>
                            <th>Warehouse</th>
                            <th>Total Customers</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>552142141</td>
                            <td>SK Groceries And Traders</td>
                            <td>31 Dec 2024</td>
                            <td>31 Dec 2024</td>
                            <td>Yes</td>
                            <td>Philippe Martin</td>
                            <td>Philippe Martin</td>
                            <td>32</td>
                            <td>
                                <button type='button'>action</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            </div>
        )
    }
}

export default MainRoute