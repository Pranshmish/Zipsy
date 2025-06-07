import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Reviews = ({ reviews = [], averageRating = 0 }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Average Rating Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {renderStars(averageRating)}
        </div>
        <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
        <span className="text-gray-500">({reviews.length} reviews)</span>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {review.userName?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="font-medium">{review.userName || 'Anonymous'}</span>
              </div>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <span className="text-sm text-gray-400">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews; 