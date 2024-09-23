import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import pokemon from '../../assets/pokemon.png'
import { Box } from '@mui/material';
import './HeaderBar.style.css'

const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
}

export default function HeaderBar(props) {
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar>
                    <Box>
                        <img className='pokemon_nav' height={'80px'} src={pokemon} alt='pokemon' />
                    </Box>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}