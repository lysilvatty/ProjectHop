import { Link } from "wouter";
import { VideoWithDetails } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";

interface VideoCardProps {
  video: VideoWithDetails;
}

export default function VideoCard({ video }: VideoCardProps) {
  const {
    id,
    title,
    thumbnailUrl,
    price,
    duration,
    professional,
    category,
    averageRating,
    ratingCount
  } = video;

  return (
    <Link href={`/video/${id}`}>
      <Card className="video-card rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg cursor-pointer">
        <div className="relative">
          <img 
            src={thumbnailUrl || `https://source.unsplash.com/random/500x300/?${category.name}`} 
            alt={title} 
            className="w-full aspect-video object-cover"
          />
          <div 
            className="absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded"
            style={{ backgroundColor: category.color }}
          >
            {category.displayName.toUpperCase()}
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <i className="ri-time-line mr-1"></i> {formatDuration(duration)}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg">{title}</h3>
            <span className="text-primary font-bold">R$ {price.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex items-center mb-3">
            <img 
              src={professional.profileImage || `https://source.unsplash.com/random/100x100/?person`} 
              alt={`Foto de ${professional.name}`}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-gray-700 text-sm">
              {professional.name} • {professional.experience} anos exp.
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            {video.description.length > 80 
              ? `${video.description.substring(0, 80)}...` 
              : video.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="ri-star-fill text-yellow-400"></i>
              <span className="ml-1 text-sm font-medium">
                {averageRating ? averageRating.toFixed(1) : 'Novo'}
              </span>
              {ratingCount && ratingCount > 0 ? (
                <span className="ml-1 text-xs text-gray-500">({ratingCount})</span>
              ) : null}
            </div>
            <button className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-90 transition-colors">
              Ver Detalhes
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
