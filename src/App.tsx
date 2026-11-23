import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SwitcherHub } from './switcher/SwitcherHub';
import { V1Layout } from './variants/v1/V1Layout';
import { HomePage as V1HomePage } from './variants/v1/pages/HomePage';
import { AboutPage as V1AboutPage } from './variants/v1/pages/AboutPage';
import { AviationPage as V1AviationPage } from './variants/v1/pages/AviationPage';
import { ServicesPage as V1ServicesPage } from './variants/v1/pages/ServicesPage';
import { V2Layout } from './variants/v2/V2Layout';
import { HomePage as V2HomePage } from './variants/v2/pages/HomePage';
import { AboutPage as V2AboutPage } from './variants/v2/pages/AboutPage';
import { ServicesPage as V2ServicesPage } from './variants/v2/pages/ServicesPage';
import { AviationPage as V2AviationPage } from './variants/v2/pages/AviationPage';
import { BlogPage as V2BlogPage } from './variants/v2/pages/BlogPage';
import { BlogPostPage as V2BlogPostPage } from './variants/v2/pages/BlogPostPage';
import { ContactPage as V2ContactPage } from './variants/v2/pages/ContactPage';
import { V3Layout } from './variants/v3/V3Layout';
import { HomePage as V3HomePage } from './variants/v3/pages/HomePage';
import { AboutPage as V3AboutPage } from './variants/v3/pages/AboutPage';
import { ServicesPage as V3ServicesPage } from './variants/v3/pages/ServicesPage';
import { AviationPage as V3AviationPage } from './variants/v3/pages/AviationPage';
import { BlogPage as V3BlogPage } from './variants/v3/pages/BlogPage';
import { BlogPostPage as V3BlogPostPage } from './variants/v3/pages/BlogPostPage';
import { ContactPage as V3ContactPage } from './variants/v3/pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<SwitcherHub />} />

        <Route path="/v1" element={<V1Layout />}>
          <Route index element={<V1HomePage />} />
          <Route path="about" element={<V1AboutPage />} />
          <Route path="aviation-professionals" element={<V1AviationPage />} />
          <Route path="services" element={<V1ServicesPage />} />
          <Route path="*" element={<V1HomePage />} />
        </Route>

        <Route path="/v2" element={<V2Layout />}>
          <Route index element={<V2HomePage />} />
          <Route path="about" element={<V2AboutPage />} />
          <Route path="services" element={<V2ServicesPage />} />
          <Route path="aviation-professionals" element={<V2AviationPage />} />
          <Route path="blog" element={<V2BlogPage />} />
          <Route path="blog/:slug" element={<V2BlogPostPage />} />
          <Route path="contact" element={<V2ContactPage />} />
          <Route path="*" element={<V2HomePage />} />
        </Route>

        <Route path="/v3" element={<V3Layout />}>
          <Route index element={<V3HomePage />} />
          <Route path="about" element={<V3AboutPage />} />
          <Route path="services" element={<V3ServicesPage />} />
          <Route path="aviation-professionals" element={<V3AviationPage />} />
          <Route path="blog" element={<V3BlogPage />} />
          <Route path="blog/:slug" element={<V3BlogPostPage />} />
          <Route path="contact" element={<V3ContactPage />} />
          <Route path="*" element={<V3HomePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
