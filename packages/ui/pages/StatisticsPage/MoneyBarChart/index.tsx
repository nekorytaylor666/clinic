import { Session } from "@lucem/shared-gql";
import { format, parseISO } from "date-fns";
import _ from "lodash";
import React from "react";
import { Line } from "react-chartjs-2";

const BarChart = ({ data }: { data: Session[] }) => {
  console.log("данные в компоненте", data);
  const values = data.map(({ price, startDate }) => ({
    x: format(new Date(parseInt(data[0].startDate)), "dd.MM.yyyy"),
    y: price,
  }));

  const groupedValues = _.groupBy(values, "x");
  const summedValues: { x: string; y: number }[] = [];
  _.forIn(groupedValues, (value, key) => {
    summedValues.push({
      x: key,
      y: _.sumBy(value, "y"),
    });
  });
  return (
    <div className="text-black ">
      <Line
        data={{
          labels: ["Прибыль/Дата"],
          datasets: [
            {
              label: "Прибыль",
              data: summedValues,

              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: true,
              tension: 0,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
