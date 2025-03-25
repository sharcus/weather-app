import { useParams, Link } from "react-router"
import { useState, useEffect } from "react";
import { getMonthName } from "../BusinessLogic/dateHelper";

export default function Month() {
    const params = useParams();
    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8009/WeatherMonthly?year=${params.year}&month=${params.month}`;
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
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
                {data.map(function(item, itemIndex){
                    return (<p key={itemIndex}>
                        <span className="date-label">{item.date}</span>
                        <span className="hour-label">{item.hour}</span>
                        <span className="temperature-label">{item.temperature}</span></p>);
                })}
            </div>
        </div>

        </>
    );
}