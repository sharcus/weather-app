import { useParams, Link } from "react-router"
import { useState, useEffect } from "react";
import { getMonthName, getShortMonthName } from "../BusinessLogic/dateHelper";
import parseMonthData from "../BusinessLogic/MonthTemperatureParse";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Month() {
    const params = useParams();
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8009/WeatherMonthly?year=${params.year}&month=${params.month}`;
        const response = await fetch(url);
        const json = await response.json();
        const monthLabel = getShortMonthName(params.month);
        var monthlyData = parseMonthData(json, monthLabel);
        setData(monthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading... </p>;

  const monthName = getMonthName(Number(params.month))
    
    return (
        <>
            <h3>Monthly tempertaure for {monthName} {params.year}</h3>
            <Link to="/">Move Back</Link>
                    <div className="month-view-panel">
            <br />
            <div>
              <LineChart width={3600} height={500} data={data}>
                <Line type="monotone" dataKey="tmp" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
        </div>

        </>
    );
}