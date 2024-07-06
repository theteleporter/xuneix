'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/dormant/header";
import ButtonComponent from "@/components/sub-components/loading-components";
import { useRouter } from 'next/navigation';
import { kv } from "@vercel/kv";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [adminUrl, setAdminUrl] = useState<string>("");
  const [adminToken, setAdminToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [manualUrl, setManualUrl] = useState("");
  const [manualToken, setManualToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [storedAdminUrl, storedAdminToken] = await Promise.all([
          kv.get<string | null>("adminUrl"),  // Allow null values
          kv.get<string | null>("token"),     // Allow null values
        ]);
  
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
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem fetching the URL and token from KV.",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
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
    const url = manualUrl || adminUrl;
    const token = manualToken || adminToken;
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
      <main className="flex flex-col h-auto items-center justify-center pt-32 container gap-5">
        <div className="grid gap-2">
          <label htmlFor="manualUrl">Enter Admin URL:</label>
          <Input
            type="text"
            id="manualUrl"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="w-[400px] max-w-md"
          />
          <label htmlFor="manualToken">Enter Token:</label>
          <Input
            type="text"
            id="manualToken"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            className="w-[400px] max-w-md"
          />
        </div>
        <Button
          disabled={isLoading}
          onClick={goToAdminPage}
          className="mt-8 w-[400px] max-w-md"
        >
          {isLoading ? <ButtonComponent /> : "Go to Admin Page"}
        </Button>

        <div className="grid gap-2">
          <label>Generated Admin URL:</label>
          <Input className="w-[400px] max-w-md" type="text" value={adminUrl || ""} readOnly />
          <label>Generated Token:</label>
          <Input className="w-[400px] max-w-md" type="text" value={adminToken || ""} readOnly />
        </div>
        <Button onClick={rotateLink} className="w-[400px] max-w-md">
          Rotate Link
        </Button>
      </main>
    </>
  );
}
