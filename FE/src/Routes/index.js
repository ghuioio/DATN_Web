import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MyComponent = () => {
  const navigate = useNavigate();
  const [isNavigateYet, setIsNavigateYet] = useState(false);

  useEffect(() => {
    if (!isNavigateYet) {
      navigate('/product/629f69c48c2bd1306373f81e');
      setIsNavigateYet(true);
    }
  }, [navigate, isNavigateYet]); // Pass both navigate and isNavigateYet as dependencies

  // ...rest of your component
}

export default MyComponent;
