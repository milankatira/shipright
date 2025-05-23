"use server";

import prisma from "@/lib/prisma";

interface CreateFeatureInput {
  title: string;
  description: string;
  postId: string;
}

interface UpdateFeatureInput {
  id: string;
  title?: string;
  description?: string;
  voteCount?: number;
  tag?: "NEW" | "WORK_IN_PROGRESS" | "SHIPPED" | "CANCELLED"; // Include tag in the update input
}

interface VoteResponse {
  success: boolean;
  message: string;
  hasVoted?: boolean;
  feature?: any;
}

export async function createFeature(input: CreateFeatureInput) {
  try {
    const newFeature = await prisma.feature.create({
      data: {
        title: input.title,
        description: input.description,
        postId: input.postId,
        tag: "NEW", // Default tag when creating a feature
      },
    });
    return newFeature;
  } catch (error) {
    console.error("Error creating feature:", error);
    throw new Error("Could not create feature");
  }
}

export async function getFeaturesByPostId(postId: string) {
  try {
    if (!postId || typeof postId !== "string") {
      console.warn("Invalid postId provided:", postId);
      return [];
    }

    const features = await prisma.feature.findMany({
      where: {
        postId,
      },
    });

    return features || [];
  } catch (error) {
    console.error("Error fetching features by Post ID:", postId, error);
    return [];
  }
}

export async function updateFeature(input: UpdateFeatureInput) {
  try {
    const updatedFeature = await prisma.feature.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description,
        voteCount: input.voteCount,
        tag: input.tag,
      },
    });
    return updatedFeature;
  } catch (error) {
    console.error("Error updating feature:", error);
    throw new Error("Could not update feature");
  }
}

export async function deleteFeature(id: string) {
  try {
    const deletedFeature = await prisma.feature.delete({
      where: {
        id,
      },
    });
    return deletedFeature;
  } catch (error) {
    console.error("Error deleting feature:", error);
    throw new Error("Could not delete feature");
  }
}

export async function hasUserVoted(
  featureId: string,
  userId: string,
): Promise<boolean> {
  try {
    const vote = await prisma.vote.findUnique({
      where: {
        userId_featureId: {
          userId,
          featureId,
        },
      },
    });
    return !!vote;
  } catch (error) {
    console.error("Error checking user vote:", error);
    return false;
  }
}

export async function upvoteFeature(
  featureId: string,
  userId: string,
): Promise<VoteResponse> {
  try {
    // Check if user has already voted
    const existingVote = await hasUserVoted(featureId, userId);

    if (existingVote) {
      return {
        success: false,
        message: "You have already voted for this feature",
        hasVoted: true,
      };
    }

    // Create vote and increment count in a transaction
    const [vote, updatedFeature] = await prisma.$transaction([
      prisma.vote.create({
        data: {
          userId,
          featureId,
        },
      }),
      prisma.feature.update({
        where: { id: featureId },
        data: {
          voteCount: {
            increment: 1,
          },
        },
      }),
    ]);

    return {
      success: true,
      message: "Vote recorded successfully",
      hasVoted: true,
      feature: updatedFeature,
    };
  } catch (error) {
    console.error("Error upvoting feature:", error);
    return {
      success: false,
      message: "Could not upvote feature",
      hasVoted: false,
    };
  }
}
