import React from 'react';

interface Props {
  videoLink: string;
}

const VideoBtn = ({ videoLink }: Props) => {
  return (
    <section className='my-[20px] flex items-center justify-center'>
      <button onClick={() => window.open(videoLink, '_blank', 'noopener,noreferrer')}>예고편 보러가기</button>
    </section>
  );
};

export default VideoBtn;
