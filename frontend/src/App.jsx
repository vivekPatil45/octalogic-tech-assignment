
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import BookingsPage from './pages/BookingsPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-bookings" element={<BookingsPage />} />
            <Route path="/create-booking" element={<BookingForm />} />
          </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
