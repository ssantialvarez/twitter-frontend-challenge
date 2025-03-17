import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { IconType } from '../src/components/icon/Icon';
import Reaction from '../src/components/tweet/reaction/Reaction';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from '../src/util/LightTheme';

describe('Reaction', ()=>{
    const mockedReactionHandler = jest.fn();
    test('renders reaction correctly', ()=>{
        render(
            <ThemeProvider theme={LightTheme}>
                <Reaction img={IconType.LIKE} count={0} reacted={false} reactionFunction={()=>mockedReactionHandler()} increment={1}/>
            </ThemeProvider>
            
        )
        const reaction = screen.getByText('0');
        expect(reaction).toBeInTheDocument();
    })
    
    test('reaction triggers reaction handler', ()=>{
        render(
            <ThemeProvider theme={LightTheme}>
                <Reaction img={IconType.LIKE} count={0} reacted={false} reactionFunction={()=>mockedReactionHandler()} increment={1}/>
            </ThemeProvider>
        )
        const reaction = screen.getByTestId('like-icon');

        fireEvent.click(reaction);

        expect(mockedReactionHandler).toBeCalled();
    })
})