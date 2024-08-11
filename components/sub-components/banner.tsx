import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const Banner = () => {
  return (
    <>
      <div className="mx-5 md:mx-16 lg:mx-20 transition-all ease-out duration-700">
        <Alert
          className={
            "bg-red-600 transition-all ease-out duration-700 shadow-sm border-none"
          }
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-bold">Disclaimer!</AlertTitle>
          <AlertDescription>
            The page may not re-route to this app&#39;s admin page due to
            exceeded Vercel-Kv requests. You can{" "}
            <Link
              href={"https://www.github.com/"}
              className={
                "border-b border-spacing-4 border-white/80 hover:border-none transition-all ease-out duration-500"
              }
            >
              folk the app
            </Link>{" "}
            and link it to another Vercel-Kv instance or a database to test it.{" "}
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};
