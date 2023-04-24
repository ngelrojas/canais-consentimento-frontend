
import { Fragment } from 'react';
import {GlobalStyles} from './global-styles';

export default function Layout({children}:any) {
    return (
        <Fragment>
            <GlobalStyles />
            {children}
        </Fragment>
    )
}