"use client";
import { About } from '@/components/pages/landingPage/about';
import { FAQ } from '@/components/pages/landingPage/faq';
import { Feature } from '@/components/pages/landingPage/feature';
import { Parteners } from '@/components/pages/landingPage/parteners';
import * as React from 'react';

export default function HomePage () {
  return (
    <div className='m-4'>
      <About />
      <Feature />
      <Parteners />
      <FAQ />
    </div>
  );
}
