import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import VocabularyPage from "./pages/VocabularyPage";
import VocabularyLessonsPage from "./pages/VocabularyLessonsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import QuizResultPage from "./pages/QuizResultPage";
import CategoryWordsPage from "./pages/CategoryWordsPage";
import WordPage from "./pages/WordPage";
import CategoryQuizPage from "./pages/CategoryQuizPage";
import VocabularyQuizResultPage from "./pages/VocabularyQuizResultPage";
import DictionaryPage from "./pages/DictionaryPage";
import StudyOnlinePage from "./pages/StudyOnlinePage";
import CourseTopicsPage from "./pages/CourseTopicsPage";
import TopicPage from "./pages/TopicPage";
import CBTSetupPage from "./pages/CBTSetupPage";
import CBTQuizPage from "./pages/CBTQuizPage";
import CBTResultPage from "./pages/CBTResultPage";
import AmazingFactsPage from "./pages/AmazingFactsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import StoryBooksPage from "./pages/StoryBooksPage";
import StoryCategoryPage from "./pages/StoryCategoryPage";
import StoryReaderPage from "./pages/StoryReaderPage";
import ClubIdeasPage from "./pages/ClubIdeasPage";
import ClubCategoryPage from "./pages/ClubCategoryPage";
import ClubIdeaDetailPage from "./pages/ClubIdeaDetailPage";
import MusicStudioPage from "./pages/MusicStudioPage";
import PaymentPage from "./pages/PaymentPage";
import AdminGuard from "./components/admin/AdminGuard";
import AdminPage from "./pages/AdminPage";
import PaidGuard from "./components/payment/PaidGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard (must be logged in) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* ── FREE (no PaidGuard) ── */}
          <Route index element={<Dashboard />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />

          {/* ── Admin (role gate only) ── */}
          <Route
            path="admin"
            element={
              <AdminGuard>
                <AdminPage />
              </AdminGuard>
            }
          />

          {/* ── PAID: Vocabulary ── */}
          <Route
            path="vocabulary"
            element={
              <PaidGuard>
                <VocabularyPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/word/:wordId"
            element={
              <PaidGuard>
                <WordPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/category/:categoryId"
            element={
              <PaidGuard>
                <CategoryWordsPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/lesson/:lessonId"
            element={
              <PaidGuard>
                <LessonPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/:categoryId"
            element={
              <PaidGuard>
                <VocabularyLessonsPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/quiz/:categoryId"
            element={
              <PaidGuard>
                <CategoryQuizPage />
              </PaidGuard>
            }
          />
          <Route
            path="vocabulary/quiz-result"
            element={
              <PaidGuard>
                <VocabularyQuizResultPage />
              </PaidGuard>
            }
          />

          {/* ── PAID: Study Courses ── */}
          <Route
            path="study-online"
            element={
              <PaidGuard>
                <StudyOnlinePage />
              </PaidGuard>
            }
          />
          <Route
            path="study-online/:courseId"
            element={
              <PaidGuard>
                <CourseTopicsPage />
              </PaidGuard>
            }
          />
          <Route
            path="study-online/:courseId/:topicId"
            element={
              <PaidGuard>
                <TopicPage />
              </PaidGuard>
            }
          />

          {/* ── PAID: CBT ── */}
          <Route
            path="cbt"
            element={
              <PaidGuard>
                <CBTSetupPage />
              </PaidGuard>
            }
          />
          <Route
            path="cbt/quiz"
            element={
              <PaidGuard>
                <CBTQuizPage />
              </PaidGuard>
            }
          />
          <Route
            path="cbt/result"
            element={
              <PaidGuard>
                <CBTResultPage />
              </PaidGuard>
            }
          />

          {/* ── PAID: other features ── */}
          <Route
            path="amazing-facts"
            element={
              <PaidGuard>
                <AmazingFactsPage />
              </PaidGuard>
            }
          />
          <Route
            path="stories"
            element={
              <PaidGuard>
                <StoryBooksPage />
              </PaidGuard>
            }
          />
          <Route
            path="stories/:categoryId"
            element={
              <PaidGuard>
                <StoryCategoryPage />
              </PaidGuard>
            }
          />
          <Route
            path="stories/read/:storyId"
            element={
              <PaidGuard>
                <StoryReaderPage />
              </PaidGuard>
            }
          />
          <Route
            path="clubs"
            element={
              <PaidGuard>
                <ClubIdeasPage />
              </PaidGuard>
            }
          />
          <Route
            path="clubs/:categoryId"
            element={
              <PaidGuard>
                <ClubCategoryPage />
              </PaidGuard>
            }
          />
          <Route
            path="clubs/idea/:ideaId"
            element={
              <PaidGuard>
                <ClubIdeaDetailPage />
              </PaidGuard>
            }
          />
          <Route
            path="clubs/music/studio"
            element={
              <PaidGuard>
                <MusicStudioPage />
              </PaidGuard>
            }
          />

          {/* ── PAID: Quiz ── */}
          <Route
            path="quiz/:lessonId"
            element={
              <PaidGuard>
                <QuizPage />
              </PaidGuard>
            }
          />
          <Route
            path="quiz-result"
            element={
              <PaidGuard>
                <QuizResultPage />
              </PaidGuard>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}