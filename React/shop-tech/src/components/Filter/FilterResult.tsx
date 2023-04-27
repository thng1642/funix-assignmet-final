import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { Pagination, PaginationItem, Stack  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RootState } from "../../app/store"
import { Product } from "../../model/product"
import Card from "../Card/Card"

const theme = createTheme({
    palette: {
        neutral: {
            main: '#01070f',
            contrastText: '#fff',
        },
    },
});

declare module '@mui/material/styles' {
    
    interface Palette {
        neutral: Palette['primary'];
    }
    
    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Pagination' {
    interface PaginationPropsColorOverrides {
        neutral: true;
    }
}
declare module '@mui/material/PaginationItem' {
    interface PaginationItemPropsColorOverrides {
        neutral: true;
    }
}
export default function FilterResult() {

    const [trending, setTrending] = useState<Product[]>([] as Product[])

    const navigate = useNavigate()

    const selector = useAppSelector((state:RootState)=>state)

    useEffect(()=>{

        if (selector.filter.length !== 0) {
            setTrending(selector.filter)
        }
    }, [selector.filter])

    const forwardDetailsPage = function(id:string | null) {
        console.log("Forward detail", id);  
        navigate("/detail/"+id) 
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-x-3 mb-6'>
            {
                trending.map((item, key)=>(
                    <Card key={key} handleClick={forwardDetailsPage} _id={item._id} name={item.name}
                    avt={item.img1} price={item.price} />
                ))
            }
            </div>
            <div className='relative flex justify-end'>
                <div>
                <ThemeProvider theme={theme}>
                    <Stack spacing={2} >
                        <Pagination
                            count={2}
                            color='neutral'
                            shape='rounded'
                            renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: KeyboardDoubleArrowLeftIcon, next: KeyboardDoubleArrowRightIcon }}
                                {...item}
                            />
                            )}
                        />
                    </Stack>
                </ThemeProvider>
                    <span className='text-slate-500'>Showing 2 of 10 results</span>

                </div>
            </div>
        </div>
        
    );
};