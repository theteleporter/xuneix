'use client'

import { useState, useEffect } from 'react';
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/dormant/header";

export default function Home() {
  const [adminUrl, setAdminUrl] = useState<string>("");
  const [adminToken, setAdminToken] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/generate-url");
        setAdminUrl(response.data.randomUrl);
        setAdminToken(response.data.token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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


  return (
    <>
    <Header />
     <main className="flex flex-col h-auto items-center justify-center p-32 container gap-5">
      <Input className="w-[400px] mb-2" type="text" value={adminUrl} readOnly />
      <Input className="w-[400px]" type="text" value={adminToken} readOnly />
      <Button onClick={rotateLink} className="w-full">Rotate Link</Button>
    </main>
    </>
  );
}