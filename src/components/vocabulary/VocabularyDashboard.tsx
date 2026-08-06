import ContinueCard from "../../components/vocabulary/ContinueCard";
import DailyWordCard from "../../components/vocabulary/DailyWordCard";
import ProgressCard from "../../components/vocabulary/ProgressCard";
import LessonCard from "../../components/vocabulary/LessonCard";
import CategoryGrid from "../../components/vocabulary/CategoryGrid";

export default function VocabularyDashboard() {
  return (
    <div className="space-y-8">

      <ContinueCard />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="space-y-8 xl:col-span-2">
          <DailyWordCard />
          <CategoryGrid />
        </div>

        <div className="space-y-8">
          <ProgressCard />
          <LessonCard />
        </div>

      </div>

    </div>
  );
}