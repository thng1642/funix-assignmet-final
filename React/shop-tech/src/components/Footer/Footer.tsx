// @flow
import * as React from 'react';

import data from './data.json'

export default function Footer() {
    return (
        <div className='bg-slate-950'>
            <footer className='max-w-5xl mx-auto grid grid-cols-3 bg-slate-950 text-slate-50 py-12 italic'>

            {
                data.map((item, index) => (
                    <div key={index}>
                        <h3 className='uppercase mb-4'>{item.heading}</h3>
                        {
                        item.values.map((li, key) => (
                            <li className='list-none text-sm text-gray-400' key={key}>
                                <a href="/">{li}</a>
                            </li>
                        ))
                        }
                    </div>
                ))
            }
            
            </footer>
        </div>
        
    );
};