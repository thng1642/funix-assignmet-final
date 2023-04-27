import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { Product } from '../../../model/product';
import { formatPrice } from '../../../components/Card/script';
import Card from '../../../components/Card/Card';
import { filterActions } from '../../../redux/Filter/FilterSlice';

type Id  = {
    '$oid': string
}

export default function DetailPage() {

    const {productId} = useParams()

    const dispatch = useAppDispatch()

    const [product, setProduct] = useState<Product>({} as Product)

    const [price, setPrice] = useState<string>('')

    const [quantity, setQuantity] = useState<number>(1)

    const [longDes, setLongDes] = useState<string[]>([] as string[])

    const listProduct = useAppSelector((state:RootState)=>state.filter)

    useEffect(()=>{

        for(let i = 0; i < listProduct.length; i++) {
            let tmp = listProduct[i]
            // get id
            let strId: string  = JSON.stringify(tmp._id)
            let id: Id = JSON.parse(strId) 
            if (id.$oid === productId) {
                // get relative product - same product category
                dispatch(filterActions.getKeyFilter(tmp.category))

                setPrice(formatPrice(tmp.price))
                setProduct({...tmp})
                setLongDes(getArraySpecify(tmp.long_desc))
                break
            }
        }
    }, [])

    useEffect(()=>{
        
    },[quantity])

    
    const getArraySpecify = function(text:string) {

        const resultArray = text.split('•')
        
        return resultArray
    }

    return (

        <main className='max-w-5xl mx-auto'>
            {/* Specification product */}
            <div className='grid grid-cols-2 gap-x-3 gap-y-12 mb-14'>

                {/* Images */}
                <div className='grid grid-cols-[calc(20%_-_1rem)_1fr] grid-rows-1 gap-x-2'>
                    {/* cols list */}
                    <ul>
                        <li>
                            <img className='object-contain mb-2' src={product.img1} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img2} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img3} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img4} alt='left img'></img>
                        </li>
                    </ul>
                    {/* Main image */}
                    <img className='object-contain h-full' src={product.img4} alt="Main" />
                </div>

                {/* Description */}
                <div className='italic'>

                    <h3 className='font-semibold text-3xl mb-6'>{product.name}</h3>

                    <p className='text-gray-500 mb-6'>{price} VND</p>

                    <p className='text-gray-500 mb-6 text-sm'>{product.short_desc}</p>

                    <p className='uppercase font-medium mb-5'>category:
                        <span className='text-gray-500 lowercase'> {product.category}</span>
                    </p>
                    {/* Add to cart action */}
                    <div className='flex flex-row'>
                        <div className=' px-4  border border-slate-600 flex flex-row items-center w-[250px] h-10 justify-between'>
                            <span className='uppercase text-gray-500 italic'>Quantity</span> 
                            <div>
                                <ArrowLeftIcon
                                    className='cursor-pointer'
                                    onClick={()=>{  
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1)
                                        }
                                        console.log("Left");
                                    }}
                                    />
                                <span className='not-italic'>{quantity}</span>
                                <ArrowRightIcon 
                                    className='cursor-pointer'
                                    onClick={()=>{
                                        
                                        console.log("Right");
                                        setQuantity(quantity + 1)
                                    }}
                                    />
                            </div>
                        </div>
                        {/* Button Add to cart */}
                        <div className='bg-[#353535] flex items-center w-[150px] h-10 justify-center text-[#E4E4E4] hover:cursor-pointer hover:bg-[#161515ad]' >
                            <span>Add to cart</span>
                        </div>
                    </div>
                </div>
                {/* More description */}
                <div className='col-span-2'>

                    <div className='bg-[#353535] text-[#E4E4E4] inline-block px-6 py-3 mb-6'>
                        <span className='uppercase italic'>description</span>
                    </div>

                    <p className='uppercase italic font-medium mb-4'>product description</p>
                    <ul className='text-gray-500 italic text-sm'>
                    {
                    longDes.map((value,index)=>(
                        (index === 0) ? <p key={index} className='uppercase'>{value}</p> :
                        <li  key={index}> - {value}</li>
                        ))
                    }
                    </ul>
                </div>
            </div>

            {/* Related product - same category */}
            <section className='lg:mb-12'>
                <h3 className='italic uppercase font-medium tracking-wider mb-4'>related products</h3>
                <div className='grid lg:grid-cols-4 gap-x-3 gap-y-4'>
                {
                    listProduct.map((value, index)=>(
                        (JSON.stringify(value._id) !== JSON.stringify(product._id)) ? 
                        <Card _id={value._id} name={value.name} avt={value.img1} price={value.price} key={index} handleClick={()=>{}} /> : null
                    ))
                }
                </div>
            </section>
            
        </main>
    );
};