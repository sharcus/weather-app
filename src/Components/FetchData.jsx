import React, { useState, useEffect } from "react";
import parseSeasons from "../BusinessLogic/SeasonParser";
import { useNavigate } from "react-router";
const FetchData = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8009/WeatherStatistics");
        const json = await response.json();
        const result = parseSeasons(json);
        setData(result.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handlePanelClick(year, month) {
    

    navigate(`/m/${month}/y/${year}`);

  }

  if (!data) return <p>Loading... </p>;

  return (
    <div className="allSeasonPanel">
      {
      data.map(function(season, seasonIndex){
        const months = season.months.map(function(month, monthIndex){
          return (<p onClick={() => { handlePanelClick(month.year, month.monthNum)}} className="season-body" key={1000 * seasonIndex + monthIndex}>
                    <span className="month">{month.month}</span>

                    <span>Min:</span>
                    <span className="min">{month.min}</span>

                    <span>Max:</span>
                    <span className="max">{month.max}</span>

                    <span>Avg:</span>
                    <span className="average">{month.average}</span>
                </p>)
        });

        return (<div className="season-panel" key={seasonIndex}>
        <h3 className="season-title" >{season.name}</h3>
        {months}
        </div>)
      })
      }
    </div>
  );
};

export default FetchData
