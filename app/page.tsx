'use client'

import { useState, useEffect } from 'react';
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/dormant/header";
import ButtonComponent from '@/components/sub-components/loading-components';

export default function Home() {
  const [adminUrl, setAdminUrl] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/generate-url");
        setAdminUrl(response.data.randomUrl);
        setAdminToken(response.data.token);
        setIsLoading(false); // Data fetched, set isLoading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem fetching the URL and token.",
        });
        setIsLoading(false); // Even with error, set isLoading to false
      }
    };

    // Initial fetch when the component mounts
    fetchData();

    // Set up an interval to fetch data every 5 minutes (adjust as needed)
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
    if (adminUrl && adminToken) {
        window.location.href = `${adminUrl}?token=${adminToken}`;
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col h-auto items-center justify-center pt-32 container gap-5">
        <Button 
          disabled={isLoading} 
          onClick={goToAdminPage} 
          className="mt-8 hover:underline"
        >
          {isLoading ? <ButtonComponent /> : 'Go to Admin Page'} 
        </Button>
        <Input className="w-full max-w-md" type="text" value={adminUrl || ""} readOnly />
        <Input className="w-full max-w-md" type="text" value={adminToken || ""} readOnly />
        <Button onClick={rotateLink} className="w-full max-w-md">Rotate Link</Button>
      </main>
    </>
  );
}
