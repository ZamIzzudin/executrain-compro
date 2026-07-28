import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/(pages)/Home";
import About from "@/(pages)/About";
import FreeTrial from "./(pages)/Training-Skill/FreeTrial";
import LearningPath from "./(pages)/Training-Skill/LearningPath";
import CourseCatalog from "./(pages)/Training-Skill/CourseCatalog";
import Product from "./(pages)/Tech-Solution/Product";
import CustomApp from "./(pages)/Tech-Solution/CustomApp";
import Certification from "./(pages)/Tech-Solution/Certification";
import Article from "./(pages)/Insight/Article";
import CaseStudy from "./(pages)/Insight/CaseStudy";
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
      { path: "free-trial", element: <FreeTrial /> },
      { path: "learning-path", element: <LearningPath /> },
      { path: "strategic-solution", element: <CourseCatalog /> },
      { path: "product", element: <Product /> },
      { path: "app-development", element: <CustomApp /> },
      { path: "certification", element: <Certification /> },
      { path: "article", element: <Article /> },
      { path: "case-study", element: <CaseStudy /> },
      { path: "tech-advisory", element: <TechAdvisory /> },
      { path: "implementation-support", element: <ITSupport /> },
      { path: "talent-placement", element: <TalentPlacement /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
