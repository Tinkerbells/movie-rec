import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toast, ToastProvider } from "./ui/toast";
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
