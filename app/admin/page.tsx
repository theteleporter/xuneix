'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';


export default function AdminPage() {
    const [rotatedUrls, setRotatedUrls] = useState<string[]>([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // Fetch rotated URLs from wherever you store them (e.g., Vercel KV)
        const fetchRotatedUrls = async () => {
            try {
                const response = await axios.get('/api/rotated-urls'); // Create this API endpoint
                setRotatedUrls(response.data);
            } catch (error) {
                console.error("Error fetching rotated URLs:", error);
            }
        };
        fetchRotatedUrls();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className='text-3xl font-bold underline'>Welcome to the Admin Page</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button className="mt-8 hover:underline">View Rotated Urls</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Rotated URLs</AlertDialogTitle>
                    <AlertDialogDescription>
                        <ScrollArea className="h-96 rounded-md border">
                            <div className="p-4">
                                {rotatedUrls.map((url, index) => (
                                    <p key={index}>{url}</p>
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
