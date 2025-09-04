
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route >
            <Route path="/" element={<Home />} />
            <Route path="/all-bookings" element={<BookingsPage />} />
            <Route path="/create-booking" element={<BookingForm />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
