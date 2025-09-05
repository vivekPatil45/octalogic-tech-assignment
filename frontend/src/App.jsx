
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookingForm from './pages/BookingForm';
import BookingsPage from './pages/BookingsPage';
import Layout from './components/Layout';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-bookings" element={<BookingsPage />} />
                <Route path="/create-booking" element={<BookingForm />} />
              </Routes>
          </Layout>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
