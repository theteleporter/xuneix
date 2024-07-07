"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ADMIN_BASE_PATH, ROTATED_URLS_KEY } from "../constants";
import { kv } from "@vercel/kv";

export default function AdminPage() {
  const [rotatedUrls, setRotatedUrls] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storedRotatedUrls, storedAdminToken] = await Promise.all([
          kv.get<string[]>(ROTATED_URLS_KEY),
          kv.get<string>("token"),
        ]);

        console.log("Fetched rotatedUrls:", storedRotatedUrls);
        console.log("Fetched adminToken:", storedAdminToken);

        setRotatedUrls(storedRotatedUrls || []);
        setAdminToken(storedAdminToken || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-xl font-bold">Welcome to the Admin Page</h1>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="mt-8">View Rotated Urls</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>History of rotated URLs</AlertDialogTitle>
            <AlertDialogDescription>
              <ScrollArea className="h-72 rounded-md border">
                <div className="p-4">
                  {rotatedUrls.map((urlSegment, index) => (
                    <div key={index}>
                      {adminToken && (
                        <Link href={`${ADMIN_BASE_PATH}/${urlSegment}?token=${adminToken}`}>
                          {`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${ADMIN_BASE_PATH}/${urlSegment}?token=${adminToken}`}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Link href="/" className="mt-8 hover:underline">
        Back to Home
      </Link>
    </main>
  );
}
