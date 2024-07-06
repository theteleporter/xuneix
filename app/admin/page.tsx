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
import { ADMIN_BASE_PATH } from '../constants'
import { kv } from '@vercel/kv';


export default function AdminPage() {
    const [rotatedUrls, setRotatedUrls] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [adminToken, setAdminToken] = useState<string | null>(null); 

    useEffect(() => {
        // Fetch rotated URLs and the admin token from Vercel KV
        const fetchData = async () => {
            try {
                const [storedRotatedUrls, storedAdminToken] = await Promise.all([
                    kv.get<string[] | null>("rotatedUrls"), // Type assertion for string[] or null
                    kv.get<string | null>("token"),       // Type assertion for string or null
                ]);

                setRotatedUrls(storedRotatedUrls || []);
                setAdminToken(storedAdminToken || null); // Handle potential null token
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className='text-xl font-bold'>Welcome to the Admin Page</h1>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="mt-8">View Rotated Urls</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Rotated URLs</AlertDialogTitle>
                        <AlertDialogDescription>
                            <ScrollArea className="h-72 rounded-md border">
                                <div className="p-4">
                                    {rotatedUrls.map((urlSegment, index) => {
                                        const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${ADMIN_BASE_PATH}/${urlSegment}?token=${adminToken}`;
                                        return (
                                            <div key={index}>
                                                {/* Only render Link if adminToken is not null */}
                                                {adminToken && (
                                                    <Link href={fullUrl}>{fullUrl}</Link>
                                                )}
                                            </div>
                                        );
                                    })}
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
