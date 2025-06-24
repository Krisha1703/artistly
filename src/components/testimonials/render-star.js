// RenderStars Component
export const RenderStars = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        // Full star
        stars.push(
          <div key={i} className="w-4 h-4 text-yellow-500 inline-block">
            ★
          </div>
        );
      } else if (rating > i && rating < i + 1) {
        // Partial star
        const fillPercentage = (rating - i) * 100;
        stars.push(
          <div
            key={i}
            className="relative w-4 h-4 text-gray-300 inline-block"
            style={{ position: 'relative' }}
          >
            <span>★</span>
            <div
              className="absolute top-0 left-0 h-5 text-yellow-500"
              style={{
                width: `${fillPercentage}%`,
                overflow: 'hidden',
              }}
            >
              ★
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <div key={i} className="w-4 h-4 text-gray-300 inline-block">
            ★
          </div>
        );
      }
    }
    return <>{stars}</>;
  };