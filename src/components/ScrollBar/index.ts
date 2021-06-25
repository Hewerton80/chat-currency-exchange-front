import { css } from 'styled-components';


export const ScrollBarCss = css`
    ::-webkit-scrollbar {
        height: 36px;
        width: 8px;
    }
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background: #cccccc; 
        -webkit-box-shadow: inset 0 0 100px #cccccc; 
    }
`;