'use client';

import Poster from '@/components/detail/Poster';
import Info from '@/components/detail/Info';
import { useEffect } from 'react';

const mokData = {
  'adult': false,
  'backdrop_path': '/qUc0Hol3eP74dbW4YyqT6oRLYgT.jpg',
  'belongs_to_collection': null,
  'budget': 118000000,
  'genres': [
    {
      'id': 878,
      'name': 'SF',
    },
    {
      'id': 35,
      'name': '코미디',
    },
    {
      'id': 12,
      'name': '모험',
    },
  ],
  'homepage': 'https://www.recodelog.com/blog/next/image-component',
  'id': 696506,
  'imdb_id': 'tt12299608',
  'origin_country': ['GB', 'US'],
  'original_language': 'en',
  'original_title': 'Mickey 17',
  'overview':
    '친구 티모와 함께 차린 마카롱 가게가 쫄딱 망해 거액의 빚을 지고 못 갚으면 죽이겠다는 사채업자를 피해 지구를 떠나야 하는 미키. 기술이 없는 그는, 정치인 마셜의 얼음행성 개척단에서 위험한 일을 도맡고, 죽으면 다시 프린트되는 익스펜더블로 지원한다. 4년의 항해와 얼음행성 니플하임에 도착한 뒤에도 늘 미키를 지켜준 여자친구 나샤. 그와 함께, 미키는 반복되는 죽음과 출력의 사이클에도 익숙해진다. 그러나 미키 17이 얼음행성의 생명체인 크리퍼와 만난 후 죽을 위기에서 돌아와 보니 이미 미키 18이 프린트되어 있다. 행성 당 1명만 허용된 익스펜더블이 둘이 된 멀티플 상황. 둘 중 하나는 죽어야 하는 현실 속에 걷잡을 수 없는 사건이 기다리고 있었으니…',
  'popularity': 17.39,
  'poster_path': '/7KghOYtsxFquUuw4THbARsSEo6g.jpg',
  'production_companies': [
    {
      'id': 174,
      'logo_path': '/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png',
      'name': 'Warner Bros. Pictures',
      'origin_country': 'US',
    },
    {
      'id': 81,
      'logo_path': '/8wOfUhA7vwU2gbPjQy7Vv3EiF0o.png',
      'name': 'Plan B Entertainment',
      'origin_country': 'US',
    },
    {
      'id': 168228,
      'logo_path': null,
      'name': 'Offscreen',
      'origin_country': 'GB',
    },
    {
      'id': 81024,
      'logo_path': null,
      'name': 'Kate Street Picture Company',
      'origin_country': 'US',
    },
    {
      'id': 216687,
      'logo_path': null,
      'name': 'Domain Entertainment',
      'origin_country': 'US',
    },
  ],
  'production_countries': [
    {
      'iso_3166_1': 'US',
      'name': 'United States of America',
    },
    {
      'iso_3166_1': 'GB',
      'name': 'United Kingdom',
    },
  ],
  'release_date': '2025-02-28',
  'revenue': 90487032,
  'runtime': 137,
  'spoken_languages': [
    {
      'english_name': 'English',
      'iso_639_1': 'en',
      'name': 'English',
    },
  ],
  'status': 'Released',
  'tagline': '오늘도 죽으러 갑니다, 인류를 위해',
  'title': '미키 17',
  'video': false,
  'vote_average': 7,
  'vote_count': 816,
};

const src = 'https://image.tmdb.org/t/p/w300' + mokData.poster_path;

interface Props {
  params: {
    id: string;
  };
}

const DetailPage = ({ params }: Props) => {
  useEffect(() => {
    const dataFetch = async () => {
      // TODO: 실제 data fetching 로직 구현
      const data = () => {
        console.log(params.id);
      };
    };
    dataFetch();
  }, []);
  return (
    <main>
      <Poster src={src} alt={mokData.title}></Poster>
      <Info movie={mokData} />
    </main>
  );
};

export default DetailPage;
