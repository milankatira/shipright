import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const userId = "cm5fdhbj00008aq1a13oa27vf"; // Replace with your actual user ID  

    // Create a Post
    const post = await prisma.post.create({
        data: {
            url: "https://example.com/my-post",
            published: true,
            theme: "CYBERPUNK",
            authorId: userId,
            title: "My First Post",
            features: {
                create: [
                    {
                        title: "Dark Mode",
                        description: "A sleek dark mode for better readability.",
                        tag: "SHIPPED",
                    },
                    {
                        title: "Live Chat",
                        description: "Real-time chat feature for better engagement.",
                        tag: "WORK_IN_PROGRESS",
                    },
                ],
            },
        },
        include: {
            features: true,
        },
    });

    console.log("Seeded post with features:", post);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
