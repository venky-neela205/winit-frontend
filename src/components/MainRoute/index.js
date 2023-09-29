import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
import './index.css';
import Header from '../Header';

const MainRoute = () => {
  const navigate = useNavigate();
  const [mainRouteList, setMainRouteList] = useState([]);
  const [counts, setCounts] = useState({}); // Use an object to store counts for each mainRoute
  const [data, setData] = useState([])

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

  const fetchMainRouteData = async (code) => {
    const apiUrl = `http://localhost:3001/selectedCustomers/${code}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        // Use the code as a key to store the count in the counts object
        setCounts((prevCounts) => ({
          ...prevCounts,
          [code]: data.count,
        }));

        setData(data.data)
        // Process the data and update your component's state
        // You can handle the data as needed, for example, storing it in state or displaying it directly.
      } else {
        console.error(`Failed to fetch data for code: ${code}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    mainRouteList.forEach((mainRoute) => {
      fetchMainRouteData(mainRoute.Code);
    });
  }, [mainRouteList]);

  console.log(data);

  return (
    <div>
      <Header />
      <hr />
      <div className="add-route-bg">
        {/* Rest of your component */}
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Code</th>
              <th>name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Is Active</th>
              <th>Warehouse</th>
              <th>User</th>
              <th>Total Customers</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mainRouteList.map((mainRoute) => (
              <tr key={mainRoute.Id}>
                <td>{mainRoute.Id}</td>
                <td>{mainRoute.Code}</td>
                <td>{mainRoute.Name}</td>
                <td>{mainRoute.FromDate}</td>
                <td>{mainRoute.ToDate}</td>
                <td>{mainRoute.IsActive}</td>
                <td>{mainRoute.WarehouseId}</td>
                <td>{mainRoute.UserId}</td>
                <td>{counts[mainRoute.Code] || 0}</td> {/* Display the count for each mainRoute */}
                <td>
                  <button
                    onClick={() => {
                      navigate('/', { replace: true, state: { mainRoute } });
                    }}
                    className="edit-btn"
                    type="button"
                  >
                    <FiEdit3 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">
          <button className="search-button">Add Route</button>
        </Link>
      </div>
    </div>
  );
};

export default MainRoute;
