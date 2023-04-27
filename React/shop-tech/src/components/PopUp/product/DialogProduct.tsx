import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


import { Product } from '../../../model/product';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { trendingApi } from '../../../features/product/TredingApi';
import { popupActions } from '../../../redux/PopUp/PopupSlice';
import { formatPrice } from '../../Card/script';

export default function DialogProduct() {

    const theme = useTheme();

    const dispatch = useAppDispatch()
    
    const [open, setOpen] = useState(false);

    const popup = useAppSelector((state:RootState) => state.popup)

    const [item, setItem] = useState<Product>()

    // const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));


    useEffect(()=>{
        setOpen(popup.state)
        const getProduct = async ()=> {
            
            const [result, error]: any[] = await trendingApi()
            if (result) {

                for (let i = 0; i < result.length; i++) {

                    if (JSON.stringify(result[i]._id) === popup.id) {

                        console.log(result[i]);
                        setItem(result[i])
                        break
                    }
                }
            }
        }
        getProduct()
    }, [popup])

    useEffect(()=>{},[item])

    const handleClose = () => {
        dispatch(popupActions.closeUp())
    };

    return (
        <div>
            <Dialog
                // fullScreen={fullScreen}
                maxWidth='lg'
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
                
                <IconButton
                    className='mb-10'
                    onClick={()=>{
                        dispatch(popupActions.closeUp())
                    }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    <div className=' grid grid-cols-2 italic'>

                        <img className='object-contain' src={item?.img1} alt="anh san pham" />

                        <div>

                            <h3 className='font-semibold mb-3 text-2xl'>{item?.name}</h3>

                            {(item?.price !== undefined) ? <p className='text-gray-500'>{formatPrice(item.price)} VND</p> : null}
                            
                            <p className='text-gray-500 mb-6 leading-relaxed text-base'>{item?.short_desc}</p>
                            {/* View Detail Button */}
                            <div className='lg:w-[150px] lg:h-10 items-center justify-center flex flex-row text-white bg-black hover:cursor-pointer hover:bg-slate-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>
                                <span className=' ml-2'>View Detail</span>
                            </div>
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            
            </DialogActions>
        </Dialog>
    </div>

    );
};