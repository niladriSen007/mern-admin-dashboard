
const data = [
  { label: "Segment A", value: 30, color: "#a0c4ff" },
  { label: "Segment B", value: 35, color: "#ffd6a5" },
  { label: "Segment C", value: 35, color: "#caffbf" },
];

const calculatePath = (value : number, startAngle : number) => {
  const radius = 100; // radius of the circle
  const angle = (value / 100) * 360; // percentage to degrees
  const largeArcFlag = angle > 180 ? 1 : 0;

  const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);

  const endAngle = startAngle + angle;
  const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);

  return `M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
};

const PieChart = () => {
  let startAngle = 0;

  return (
    <svg width="300" height="300" viewBox="0 0 200 200">
      {data.map((slice, index) => {
        const path = calculatePath(slice.value, startAngle);
        startAngle += (slice.value / 100) * 360;

        return (
          <path
            key={index}
            d={path}
            fill={slice.color}
            stroke="#ffffff"
            strokeWidth="3"
          />
        );
      })}
    </svg>
  );
};

export default PieChart;
