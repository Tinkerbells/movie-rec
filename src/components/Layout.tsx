import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toast, ToastProvider } from "./ui/toast";
import { Toaster } from "@/components/ui/toaster";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="relative flex h-screen items-center justify-center overflow-x-hidden">
        {children}
      </main>
      <Toaster />
    </>
  );
};
