import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/(pages)/Home";
import About from "@/(pages)/About";
import FreeTrial from "./(pages)/Training-Skill/FreeTrial";
import FreeTrialDetail from "./(pages)/Training-Skill/detail/FreeTrial";
import LearningPath from "./(pages)/Training-Skill/LearningPath";
import CourseCatalog from "./(pages)/Training-Skill/CourseCatalog";
import CourseCatalogDetail from "./(pages)/Training-Skill/detail/CourseCatalog";
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
      {
        path: "free-trial",
        element: <FreeTrial />,
        children: [{ path: "detail", element: <FreeTrialDetail /> }],
      },
      { path: "learning-path", element: <LearningPath /> },
      {
        path: "strategic-solution",
        element: <CourseCatalog />,
        children: [{ path: "detail", element: <CourseCatalogDetail /> }],
      },
      {
        path: "product",
        element: <Product />,
        children: [{ path: "detail", element: <ProductDetail /> }],
      },
      {
        path: "app-development",
        element: <CustomApp />,
        children: [{ path: "detail", element: <CustomAppDetail /> }],
      },
      {
        path: "certification",
        element: <Certification />,
        children: [{ path: "detail", element: <CertificationDetail /> }],
      },
      {
        path: "article",
        element: <Article />,
        children: [{ path: "detail", element: <ArticleDetail /> }],
      },
      {
        path: "case-study",
        element: <CaseStudy />,
        children: [{ path: "detail", element: <CaseStudyDetail /> }],
      },
      { path: "tech-advisory", element: <TechAdvisory /> },
      { path: "implementation-support", element: <ITSupport /> },
      { path: "talent-placement", element: <TalentPlacement /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
