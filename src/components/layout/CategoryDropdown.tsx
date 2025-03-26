'use client';
import { categoryRoutes } from '@/constants/categoryRoutes';
import Link from 'next/link';
import React from 'react';

const CategoryDropdown = () => {
  return (
    <div className='group relative inline-block'>
      <button className='whitespace-nowrap font-semibold hover:text-red-500'>카테고리</button>
      {/* 드롭다운 메뉴 */}
      <div className='invisible absolute left-0 top-full z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white opacity-0 shadow transition-all group-hover:visible group-hover:opacity-100'>
        <ul className='py-2 text-base font-semibold text-slate-900'>
          {Object.values(categoryRoutes).map((category) => (
            <li key={category.path}>
              <Link href={category.path} className='block px-4 py-2 hover:bg-gray-100'>
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropdown;
