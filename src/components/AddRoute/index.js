import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import './index.css';
import Header from '../Header';

const AddRoute = () => {
  const [state, setState] = useState({
    code: '',
    name: '',
    fromDate: '',
    toDate: '',
    warehouseId: '',
    userId: '',
    isActive: false,
    isModalOpen: false,
    isVisitFrequency: false,
    warehouseList: [],
    
    userList: [],
    storeList: [],
    selectedCustomers: [],
    selectedCustomersSearchInput: '',
    filteredSelectedCust: [],
    searchInput: '',
    filteredStoreList: [],
  });

  const location = useLocation();
  console.log(location.state)
  const itemToEdit = location.state ? location.state.itemToEdit : null;
  console.log(itemToEdit)


  useEffect(() => {
    const fetchData = async () => {
      const warehouseApiUrl = 'http://localhost:3001/warehouse';
      const userApiUrl = 'http://localhost:3001/user';
      const storeApiUrl = 'http://localhost:3001/store';

      try {
        const warehouseResponse = await fetch(warehouseApiUrl);
        if (warehouseResponse.ok) {
          const warehouseData = await warehouseResponse.json();
          setState((prevState) => ({
            ...prevState,
            warehouseList: warehouseData,
          }));
        } else {
          console.error('Failed to fetch warehouse data');
        }

        const userResponse = await fetch(userApiUrl);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setState((prevState) => ({
            ...prevState,
            userList: userData,
          }));
        } else {
          console.error('Failed to fetch user data');
        }

        const storeResponse = await fetch(storeApiUrl);
        if (storeResponse.ok) {
          const storeData = await storeResponse.json();
          setState((prevState) => ({
            ...prevState,
            storeList: storeData,
            filteredStoreList: storeData,
          }));

          if (itemToEdit) {
            setState((prevState) => ({
              ...prevState,
              code: itemToEdit.Code,
              name: itemToEdit.Name,
              fromDate: itemToEdit.FromDate,
              toDate: itemToEdit.ToDate,
              isActive: itemToEdit.IsActive,
              warehouseId: itemToEdit.WarehouseId,
              userId: itemToEdit.UserId,
            }));
          }
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [itemToEdit]);

  const onHandleCustId = (e) => {
    setState({ ...state, code: e.target.value });
  };

  const onHandleName = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const onHandleFromDate = (e) => {
    setState({ ...state, fromDate: e.target.value });
  };

  const onHandleToDate = (e) => {
    setState({ ...state, toDate: e.target.value });
  };

  const onHandleWarehouseId = (e) => {
    setState({ ...state, warehouseId: e.target.value });
  };

  const onHandleUserId = (e) => {
    setState({ ...state, userId: e.target.value });
  };

  const onHandleRouteSave = async () => {
    const { code, name, fromDate, toDate, isActive, warehouseId, userId } = state;
    const routeDetails = { code, name, fromDate, toDate, isActive, warehouseId, userId };
    const routeApiUrl = 'http://localhost:3001/routeList';
    console.log(routeDetails);
    const routeOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeDetails),
    };
    const response = await fetch(routeApiUrl, routeOptions);
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  const onHandleMultipleWeek = () => {
    setState((prevState) => ({ ...prevState, isVisitFrequency: !prevState.isVisitFrequency }));
  };

  const onHandleModal = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };

  const handleIsActiveChange = () => {
    setState((prevState) => ({ ...prevState, isActive: !prevState.isActive }));
  }
  

  const handleCheckboxChange = (store) => {
    const { selectedCustomers } = state;
    // Check if the store is already selected
    if (!selectedCustomers.some((customer) => customer.Id === store.Id)) {
      // Add the store to the selectedCustomers list
      setState({ ...state, selectedCustomers: [...selectedCustomers, store] });
    } else {
      // Remove the store from the selectedCustomers list if it's already selected
      const updatedCustomers = selectedCustomers.filter((customer) => customer.Id !== store.Id);
      setState({ ...state, selectedCustomers: updatedCustomers });
    }
  };

  const onHandleSearchStore = (e) => {
    const searchInput = e.target.value;
    setState({ ...state, searchInput });

    const { storeList } = state;
    const filteredStoreList = storeList.filter((eachStore) =>
      eachStore.Name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setState({ ...state, filteredStoreList });
  };

  const onHandleSelectedCustSearch = (e) => {
    const selectedCustomersSearchInput = e.target.value.toLowerCase();
    const { selectedCustomers } = state;
  
    const filteredSelectedCust = selectedCustomers.filter((customer) =>
      customer.Name.toLowerCase().includes(selectedCustomersSearchInput)
    );
  
    setState({ ...state, selectedCustomersSearchInput, filteredSelectedCust });
  };
  
  
  const onClickSearchBtn = () => {
    const { selectedCustomers, selectedCustomersSearchInput } = state;
    const filteredSelectedCust = selectedCustomers.filter((customer) =>
      customer.Name.toLowerCase().includes(selectedCustomersSearchInput.toLowerCase())
    );
  
    setState({ ...state, filteredSelectedCust });
  };
  

  const {
    isModalOpen,
    isVisitFrequency,
    warehouseList,
    userList,
    selectedCustomers,
    filteredStoreList,
    code,
    name,
    fromDate,
    toDate,
    warehouseId,
    userId,
    isActive
  } = state;

  return (
    <div>
      <Header />
      <hr />
      <div className="add-route-bg">
        <h2>Add Route</h2>
        <p>Home &gt; Route &gt; Add Route</p>
        <hr />
        <p>*Any Changes Will Reflect From Next Day</p>
        <input type="checkbox" id="isActive" name="myCheckbox" onChange={handleIsActiveChange} value={isActive} />
        <label htmlFor="isActive">is Active</label>
        <br />
        <h2>Route Details</h2>
        <div className="route-visit">
          <div>
            <div className="route-details-card">
              <div className="route-details">
                <label htmlFor="customerCode">Customer Code*</label>
                <input
                  className="details-input"
                  id="customerCode"
                  type="text"
                  placeholder="Enter your Cust. code"
                  onChange={onHandleCustId}
                  value={code}
                  autoComplete="off"
                />
                <label htmlFor="name">Name*</label>
                <input
                  className="details-input"
                  id="name"
                  type="text"
                  placeholder="Enter your Name"
                  onChange={onHandleName}
                  value={name}
                  autoComplete="off"
                />
              </div>
              <br />
              <div className="route-details">
                <label htmlFor="fromDate">From Date</label>
                <input
                  className="details-input"
                  id="fromDate"
                  type="date"
                  placeholder="Enter From Date"
                  value={fromDate}
                  onChange={onHandleFromDate}
                />
                <label htmlFor="toDate">To Date</label>
                <input
                  className="details-input"
                  id="toDate"
                  type="date"
                  placeholder="Enter To Date"
                  value={toDate}
                  onChange={onHandleToDate}
                />
              </div>
            </div>
            <div>
              <h2>Warehouse</h2>
              <label htmlFor="warehouseName">Warehouse Name</label>
              <select id="warehouseName" onChange={onHandleWarehouseId} value={warehouseId}>
                {warehouseList.map((eachWarehouse) => (
                  <option key={eachWarehouse.Code} value={eachWarehouse.Name}>
                    {eachWarehouse.Name}
                  </option>
                ))}
              </select>

              <select id="usersList" onChange={onHandleUserId} value={userId}>
                {userList.map((eachUser) => (
                  <option key={eachUser.Code} value={eachUser.Name}>
                    driver: {eachUser.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="visit">
            <h2>Visit Frequency</h2>
            <div>
              <input
                type="checkbox"
                id="multipleWeek"
                onChange={onHandleMultipleWeek}
                name="myCheckbox"
              />
              <label htmlFor="multipleWeek">Multiple per Weeks</label>
            </div>
            <br />
            {isVisitFrequency && (
              <div className="weekDays">
                <input type="checkbox" id="Sunday" />
                <label htmlFor="Sunday">Sun</label>
                <input type="checkbox" id="Monday" />
                <label htmlFor="Monday">Mon</label>
                <input type="checkbox" id="Tuesday" />
                <label htmlFor="Tuesday">Tue</label>
                <input type="checkbox" id="Wednesday" />
                <label htmlFor="Wednesday">Wed</label>
                <input type="checkbox" id="Thursday" />
                <label htmlFor="Thursday">Thu</label>
                <input type="checkbox" id="Friday" />
                <label htmlFor="Friday">Fri</label>
                <input type="checkbox" id="Saturday" />
                <label htmlFor="Saturday">Sat</label>
              </div>
            )}
          </div>
        </div>
        <br />
        <div className="warehouse-list-card">
          <div>
            <h2>Warehouse</h2>
            <label htmlFor="warehouseSearch">Search</label>
            <input
              id="warehouseSearch"
              type="search"
              className="details-input"
              onChange={onHandleSelectedCustSearch}
              placeholder="Search Here"
              autoComplete="off"
            />
            <button
              className="search-button"
              type="button"
              onClick={onClickSearchBtn}
            >
              Search
            </button>
          </div>
          <div>
            <button
              type="button"
              className="button"
              onClick={onHandleModal}
            >
              Customer List
            </button>
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <input
                    type="search"
                    className="details-input"
                    onChange={onHandleSearchStore}
                    autoComplete="off"
                  />
                  <button
                    className="cross-btn"
                    type="button"
                    onClick={onHandleModal}
                  >
                    <ImCross />
                  </button>
                  <table>
                    <tr>
                      <th>Sequence</th>
                      <th>Customer Number</th>
                      <th>Customer Name</th>
                      <th>Address</th>
                    </tr>
                    {filteredStoreList.map((store) => (
                      <tr key={store.Code}>
                        <td>
                          <input
                            type="checkbox"
                            id={store.Code}
                            onChange={() => handleCheckboxChange(store)}
                          />
                        </td>
                        <td>{store.Code}</td>
                        <td>{store.Name}</td>
                        <td>{store.Address}</td>
                      </tr>
                    ))}
                  </table>
                  <button
                    className="search-button"
                    type="button"
                    onClick={onHandleModal}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <br />
        <div>
          <table>
            <tr>
              <th>Sequence</th>
              <th>Customer Number</th>
              <th>Customer Name</th>
              <th>Address</th>
            </tr>
            {selectedCustomers.map((customer) => (
              <tr key={customer.Code}>
                <td>
                  <input type="checkbox" id={customer.Code} />
                </td>
                <td>{customer.Code}</td>
                <td>{customer.Name}</td>
                <td>{customer.Address}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="buttons">
          <button className="button" type="button">
            Delete Selected List
          </button>
          <Link to="/mainRoute">
            <button className="button" type="button">
              Back
            </button>
          </Link>
          <button
            className="search-button"
            type="button"
            onClick={onHandleRouteSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoute;
