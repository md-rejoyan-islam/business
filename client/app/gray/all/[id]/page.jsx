import SingleGrayTable from "../../../../components/table/SingleGrayTable";

export default function SingleGray({ params }) {
  return (
    <div>
      <h2>Single Gray -{params?.id}</h2>
      <SingleGrayTable />
    </div>
  );
}
