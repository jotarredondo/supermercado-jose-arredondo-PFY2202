import { Route, Routes } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="quienes-somos" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="productos/nuevo" element={<AddProductPage />} />
        <Route path="inventario" element={<InventoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
