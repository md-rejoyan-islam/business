export default function RateAskInfo() {
  return (
    <>
      <div>
        <h3 className="text-xl font-semibold text-center pt-2 pb-2">Rate</h3>

        <div className="space-y-2 pt-3 border p-4 rounded-md text-sm">
          <p className="flex gap-6 justify-between bg-slate-50 py-2 px-3 rounded-md text-slate-600">
            <span className="font-medium">Due Ask Rate </span>
            <span>120</span>
          </p>
          <p className="flex gap-6 justify-between bg-slate-50 py-2 px-3 rounded-md text-slate-600">
            <span>Due Sell Rate </span>
            <span>140</span>
          </p>
          <p className="flex gap-6 justify-between bg-slate-50 py-2 px-3 rounded-md text-slate-600">
            <span>Cash Ask Rate </span>
            <span>150</span>
          </p>
          <p className="flex gap-6 justify-between bg-slate-50 py-2 px-3 rounded-md text-slate-600">
            <span>Cash Sell Rate </span>
            <span>126</span>
          </p>
        </div>
      </div>
    </>
  );
}
