import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
