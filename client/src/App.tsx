import { BrowserRouter, Route, Routes } from 'react-router';
import { Top } from './pages/top/Top';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}
