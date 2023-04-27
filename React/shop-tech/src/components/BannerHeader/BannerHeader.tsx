// @flow
import * as React from 'react';


export function BannerHeader() {
    return (
        <div className='w-full relative italic h-[400px]'>

            <div className='absolute top-[50%] mt-[-80px] ml-9 bg-[#F4F5F9]'>
                <p className='uppercase mb-3 text-slate-400'>new inspiration 2020</p>
                <p className='uppercase mb-3 font-medium text-3xl'>20% off on new season</p>
                {/* Button go to collection */}
                <span className='bg-black p-2 inline-block text-slate-50 hover:bg-slate-600'>
                    <a className='' href="/">Browser collections</a>
                </span>
            </div>
            
            <img className='object-contain' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fbanner1.jpg?alt=media&token=ffde508e-d865-4787-9904-f04bcd07b206" alt="" />
        </div>
    );
};