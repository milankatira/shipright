"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost, getPosts } from "@/action/post.action";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { syncUserInDb } from "@/action/auth.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ShimmerEffect from "@/components/Shimmer/PostShimmer";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
    const [boards, setBoards] = useState<{ id: string; name: string; url: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchBoards = async () => {
            setIsLoading(true);
            try {
                const userData = userId && await syncUserInDb({ id: userId });
                if (!userId) return;

                const posts = userData && await getPosts(userId);

                const fetchedBoards = posts && posts.map((post: any) => ({
                    id: post.id,
                    name: post.title,
                    url: post.url,
                }));
                fetchedBoards && setBoards(fetchedBoards);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);

                console.error("Error fetching boards:", error);
            }
        };
        fetchBoards();
    }, [userId]);

    const handleCreateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const boardName = formData.get("boardName") as string;

        if (!boardName || !userId) {
            toast({
                title: "Error",
                description: "Please provide a board name",
                variant: "destructive",
            });
            return;
        }

        const link = `${boardName.replace(/\s+/g, "-").toLowerCase()}`;

        try {
            if (!boardName || !link || !userId) {
                return toast({
                    title: "Error",
                    description: "Failed to create board. Please try again.",
                    variant: "destructive",
                });
            }
            const newBoard = await createPost({
                name: boardName,
                url: link,
                authorId: userId,
            });

            setBoards((prevBoards) => [
                ...prevBoards,
                { id: newBoard.id, name: newBoard.title, url: newBoard.url },
            ]);

            toast({
                title: "Success",
                description: "Board created successfully",
            });

            router.push(`/dashboard/${link}`);

        } catch (error) {
            console.error("Error creating board:", error);
            toast({
                title: "Error",
                description: "Failed to create board. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="p-6 max-w-[1000px] mx-auto">
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                {/* Create Board Form */}
                <Card className="w-full md:w-1/3 p-8 h-fit">
                    <h2 className="font-bold text-lg mb-4">
                        Build features users <span className="bg-black text-white p-2 rounded-lg">really</span> want
                    </h2>
                    <form onSubmit={handleCreateBoard} className="mt-10">
                        <Input
                            name="boardName"
                            placeholder="your next unicorn name 🦄✨"
                            required
                            className="mb-4 placeholder:opacity-50"
                        />
                        <Button type="submit" variant="default" className="w-full">
                            Create Board
                        </Button>
                    </form>
                </Card>

                {/* Updated Boards List */}
                <div className="w-full md:w-2/3 p-4">
                    <h2 className="font-bold text-black mb-4">{boards.length} Boards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {isLoading ? (
                            // Shimmer effect remains unchanged
                            Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index} className="p-4">
                                    <ShimmerEffect />
                                </Card>
                            ))
                        ) : boards.length === 0 ? (
                            // No boards state
                            <div className="col-span-2 text-center p-8">
                                <h3 className="text-xl font-semibold mb-2">No boards yet</h3>
                                <p className="text-gray-500 mb-4">Create your first board to get started!</p>
                            </div>
                        ) : (
                            // Updated board cards with more info
                            boards.map((board) => (
                                <Link href={`/dashboard/${board.url}`} key={board.id}>
                                    <Card className="p-4 hover:bg-black hover:text-white transition-colors">
                                        <div className="flex flex-row justify-between items-center">
                                            <h3 className="font-bold text-lg">{board.name}</h3>
                                            <ArrowRight />
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

