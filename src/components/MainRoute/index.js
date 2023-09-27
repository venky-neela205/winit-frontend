import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
import './index.css';
import Header from '../Header';

const MainRoute = () => {
  const [mainRouteList, setMainRouteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mainRouteListApiUrl = 'http://localhost:3001/mainRouteList';
      const options = {
        method: 'GET',
      };

      try {
        const mainRouteListResponse = await fetch(mainRouteListApiUrl, options);
        if (mainRouteListResponse.ok) {
          const mainRouteListData = await mainRouteListResponse.json();
          console.log(mainRouteListData);
          setMainRouteList(mainRouteListData);
        } else {
          console.error('Failed to fetch customer data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <hr />
      <div className="add-route-bg">
        <h4>Search Criteria :</h4>
        <p>
          Code: <span>All</span>, Name: <span>All</span>, Start Date: <span>01 Sep 2023</span>, End Date: <span>08 Sep 2023</span>, Status: <span>Active</span>
        </p>
        <br />
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
            {mainRouteList.map((mainRoute) => (
              <tr key={mainRoute.Code}>
                <td>{mainRoute.Id}</td>
                <td>{mainRoute.Code}</td>
                <td>{mainRoute.Name}</td>
                <td>{mainRoute.FromDate}</td>
                <td>{mainRoute.ToDate}</td>
                <td>{mainRoute.IsActive}</td>
                <td>{mainRoute.WarehouseId}</td>
                <td>{mainRoute.UserId}</td>
                <td>4</td>
                <td>
                  <Link
                    to={{
                      pathname: '/',
                      state: { itemToEdit: mainRoute },
                    }}
                  >
                    <button className="edit-btn" type="button">
                      <FiEdit3 />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
          <Link to="/">
            <button className="search-button">Add Route</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainRoute;
