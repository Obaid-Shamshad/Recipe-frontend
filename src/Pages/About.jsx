import React, { useState } from 'react'
import StoryData from '../Data/Static'
import { motion } from "motion/react"


function About() {


  return (
    <div>
      <h1 className='text-4xl font-bold text-center mt-20'>About <span className='text-blue-700'>RecipeHub</span></h1>
      <div className='overflow-hidden grid md:grid-cols-2 grid-cols-1 p-2 place-items-center gap-8 sm:p-16 md:px-8 my-6'>
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.3, once: true }}
          src="./foodimg1.png" alt="food image" className='md:order-1 w-full md:w-auto' />
        <motion.p
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ amount: 0.3, once: true }}
          className='text-lg text-gray-700 md:order-2'>{StoryData[0]}</motion.p>
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.3, once: true }}
          src="./foodimg2.png" alt="food image" className='md:order-4 w-full md:w-auto' />
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ amount: 0.3, once: true }}
          className='text-lg text-gray-700 md:order-3'>{StoryData[1]}</motion.p>
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ amount: 0.3, once: true }}
          src="./foodimg3.png" alt="food image" className='md:order-5 w-full md:w-auto' />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ amount: 0.3, once: true }}
          className='text-lg text-gray-700 md:order-6'>{StoryData[2]}</motion.p>
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 1 }}
          viewport={{ amount: 0.3, once: true }}
          src="./foodimg4.png" alt="food image" className='md:order-8 w-full md:w-auto' />
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ amount: 0.3, once: true }}
          className='text-lg text-gray-700 md:order-7'>{StoryData[3]}</motion.p>
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ amount: 0.3, once: true }}
          src="./foodimg5.png" alt="food image" className='md:order-9 w-full md:w-auto' />
        <motion.p initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ amount: 0.3, once: true }} className='text-lg text-gray-700 md:order-10'>{StoryData[4]}</motion.p>
      </div>
    </div>
  )
}

export default About

