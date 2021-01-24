import React from "react";
import { Pie } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function Visuals(props) {
    console.log(props.results)

  const PieChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#f5cac3",
        "#ffcb77",
        "#c5baaf",
        "#cc8b86",
        "#84a59d",
        "#f7ede2",
        "#d8e2dc",
        "#f4acb7",
        "#9d8189",
        "#a0ced9",
        "#f5cb5c",
        "#cc8b86",
        "#b392ac",
        "#abc4ff",
        "#e2cfc4",
        "#4281a4",
        "#c0c0c0",
        "#896a67",
        "#8d99ae"
      ];

    let options = {
      legend: {
        display: true,
        reverse: true
      },
      plugins: {
        labels: {
          render: 'value',
          precision: 0,
          showZero: true,
          fontSize: 13,
          fontColor: '#fff',
          arc: false,
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Volunteer Opportunities',
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
      }]
      }
    };

    props.results.forEach((restaurant) => {
      const key = restaurant[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Pie
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]), 
                backgroundColor: colorArray
              },
            ],
          }}
          options={options} 
        />
      );

  };



  return (
        <div className="card">
          <PieChart type="opportunity_id" />
        </div>
  );
}

export default Visuals;
