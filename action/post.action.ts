"use server";

import prisma from "@/lib/prisma";

interface CreatePostInput {
  name: string;
  url: string;
  authorId: string;
}

export async function createPost(input: CreatePostInput) {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: input.name,
        url: input.url,
        authorId: input.authorId,
      },
    });
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Could not create post");
  }
}

export async function getPosts(authorId?: string) {
  try {
    const posts = await prisma.post.findMany({
      where: authorId
        ? {
            authorId: authorId,
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
}

export async function getPostByUrl(url: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        AND: [{ url }],
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post by URL:", error);
    throw new Error("Could not fetch post by URL");
  }
}

export async function deletePost(postId: string) {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return deletedPost;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Could not delete post");
  }
}

export async function updatePostTheme(
  id: string,
  theme: "LIGHT" | "DARK" | "CUPCAKE" | "RETRO" | "CYBERPUNK" | "AQUA",
) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { theme },
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post theme:", error);
    throw new Error("Could not update post theme");
  }
}
