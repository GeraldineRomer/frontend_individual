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

export const User = () => {
    return (
        <div className="User">
            <div className='Content'>
                {/* <Cube /> */}
                <MenuUser />
                {/* <TraslucentMenu/> */}
                <Section1/>
                <Section2 />
                {/* <Section3/> */}
                {/* <LateralMenu/> */}
                <Footer/>
            </div>
        </div>
        
    )
}

