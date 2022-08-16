// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// Types
import type { ReactElement } from "react";
import type { NextPage } from "next";


interface AppLayoutProps {
  children: ReactElement
}

const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  return (
    <div className="bg-primary">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
