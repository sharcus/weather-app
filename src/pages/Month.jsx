import { useParams, Link } from "react-router"
import { useState, useEffect } from "react";
import { getMonthName, getShortMonthName } from "../BusinessLogic/dateHelper";
import parseMonthData from "../BusinessLogic/MonthTemperatureParse";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { getPreviousLink, getNextLink } from "../BusinessLogic/navigationGenerator";

export default function Month() {
    const params = useParams();
    const [data, setData] = useState(null);
    const monthLabel = getShortMonthName(params.month);

    const y = Number(params.year);
    const m = Number(params.month);

    console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8009/WeatherMonthly?year=${params.year}&month=${params.month}`;
        const response = await fetch(url);
        const json = await response.json();
        
        var monthlyData = parseMonthData(json);
        setData(monthlyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [y, m]);

  if (!data) return <p>Loading... </p>;

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = `${Math.round(label / 8) + 1} ${monthLabel}`;
    const hour = `${Math.round(label % 8) * 3}:00`;
    const level = payload[0].value > 0 ? "high" : "low";
    const classLevel = `temperature-${level}`;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${date} at ${hour}`}</p>
        <p>
          <span>Temperature is </span>
          <span className={classLevel}>{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

  const monthName = getMonthName(Number(params.month));
  const prev = getPreviousLink(y, m);
  const next = getNextLink(y, m);
    
    return (
        <>
          <h3>Monthly temperature for {monthName} {params.year}</h3>
          <div className="nav-panel">
              {prev && <Link to={prev}>&lt;&lt; Prev Month</Link> }
              <Link className="home" to="/">Move Back</Link>
              {next && <Link to={next}>Next Month &gt;&gt;</Link> }
          </div>
          
          <div className="month-view-panel">
            <br />
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data}>
                  <Line type="monotone" dataKey="tmp" stroke="#8884d8" />
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid />
                  <XAxis interval={7} tickFormatter={(tick) => tick > 0 ? tick / 8 + 1 : 1}  /> 
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
              
            </div>
        </div>

        </>
    );
}