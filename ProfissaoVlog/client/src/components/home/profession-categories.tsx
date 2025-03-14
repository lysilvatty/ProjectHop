import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category, VideoWithDetails } from "@shared/schema";
import VideoCard from "@/components/video/video-card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfessionCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: videos, isLoading: isLoadingVideos } = useQuery<VideoWithDetails[]>({
    queryKey: ["/api/videos", activeCategory],
    queryFn: async ({ queryKey }) => {
      const categoryId = queryKey[1];
      const url = categoryId 
        ? `/api/videos?categoryId=${categoryId}` 
        : "/api/videos";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    }
  });

  // Set first category as active by default
  useEffect(() => {
    if (categories && categories.length > 0 && activeCategory === null) {
      setActiveCategory(null); // "All" category
    }
  }, [categories, activeCategory]);

  const handleCategoryClick = (id: number | null) => {
    setActiveCategory(id);
  };

  // Only show up to 4 videos initially
  const displayVideos = videos ? videos.slice(0, 4) : [];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-8">Explore por categoria</h2>
        
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex space-x-3 pb-4">
            <button 
              className={`category-pill whitespace-nowrap px-4 py-2 rounded-full ${activeCategory === null ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
              onClick={() => handleCategoryClick(null)}
            >
              Todas
            </button>
            
            {isLoadingCategories ? (
              Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-9 w-28 rounded-full" />
              ))
            ) : (
              categories?.map((category) => (
                <button 
                  key={category.id}
                  className={`category-pill whitespace-nowrap px-4 py-2 rounded-full ${activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'} font-medium`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.displayName}
                </button>
              ))
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {isLoadingVideos ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-1/3 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))
          )}
          
          {/* View more button */}
          <div className="col-span-full flex justify-center mt-6">
            <Link href="/explore">
              <Button variant="outline" className="px-6 py-6 bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center">
                <span>Ver mais profissões</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
