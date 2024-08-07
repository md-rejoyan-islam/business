import SingleDyeingTable from "@/components/table/SingleDyeingTable";

export default function SingleDyeing({ params }) {
  return (
    <div>
      <h2>Single Dyeing -{params?.id}</h2>
      <SingleDyeingTable />
    </div>
  );
}
