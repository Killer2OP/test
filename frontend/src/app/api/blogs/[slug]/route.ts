import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Blog } from '@/app/types/blog';

// Get blog data by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Get the slug directly from params
    const { slug } = params;

    // Read blogs.json file
    const filePath = path.join(process.cwd(), 'public', 'blogs.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const blogs = JSON.parse(jsonData);

    // Find the blog with matching slug
    const blog = blogs.find((blog: Blog) => blog.slug === slug) || null;

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get related posts (3 random blogs excluding current one)
    const otherBlogs = blogs.filter((b: Blog) => b.slug !== slug);
    const shuffled = [...otherBlogs].sort(() => 0.5 - Math.random());
    const relatedPosts = shuffled.slice(0, 3);

    // Calculate read time
    const wordCount = blog.overview?.split(/\s+/).length || 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Use the publishDate from the blog data
    const publishDate = blog.publishDate || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return NextResponse.json({
      blog,
      relatedPosts,
      readTime,
      publishDate
    });
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    );
  }
}
