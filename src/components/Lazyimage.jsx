import { useState, useRef, useEffect } from "react";

function LazyImage({ src, className }) {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShow(true);
      }
}, {
        threshold: 0.5
}
   );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show && <img src={src} className={className} />}
    </div>
  );
}

export default LazyImage;