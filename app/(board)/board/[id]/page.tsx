'use client'

import React, { useEffect, useState } from 'react'
import { getPostByUrl } from '@/action/post.action'
import { createFeature, getFeaturesByPostId, upvoteFeature, hasUserVoted } from '@/action/features.action'
import { ChevronUp } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { AuthModal } from "@/components/auth-modal"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { notFound } from 'next/navigation'
import { syncUserInDb } from '@/action/auth.action'

interface Feature {
  id: string
  title: string
  description: string
  voteCount: number
  tag: 'NEW' | 'WORK_IN_PROGRESS' | 'SHIPPED' | 'CANCELLED'
  hasVoted?: boolean
}

// Define comprehensive theme styles for each theme
const themeStyles = {
  LIGHT: {
    background: "bg-gray-50",
    container: "bg-white/80 border border-gray-100",
    input: "bg-white ring-gray-300 text-gray-900",
    button: "bg-indigo-500 hover:bg-indigo-600 text-white",
    text: "text-gray-800",
    secondaryText: "text-gray-600",
    upvoteButton: {
      default: "bg-white text-gray-800 border-gray-300 hover:bg-gray-100",
      active: "bg-indigo-500 text-white font-bold"
    }
  },
  DARK: {
    background: "bg-[#191e24]",
    container: "bg-[#1d232a]/80 border-0",
    input: "bg-[#1d232a] text-gray-100 placeholder-gray-500 ring-0",
    button: "bg-[#7480ff] hover:bg-[#5b6af7] text-black",
    text: "text-gray-100",
    secondaryText: "text-gray-400",
    upvoteButton: {
      default: "bg-[#25262b] hover:bg-[#2c2d33] text-gray-400 border-0",
      active: "bg-[#7480ff] text-black border-0 font-bold"
    }
  },
  CUPCAKE: {
    background: "bg-[#faf7f7]",
    container: "bg-white shadow-sm border-0",
    input: "bg-white ring-1 ring-gray-200 text-gray-800 placeholder-gray-400",
    button: "bg-[#75CDCD] hover:bg-[#65bdbd] text-white",
    text: "text-gray-800",
    secondaryText: "text-gray-500",
    upvoteButton: {
      default: "bg-white shadow-sm hover:shadow rounded-xl",
      active: "bg-[#75CDCD] text-white font-bold"
    }
  },
  RETRO: {
    background: "bg-amber-50",
    container: "bg-white/80 border border-amber-100",
    input: "bg-white ring-amber-200 text-gray-900",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
    text: "text-gray-800",
    secondaryText: "text-amber-800",
    upvoteButton: {
      default: "bg-amber-200 hover:bg-amber-300 text-amber-800",
      active: "bg-amber-600 text-white font-bold"
    }
  },
  AQUA: {
    background: "bg-cyan-50",
    container: "bg-white/80 border border-cyan-100",
    input: "bg-white ring-cyan-200 text-gray-900",
    button: "bg-cyan-600 hover:bg-cyan-700 text-white",
    text: "text-gray-800",
    secondaryText: "text-cyan-800",
    upvoteButton: {
      default: "bg-cyan-200 hover:bg-cyan-300 text-cyan-800",
      active: "bg-cyan-600 text-white font-bold"
    }
  },
  CYBERPUNK: {
    background: "bg-violet-900",
    container: "bg-violet-800/80 border border-violet-600",
    input: "bg-violet-900 ring-violet-600 text-violet-50",
    button: "bg-purple-500 hover:bg-purple-600 text-white",
    text: "text-violet-50",
    secondaryText: "text-violet-300",
    upvoteButton: {
      default: "bg-violet-700 hover:bg-violet-800 text-violet-300",
      active: "bg-purple-500 text-white font-bold"
    }
  },
};

// Add validation schema
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' })
})

type FormData = z.infer<typeof formSchema>

const Page = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [features, setFeatures] = useState<Feature[]>([])
  const { userId } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const fetchData = async () => {
    try {
      if (!params.id) throw new Error('No ID provided');
      userId && syncUserInDb();


      const postData = await getPostByUrl(params.id);

      if (!postData) {
        notFound();
      }

      setPost(postData);

      if (postData?.id) {
        const featuresData = await getFeaturesByPostId(postData.id);
        setFeatures(featuresData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      notFound();
    } finally {
      setIsInitialLoading(false);
    }
  };
  useEffect(() => {
    params.id && fetchData();
  }, [params?.id]);

  useEffect(() => {
    const checkUserVotes = async () => {
      if (!features.length || !userId) return;

      const votedFeatures = await Promise.all(
        features.map(async (feature) => ({
          ...feature,
          hasVoted: await hasUserVoted(feature.id, userId)
        }))
      );

      setFeatures(votedFeatures);
    };

    checkUserVotes();
  }, [features.length, userId]);

  const handleSubmit = async (data: FormData) => {
    if (!userId) {
      setShowAuthModal(true)
      return
    }

    setIsLoading(true)

    try {
      if (!post?.id) throw new Error('Post ID not found')

      const newFeature = await createFeature({
        title: data.title,
        description: data.description,
        postId: post.id
      })

      setFeatures(prev => [...prev, newFeature])
      form.reset()
    } catch (error) {
      console.error('Error creating feature:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpvote = async (featureId: string) => {
    if (!userId) {
      setShowAuthModal(true)
      return
    }

    try {
      const response = await upvoteFeature(featureId, userId);

      if (!response.success) {
        return;
      }

      setFeatures(prev => prev.map(feature =>
        feature.id === featureId
          ? { ...response.feature, hasVoted: response.hasVoted }
          : feature
      ));
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  }

  if (isInitialLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    post &&
    <>
      <div className={`${themeStyles[post.theme || 'LIGHT'].background} min-h-screen w-screen`}>
        <div className={`p-6 max-w-[1000px] mx-auto min-h-screen`}>
          <p className={`font-bold text-2xl ${themeStyles[post.theme || 'LIGHT'].text}`}>{post?.title}</p>
          <div className={`py-6 px-0 mb-8`}>
            <div className='flex flex-row space-x-4 w-full'>
              {post?.allowUserToCreateFeature && (
                <div className={`rounded-xl shadow-md p-6 max-w-xl mb-8 w-full md:w-2/5 backdrop-blur-sm
                  ${themeStyles[post.theme || 'LIGHT'].container} h-fit`}>
                  <div className="mb-6">
                    <h2 className={`text-xl font-semibold ${themeStyles[post.theme || 'LIGHT'].text}`}>
                      Suggest a Feature
                    </h2>
                    <p className={`text-sm mt-1 ${themeStyles[post.theme || 'LIGHT'].secondaryText}`}>
                      Share your ideas for improving this product
                    </p>
                  </div>

                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div>
                      <label htmlFor="title" className={`block text-sm font-medium mb-1 ${themeStyles[post.theme || 'LIGHT'].text}`}>
                        Title
                      </label>
                      <input
                        {...form.register('title')}
                        type="text"
                        className={`mt-1 block w-full rounded-lg border border-gray-700 px-3 py-2 shadow-sm
                        ${themeStyles[post.theme || 'LIGHT'].input}
                      `}
                        placeholder="Title"
                      />
                      {form.formState.errors.title && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <label htmlFor="description" className={`block text-sm font-medium mb-1 ${themeStyles[post.theme || 'LIGHT'].text}`}>
                        Description
                      </label>
                      <textarea
                        {...form.register('description')}
                        rows={3}
                        className={`mt-1 block w-full rounded-lg border border-gray-700 px-3 py-2 shadow-sm
                        ${themeStyles[post.theme || 'LIGHT'].input}
                      `}
                        placeholder="Description"
                      />
                      {form.formState.errors.description && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-bold w-full justify-center
                        ${themeStyles[post.theme || 'LIGHT'].button}
                        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating...' : 'Create Feature'}
                      </button>
                    </div>
                  </form>

                  <div className="mt-6 text-center">
                    <p className={`text-xs ${themeStyles[post.theme || 'LIGHT'].secondaryText}`}>
                      Powered by{' '}
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium underline
                          ${post.theme === 'DARK' ? 'text-white' : 'text-black'}`}
                      >
                        Shipright
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 w-full md:w-3/5 overflow-scroll h-screen">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`rounded-xl shadow-md p-6 backdrop-blur-sm ${themeStyles[post.theme || 'LIGHT'].container}
                    transition-transform duration-200 ease-in-out`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-lg font-semibold ${themeStyles[post.theme || 'LIGHT'].text}`}>
                          {feature.title}
                        </h3>
                        <p className={`mt-2 text-sm ${themeStyles[post.theme || 'LIGHT'].secondaryText}`}>
                          {feature.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleUpvote(feature.id)}
                        className={`flex items-center flex-col gap-2 px-3 py-2 rounded-lg text-sm
                          ${feature.hasVoted
                            ? themeStyles[post.theme || 'LIGHT'].upvoteButton?.active || themeStyles[post.theme || 'LIGHT'].button
                            : themeStyles[post.theme || 'LIGHT'].upvoteButton?.default || 'bg-transparent'}
                          transition-all duration-200 ease-in-out`}
                      >
                        <ChevronUp
                          className={`transition-transform duration-200 ease-in-out`}
                        />
                        <span >
                          {feature.voteCount}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}

export default Page
