import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: `${theme === "dark" ? "#1d283a" : "#f1f5f9"}`,
            color: `${theme === "dark" ? "white" : "#32384a"}`,
          },
        }}
      />
    </>
  );
};
