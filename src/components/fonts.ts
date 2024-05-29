import { Manrope, Roboto } from "next/font/google";
import localFont from "next/font/local";
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
const dm_sans = localFont({
  src: [
    {
      path: "../app/DMSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../app/DMSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "../app/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/DMSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "../app/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../app/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});
export { dm_sans, manrope, roboto };
