import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/(pages)/Home";
import About from "@/(pages)/About";
import FreeTrial from "./(pages)/Training-Skill/FreeTrial";
import FreeTrialDetail from "./(pages)/Training-Skill/detail/FreeTrial";
import LearningPath from "./(pages)/Training-Skill/LearningPath";
import CourseCatalog from "./(pages)/Training-Skill/CourseCatalog";
import CourseCatalogDetail from "./(pages)/Training-Skill/detail/CourseCatalog";
import Schedule from "./(pages)/Training-Skill/Schedule";
import Product from "./(pages)/Tech-Solution/Product";
import ProductDetail from "./(pages)/Tech-Solution/detail/Product";
import CustomApp from "./(pages)/Tech-Solution/CustomApp";
import CustomAppDetail from "./(pages)/Tech-Solution/detail/CustomApp";
import Certification from "./(pages)/Tech-Solution/Certification";
import CertificationDetail from "./(pages)/Tech-Solution/detail/Certification";
import Article from "./(pages)/Insight/Article";
import ArticleDetail from "./(pages)/Insight/detail/Article";
import CaseStudy from "./(pages)/Insight/CaseStudy";
import CaseStudyDetail from "./(pages)/Insight/detail/CaseStudy";
import TechAdvisory from "./(pages)/Advisory-Support/TechAdvisory";
import TalentPlacement from "./(pages)/Advisory-Support/TalentPlacement";
import ITSupport from "./(pages)/Advisory-Support/ITSupport";
import Contact from "./(pages)/Contact";
import NotFound from "@/(pages)/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "skill-accelerator", element: <FreeTrial /> },
      { path: "skill-accelerator/:id", element: <FreeTrialDetail /> },
      { path: "learning-path", element: <LearningPath /> },
      { path: "course-catalog", element: <CourseCatalog /> },
      { path: "course-catalog/:id", element: <CourseCatalogDetail /> },
      { path: "schedule", element: <Schedule /> },
      { path: "it-product", element: <Product /> },
      { path: "it-product/:id", element: <ProductDetail /> },
      { path: "app-development", element: <CustomApp /> },
      { path: "app-development/:id", element: <CustomAppDetail /> },
      { path: "licensing", element: <Certification /> },
      { path: "licensing/:id", element: <CertificationDetail /> },
      { path: "article", element: <Article /> },
      { path: "article/:id", element: <ArticleDetail /> },
      { path: "case-study", element: <CaseStudy /> },
      { path: "case-study/:id", element: <CaseStudyDetail /> },
      { path: "tech-advisory", element: <TechAdvisory /> },
      { path: "implementation-support", element: <ITSupport /> },
      { path: "talent-placement", element: <TalentPlacement /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
