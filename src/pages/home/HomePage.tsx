import PieChart from "./_components/PieChart"

const HomePage = () => {
  return (
    <div>
      <PieChart data={[
        { label: "Segment A", value: 30, color: "#a0c4ff" },
        { label: "Segment B", value: 35, color: "#ffd6a5" },
        { label: "Segment C", value: 35, color: "#caffbf" },
      ]} />
    </div>
  )
}
export default HomePage