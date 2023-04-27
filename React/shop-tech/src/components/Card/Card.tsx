// @flow
import * as React from 'react';

import { formatPrice } from './script';

type Id = {
    '$oid': string
}

type Props = {
    _id: string,
    name: string,
    price: string,
    avt: string,
    handleClick: (id:string | null) => void,
};
export default function Card(props: Props) {
    
    let id:Id = JSON.parse(JSON.stringify(props._id))

    return (
        <div id={id.$oid} className='animate-showup italic flex flex-col items-center hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' 
            onClick={(event) => {
                
                console.log(event.currentTarget.getAttribute('id'));
                props.handleClick(event.currentTarget.getAttribute('id'))
            }}
        >
            <img src={props.avt} alt={'Ảnh'+props.name} className="mb-3 object-contain w-full h-[250px]" ></img>
            {/* Title */}
            <h3 className='font-semibold text-center'>{props.name}</h3>
            <p className='text-slate-500'>{formatPrice(props.price)} VND</p>
        </div>
    );
};