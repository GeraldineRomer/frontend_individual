import React, { useState } from 'react';
import './User.scss';
import { Cube } from '../../components/Cube/Cube';
import { MenuCube } from '../../components/Menu/MenuCube';
import { Section1 } from '../../components/Sections/Section1/Section1';
import { Section2 } from '../../components/Sections/Section2/Section2';
import { Section3 } from '../../components/Sections/Section3/Section3';
import { LateralMenu } from '../../components/LateralMenu/LateralMenu';
import { TraslucentMenu } from '../../components/TraslucentMenu/TraslucentMenu';
import {Footer} from '../../components/Footer/Footer'
import { MenuUser } from '../../components/MenuUser/MenuUser';
import { Section4 } from '../../components/Sections/Section4/Section4';
import { Section5 } from '../../components/Sections/Section5/Section5';

export const User = () => {
    return (
        <div className="User">
            <div className='Content'>
                {/* <Cube /> */}
                <MenuUser />
                {/* <TraslucentMenu/> */}
                <Section5/>
                <Section1/>
                <Section2 />
                <Section3/>
                <Section4/>
                {/* <LateralMenu/> */}
                <Footer/>
            </div>
        </div>
        
    )
}

