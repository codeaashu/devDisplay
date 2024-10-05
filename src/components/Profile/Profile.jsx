import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter, FaLocationDot } from 'react-icons/fa6';

function Profile({ data }) {
  return <Card data={data} />;
}

function Card({ data }) {
  const cardRef = React.useRef();

  const handleWheel = (event) => {
    event.stopPropagation();
    event.preventDefault();
    let container = event.target;

    while (!container.classList.contains('skills-container')) {
      container = container.parentNode;
    }

    const delta = event.deltaX || event.deltaY;
    container.scrollLeft += delta;
  };

  React.useEffect(() => {
    const currentRef = cardRef.current;
    currentRef.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="mb-6 h-auto rounded-lg bg-white p-4 shadow dark:bg-textPrimary">
      <div className="relative flex gap-4">
        <div className="h-24 w-24 flex-shrink-0">
          <img src={data.avatar} className="h-full w-full rounded-full" alt={`${data.name}'s Avatar`} />
        </div>
        <div className="w-[55%] sm:w-[75%]">
          <h3>
            <a
              className="text-lg font-bold hover:text-textSecondary dark:text-white"
              href={data.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              {data.name}
            </a>
          </h3>
          <p className="flex items-center gap-x-1 text-sm dark:text-white">
            <FaLocationDot />
            {data.location || 'Location not available'}
          </p>
          <div
            className="skills-container mt-4 flex h-auto gap-4 overflow-hidden hover:overflow-x-scroll hover:scroll-smooth"
            ref={cardRef}
          >
            {data.skills?.map((skill, index) => (
              <div
                className="inline h-auto cursor-default whitespace-nowrap rounded-md bg-secondaryColor px-2 py-1 text-[9px] text-white sm:text-sm md:h-[30px]"
                key={index}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div
          className={`md:absolute md:right-2 md:top-2 ${
            data.portfolio ? 'ml-auto w-28 hover:underline' : 'ml-auto w-28 cursor-not-allowed brightness-50'
          }`}
        >
          <a href={data.portfolio} className="text-textSecondary" target="_blank" rel="noreferrer">
            View Profile &#8594;
          </a>
        </div>
      </div>
      <div className="mt-4">
        <div className="dark:text-white">{data.bio || 'No bio available'}</div>
        <div className="mt-1 flex gap-x-4">
          {data.social?.GitHub && (
            <a href={data.social.GitHub} target="_blank" rel="noreferrer" aria-label="GitHub Profile">
              <FaGithub className="text-2xl text-blue-600 duration-300 hover:scale-125" />
            </a>
          )}
          {data.social?.Twitter && (
            <a href={data.social.Twitter} target="_blank" rel="noreferrer" aria-label="Twitter Profile">
              <FaXTwitter className="text-2xl text-blue-600 duration-300 hover:scale-125" />
            </a>
          )}
          {data.social?.LinkedIn && (
            <a href={data.social.LinkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
              <FaLinkedin className="text-2xl text-blue-600 duration-300 hover:scale-125" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
