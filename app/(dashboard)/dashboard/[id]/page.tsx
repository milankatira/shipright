"use client";

import React, { useEffect, useState } from "react";
import { getPostByUrl, deletePost, updatePostTheme } from "@/action/post.action";
import {
    createFeature,
    getFeaturesByPostId,
    deleteFeature,
    updateFeature,
} from "@/action/features.action";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, ChevronUp, Copy, Delete, Files, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PageProps {
    params: {
        id: string | string[] | undefined;
    };
}

interface Board {
    id: string;
    title: string;
    url: string;
    published: boolean;
    authorId: string | null;
    createdAt: Date;
    updatedAt: Date;
    theme: "LIGHT" | "DARK" | "CUPCAKE" | "RETRO" | "AQUA" | "CYBERPUNK";
}


interface Feature {
    id: string;
    title: string;
    description: string;
    voteCount: number;
    tag: "NEW" | "WORK_IN_PROGRESS" | "SHIPPED" | "CANCELLED";
}

const BoardInfo = ({ params }: PageProps) => {
    const { toast } = useToast();
    const { id } = params;
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [board, setBoard] = useState<Board | null>(null);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newFeature, setNewFeature] = useState({ title: "", description: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeletingFeature, setIsDeletingFeature] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchBoardAndFeatures = async () => {
            if (!id || typeof id !== "string") {
                toast({
                    title: "Error",
                    description: "Invalid board ID",
                    variant: "destructive",
                });
                router.push("/dashboard");
                return;
            }

            try {
                const fetchedBoard = await getPostByUrl(id);
                if (!fetchedBoard) {
                    toast({
                        title: "Error",
                        description: "Board not found",
                        variant: "destructive",
                    });
                    router.push("/dashboard");
                    return;
                }

                setBoard(fetchedBoard);
                const fetchedFeatures = await getFeaturesByPostId(fetchedBoard.id);
                setFeatures(fetchedFeatures);
            } catch (err) {
                toast({
                    title: "Error",
                    description: "Failed to load board details",
                    variant: "destructive",
                });
                console.error(err);
            }
        };

        fetchBoardAndFeatures();
    }, [id, router]);

    const handleFeatureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!newFeature.title || !newFeature.description) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const createdFeature = await createFeature({
                title: newFeature.title,
                description: newFeature.description,
                postId: board?.id || "",
            });

            setFeatures((prev) => [...prev, createdFeature]);
            setNewFeature({ title: "", description: "" });
            toast({
                title: "Success",
                description: "Feature created successfully!",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create feature",
                variant: "destructive",
            });
            console.error("Error creating feature:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteFeature = async (featureId: string) => {
        setIsDeletingFeature(featureId);
        try {
            await deleteFeature(featureId);
            setFeatures((prev) => prev.filter((feature) => feature.id !== featureId));
            toast({
                title: "Success",
                description: "Feature deleted successfully",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete feature",
                variant: "destructive",
            });
            console.error("Error deleting feature:", err);
        } finally {
            setIsDeletingFeature(null);
        }
    };

    const handleDeleteBoard = async () => {
        startTransition(async () => {
            try {
                if (board) {
                    await deletePost(board.id);
                    toast({
                        title: "Success",
                        description: "Board deleted successfully",
                    });
                    setShowDeleteModal(false);
                    router.push("/dashboard");
                }
            } catch (err) {
                toast({
                    title: "Error",
                    description: "Failed to delete board",
                    variant: "destructive",
                });
                console.error("Error deleting board:", err);
            }
        });
    };

    const handleTagChange = async (id: string, newTag: Feature["tag"]) => {
        try {
            await updateFeature({
                id,
                tag: newTag,
            });
            setFeatures((prevFeatures) =>
                prevFeatures.map((feature) =>
                    feature.id === id ? { ...feature, tag: newTag } : feature
                )
            );
            toast({
                title: "Success",
                description: "Feature status updated",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to update feature status",
                variant: "destructive",
            });
            console.error("Error updating feature:", err);
        }
    };

    const DeleteBoardDialog = () => (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-2 py-6">
                    <Trash2 className="mr-2" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Board</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this board? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteBoard}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <LoadingSpinner size="sm" />
                        ) : (
                            "Delete Board"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-bold text-red-500">{error}</h1>
            </div>
        );
    }

    if (!board) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const handleThemeChange = async (newTheme: Board["theme"]) => {
        if (!board) return;
        try {
            const updatedBoard = await updatePostTheme(board.id, newTheme);
            setBoard(updatedBoard);
        } catch (err) {
            console.error("Error updating theme:", err);
        }
    };

    const themeStyles: { [key in Board["theme"]]: string } = {
        LIGHT: "bg-white text-black",
        DARK: "bg-black text-white",
        CUPCAKE: "bg-pink-100 text-pink-700",
        RETRO: "bg-beige-200 text-brown-800",
        AQUA: "bg-blue-500 text-blue-100",
        CYBERPUNK: "bg-yellow-500 text-black",
    };

    return (
        <div className="p-6 max-w-[1000px] mx-auto">
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 text-black">
                <Card className="w-full md:w-2/5 p-4 h-fit">

                    <h1 className="text-3xl font-bold mb-4">{board.title}</h1>

                    <div className="mb-4">
                        <label className="text-sm font-medium text-muted-foreground">Theme:</label>
                        <Select
                            value={board.theme}
                            onValueChange={(value) => handleThemeChange(value as Board["theme"])}
                        >
                            <SelectTrigger
                                className={`w-full border p-2 rounded ${themeStyles[board.theme]}`}
                            >
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Themes</SelectLabel>
                                    {Object.entries(themeStyles).map(([theme, styles]) => (
                                        <SelectItem
                                            key={theme}
                                            value={theme}
                                            className={styles}
                                        >
                                            {theme.charAt(0) + theme.slice(1).toLowerCase()}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <span className="block text-gray-700">Public link:</span>
                        <div className="flex items-center space-x-2 border border-gray-100 bg-white rounded-lg px-2">
                            <input
                                type="text"
                                value={`https://insigh.to/b/${board.url}`}
                                readOnly
                                className="w-full p-2  font-bold  rounded focus:outline-none"
                            />
                            {/* <Files /> */}

                            <Files onClick={() =>
                                navigator.clipboard.writeText(`https://insigh.to/b/${board.url}`)
                            } className="bg-white w-8 h-8 hover:bg-black p-1 rounded-md text-black hover:text-white transition-all duration-300" />

                            <ArrowUpRight
                                onClick={() => router.push(`/board/${board.url}`)}
                                className="bg-white w-8 h-8 hover:bg-black p-1 rounded-md text-black hover:text-white transition-all duration-300 cursor-pointer"
                            />

                        </div>
                    </div>
                    <DeleteBoardDialog />


                </Card>
                <div className="w-full md:w-3/5 p-4">
                    {/* Feature Submission Form */}
                    <Card className="mb-8 p-8">
                        <h2 className="text-xl font-semibold mb-4">Suggest a Feature</h2>
                        <form onSubmit={handleFeatureSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Short, descriptive title"
                                    value={newFeature.title}
                                    onChange={(e) =>
                                        setNewFeature({ ...newFeature, title: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Description"
                                    value={newFeature.description}
                                    onChange={(e) =>
                                        setNewFeature({ ...newFeature, description: e.target.value })
                                    }
                                    className="min-h-[100px]"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoadingSpinner size="sm" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Post"
                                )}
                            </Button>
                        </form>
                    </Card>

                    {/* Features List */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Features List</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {features.length === 0 ? (
                                <Card className="p-8 text-center">
                                    <h3 className="text-xl font-semibold mb-2">No features yet!</h3>
                                    <p className="text-gray-600">Share your board with the world and start collecting feedback.</p>
                                </Card>
                            ) : (
                                features.map((feature) => (
                                    <Card
                                        key={feature.id}
                                        className="p-4 flex justify-between items-start"
                                    >
                                        <div>
                                            <h3 className="font-bold">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                            <div className="flex items-center space-x-2 mt-4">
                                                <ChevronUp />
                                                <span >{feature.voteCount} </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-4 items-center mt-4">
                                            <Select
                                                value={feature.tag}
                                                onValueChange={(value) => handleTagChange(feature.id, value as "NEW" | "WORK_IN_PROGRESS" | "SHIPPED" | "CANCELLED")}
                                            >
                                                <SelectTrigger className="w-[120px] p-2 border rounded text-gray-600">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Status</SelectLabel>
                                                        <SelectItem value="NEW">⭐ New</SelectItem>
                                                        <SelectItem value="WORK_IN_PROGRESS">🏗️ Work In Progress</SelectItem>
                                                        <SelectItem value="SHIPPED">✅ Shipped</SelectItem>
                                                        <SelectItem value="CANCELLED">❌ Cancelled</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => handleDeleteFeature(feature.id)}
                                                className="px-2 py-1 text-sm"
                                                disabled={isDeletingFeature === feature.id}
                                            >
                                                {isDeletingFeature === feature.id ? (
                                                    <LoadingSpinner size="sm" />
                                                ) : (
                                                    <>
                                                        Delete
                                                        <Trash2 />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardInfo;
