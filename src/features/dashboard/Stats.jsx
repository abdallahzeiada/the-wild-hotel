/* eslint-disable react/prop-types */
import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinCount * numDays);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="Bookings"
        value={numBookings}
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        color="indigo"
        title="check-ins"
        value={checkins}
      />
      <Stat
        icon={<HiOutlineBriefcase />}
        color="yellow"
        title="occupancy rate"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
