import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loading from "./components/Loading";

const App = () => {
  const Home = lazy(() => import("./pages/Home"));
  const Quiz = lazy(() => import("./pages/Quiz"));
  const Result = lazy(() => import("./pages/Result"));
  const Learning = lazy(() => import("./pages/Learning"));

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
