import React from "react";
import { Pie } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function Visuals(props) {
    console.log(props.results)

  const PieChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#c0c0c0",
        "#4281a4",
        "#a0ced9",
        "#f5cb5c",
        "#cc8b86",
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
        text: 'Recurrence Type',
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

    props.results.forEach((ele) => {
      const key = ele[type];
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
        <div className="card mb-2">
          <PieChart type="recurrence_type" />
        </div>
  );
}

export default Visuals;
