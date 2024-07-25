import FavouriteAllTimeStats from "./FavouriteAllTimeStats";
import MyPicks from "./MyPicks";
import RecentForm from "./RecentForm";
import TotalStats from "./TotalStats";

function Diary() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div>
        <TotalStats />
        <RecentForm />
        <FavouriteAllTimeStats />
      </div>
      <MyPicks />
    </div>
  );
}

export default Diary;
