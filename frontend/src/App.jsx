import {Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IngestCV from "./pages/IngestCV";
import ApiKey from "./pages/ApiKey";
import StructureJob from "./pages/StructureJob";
import MatchCV from "./pages/MatchCV";
import Intro from "./pages/Intro";
//import Intro from "./pages/MatchCV";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Intro/>}/>
          <Route path="/Home" element={<Intro/>}/>
          <Route path="/ingest-cv" element={<IngestCV />} />
          <Route path="/api-key" element={<ApiKey />} />
          <Route path="/structure-job" element={<StructureJob />} />
          <Route path="/match-cv" element={<MatchCV />} />
        </Route>
      </Routes>
  );
}

export default App;