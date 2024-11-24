

const calculatePath = (value: number, startAngle: number) => {
  const radius = 100;
  const angle = (value / 100) * 360;
  const largeArcFlag = angle > 180 ? 1 : 0;

  const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);

  const endAngle = startAngle + angle;
  const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

  return `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
};

export interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  containerWidth?: number;
  containerHeight?: number;
  viewPortWidth?: number;
  viewPortHeight?: number;
}

const PieChart = ({ data,
  containerWidth = 300,
  containerHeight = 300,
  viewPortWidth = 200,
  viewPortHeight = 200
}: PieChartProps) => {
  let startAngle = 0;

  return (
    <svg width={containerWidth} height={containerHeight} viewBox={`0 0 ${viewPortWidth} ${viewPortHeight}`}>
      {data.map((slice, index) => {
        const path = calculatePath(slice.value, startAngle);
        startAngle += (slice.value / 100) * 360;

        return (
          <path
            key={index}
            d={path}
            fill={slice.color}
            stroke="#ffffff"
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
