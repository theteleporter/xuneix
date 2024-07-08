"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/dormant/header";
import { Footer } from "@/components/dormant/footer";
import { Details } from "@/components/dormant/details";
import ButtonComponent from "@/components/sub-components/loading-components";
import { useRouter } from "next/navigation";
import { kv } from "@vercel/kv";
import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { ROTATED_URLS_KEY } from "@/app/constants";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
  
export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [adminUrl, setAdminUrl] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [manualUrl, setManualUrl] = useState("");
  const [manualToken, setManualToken] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [rotatedUrls, setRotatedUrls] = useState<string[]>([]);

  const handleCopy = async (text: string, setter: (value: boolean) => void) => {
    try {
      await copyToClipboard(text);
      setter(true);
      setTimeout(() => setter(false), 1500);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the text to the clipboard.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [storedAdminUrl, storedAdminToken, storedRotatedUrls] =
          await Promise.all([
            kv.get<string | null>("adminUrl"),
            kv.get<string | null>("token"),
            kv.get<string[] | null>(ROTATED_URLS_KEY),
          ]);

        console.log("Fetched Data:", {
          storedAdminUrl,
          storedAdminToken,
          storedRotatedUrls,
        });

        if (storedAdminUrl && storedAdminToken) {
          setAdminUrl(storedAdminUrl);
          setAdminToken(storedAdminToken);
        } else {
          toast({
            variant: "destructive",
            title: "No URL or Token Found",
            description: "Please generate a new URL and token.",
          });
        }

        if (storedRotatedUrls && storedRotatedUrls.length > 0) {
          // Get the latest URL (the last one in the array)
          setAdminUrl(storedRotatedUrls[storedRotatedUrls.length - 1]);
          setRotatedUrls(storedRotatedUrls); // Update rotatedUrls state
        }
      } catch (error) {
        console.error("Error fetching data from KV:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was an error fetching data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch only once when the component mounts
  }, [toast]);

  const rotateLink = async () => {
    try {
      const response = await axios.get("/api/admin/generate-url");
      setAdminUrl(response.data.randomUrl);
      setAdminToken(response.data.token);
      toast({ title: "Url Rotated successfully" });
    } catch (error) {
      console.error("Error rotating URL:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem rotating the URL.",
      });
    }
  };

  const goToAdminPage = () => {
    const url = manualUrl || adminUrl || "";
    const token = manualToken || adminToken || "";
    if (url && token) {
      router.push(`${url}?token=${token}`);
    } else {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter or generate a URL and token.",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col h-auto items-center justify-center pt-9 pb-20 container gap-5 w-full">
        <div className="flex w-full justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2 text-start">
            Next.js Link Rotator
          </h1>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/theteleporter/xuneix" target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="mr-2 h-4 w-4" /> 
              GitHub
            </Link>
          </Button>
        </div>
        <p className="text-start w-full">
          Protect your admin panel with dynamic, time-sensitive URLs.
        </p>
        <Details />
        <div className="grid gap-2">
          <label htmlFor="manualUrl">Enter Admin URL:</label>
          <Input
            type="text"
            id="manualUrl"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="w-[352px] max-w-md"
          />
          <label htmlFor="manualToken">Enter Token:</label>
          <Input
            type="text"
            id="manualToken"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            className="w-[352px] max-w-md"
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={goToAdminPage}
          className="mt-8 w-[352px] max-w-md"
        >
          {isLoading ? <ButtonComponent /> : "Go to Admin Page"}
        </Button>

        <div className="grid gap-2 max-w-md">
          <div className="flex items-center gap-1">
            <label htmlFor="generatedAdminUrl">Generated Admin URL:</label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(adminUrl || "", setCopiedUrl)}
            >
              {copiedUrl ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Input
            id="generatedAdminUrl"
            className="w-[352px]"
            type="text"
            value={adminUrl || ""} // Display adminUrl if available, otherwise empty string
            readOnly
          />
          <div className="flex items-center gap-1">
            <label htmlFor="generatedAdminToken">Generated Token:</label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(adminToken || "", setCopiedToken)}
            >
              {copiedToken ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Input
            id="generatedAdminToken"
            className="w-[352px]"
            type="text"
            value={adminToken || ""} // Display adminToken if available, otherwise empty string
            readOnly
          />
        </div>
        <Button onClick={rotateLink} className="w-[352px] max-w-md">
          Rotate Link
        </Button>

        <Footer />
      </main>
    </>
  );
}
