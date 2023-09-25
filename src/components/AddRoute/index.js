import  {Component} from 'react'

import './index.css'
import Header from '../Header'
import Modal from '../Modal'

class AddRoute extends Component{

    state = {
        isModalOpen : false,
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
      };
    
      closeModal = () => {
        this.setState({ isModalOpen: false });
      };

    render(){

        const { isModalOpen } = this.state;

        return(
            <div>
                <Header/>
                <hr/>
                <div className='add-route-bg'>
                <h2>Add Route</h2>
                <p>Home &gt; Route &gt; Add Route</p>
                <hr/>
                <p>*Any Changes Will Reflect From Next Day</p>
                <input type="checkbox" id="isActive" name="myCheckbox"/>
                <label htmlFor="isActive">is Active</label>
                <br/>
                <h2>Route Details</h2>
                <div className='route-visit'>
                <div>
                <div className='route-details-card'>      
                    <div className='route-details'>
                    <label htmlFor='customerCode' >Customer Code*</label>
                    <input className='details-input' id='customerCode' type='text' placeholder='Enter your Cust. code' />
                    <label htmlFor='name'>Name*</label>
                    <input className='details-input' id='name' type='text' placeholder='Enter your Name' />
                    </div>
                    <br/>
                    <div className='route-details'>
                    <label htmlFor='fromDate'>From Date</label>
                    <input className='details-input' id='fromDate' type='date' placeholder='Enter From Date' />
                    <label htmlFor='toDate'>To Date</label>
                    <input  className='details-input'id='toDate' type='date' placeholder='Enter To Date' />
                    </div>
                </div>
                <div>
                    <h2>Warehouse</h2>
                    <label htmlFor='warehouseName'>Warehouse Name</label>
                    <select id="warehouseName">
                    <option value="jbc distribution">jbc distribution</option>
                    </select>
                    <label htmlFor='usersList'>User</label>
                    <select id="usersList">
                    <option value="jbc distribution">jbc distribution</option>
                    </select>
                </div>
                </div>
                <div className='visit'>
                    <h2>Visit Frequency</h2>
                    <input type="checkbox" id="multipleWeek" name="myCheckbox"/>
                    <label htmlFor="multipleWeek">Multiple per Weeks</label>
                </div>
                </div>
                <br/>
                <div className='warehouse-list-card'>
                <div>
                    <h2>Warehouse</h2>
                    <label htmlFor='warehouseSearch'>Search</label>
                    <input id='warehouseSearch' type='search' className='details-input' placeholder='Search Here' />
                    <button className='search-button' type='button' >Search</button>
                </div>
                <div>
                    <button type='button' className='button' onClick={this.openModal}>Customer List</button>
                    <Modal isOpen={isModalOpen} onClose={this.closeModal} />
                </div>
                </div>
                <br/>
                <div>
                    <table>
                        <tr>
                            <th>Sequence</th>
                            <th>Customer Number</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                        </tr>
                        <tr>
                            <td>
                                <input type='checkBox' />
                            </td>
                            <td>552142141</td>
                            <td>SK Groceries And Traders</td>
                            <td>SK Groceries And Traders</td>
                        </tr>
                    </table>
                </div>
                <div className='buttons'>
                    <button className='button' type='button'>Delete Selected List</button>
                    <button className='button' type='button'>Back</button>
                    <button className='search-button' type='button'>Save</button>
                </div>
                </div>
            </div>
        )
    }
}

export default AddRoute