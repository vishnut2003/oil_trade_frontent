import OverviewTotals from "@/components/OverviewTotals/OverviewTotals"

const Reports = () => {
  return (
    <div>
      <h2 className="text-lg font-bold">Reports</h2>
      <p className="text-sm">Here is an overview of Sales and Purchase this month.</p>
      <div className="py-4 flex justify-start max-w-full">
        <OverviewTotals/>
      </div>
    </div>
  )
}

export default Reports