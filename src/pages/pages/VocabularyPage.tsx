import WelcomeCard from "../components/vocabulary/WelcomeCard";
import DailyWordCard from "../components/vocabulary/DailyWordCard";
import ProgressCard from "../components/vocabulary/ProgressCard";
import CategoryGrid from "../components/vocabulary/CategoryGrid";
import ExamCategories from "../components/vocabulary/ExamCategories";
import GeneralWords from "../components/vocabulary/GeneralWords";
import GeneralVocabularyHero from "../components/vocabulary/GeneralVocabularyHero";

export default function VocabularyPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 pb-12">
      <WelcomeCard />

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="min-w-0 space-y-10 lg:col-span-8">
          <DailyWordCard />
          <GeneralVocabularyHero />
          <ExamCategories />
          <CategoryGrid />
          <GeneralWords />
        </div>

        <aside className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <ProgressCard />
          </div>
        </aside>
      </div>
    </div>
  );
}