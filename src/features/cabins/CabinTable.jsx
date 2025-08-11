import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>name</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
