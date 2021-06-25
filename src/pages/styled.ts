import styled from 'styled-components';
import { rgba } from 'polished';

import { dimensions } from '../styles/dimensions';
import { ScrollBarCss } from '../components/ScrollBar';

const widthContainer = 680;
export const Container = styled.main`
    background: ${({theme}) => theme.fifth};
    > div {
        display: flex;
        flex-direction: column;
        max-width:  ${widthContainer}px;
        width: 100%;
        margin: 0 auto;
        svg {
            color: ${({theme}) => theme.gray2};
        }
    }
    header {
        display: flex;
        width: 100%;
        height: ${dimensions.HeaderHeight}px;
        padding: 10px 16px;
        background: ${({theme}) => theme.secondary};
        border-bottom: 1px solid ${({theme}) => rgba(theme.black, 0.08)};
        & .MuiSwitch-root {
            margin-left: auto;
        }
    }
    .user-info, .icon-theme {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .icon-theme {
        margin-left: 0;
        transform: translateY(-2px);
    }
    .user-name {
        font-size: 1rem; //16px
        color: ${({theme}) => theme.black};
        line-height: 16px;
        margin-bottom: 2px;
    }
    .user-status {
        font-size: 0.8125rem; //13px
        color: ${({theme}) => rgba(theme.black, 0.6)};
    }
    main {
        ${ScrollBarCss};
        display: flex;
        flex-direction: column;
        height: calc(100vh -  ${dimensions.HeaderHeight}px);
        width:  calc(100vw - ${dimensions.SideNavWidth}px);
        background-image: ${({theme}) => `url("/images/bg-${theme.primary.replace('#', '')}.jpg")`};
        background-repeat: repeat;
        width: 100%;
        overflow: auto;
        position: relative;
    }
    .bg{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    input {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 0.9375rem; //15px
        background: transparent;
        color: ${({theme}) => theme.gray1};
        outline: none;
        &::placeholder {
            color: ${({theme}) => theme.gray2};
        }
    }
    .msgs {
        ${ScrollBarCss};
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        background: transparent;
        height: calc(100vh - ${dimensions.HeaderHeight + dimensions.FooterHeight}px);
        width: 100%;
    }
    .msg-row {
        display: flex;
        padding-right: 9%;
        padding-left: 9%;
        margin-bottom: 12px;
        /* align-items: flex-end; */
    }
    .first-msg {
        margin-top: 12px;
    }
    .my-msg-row {
        justify-content: flex-end;
    }
    .msg-wrapper {
        position: relative;
        border-radius: 7.5px;
        min-width: 80px;
        max-width: ${widthContainer * 0.65}px;
        padding: 6px 7px 8px 9px;
        background: ${({theme}) => theme.bgMessage};
        box-shadow: 0 1px .5px ${({theme}) => theme.shadowMessage};
    }
    .my-msg-wrapper {
        background: ${({theme}) => theme.yellow};
        z-index: 1;
    }
    .msg {
        font-size: 0.875rem; //14px
        line-height: 1.1875rem; //19px 
        color: ${({theme}) => theme.black2};
        width: 100%;
        background: transparent;
        margin-right: 30px;

    }

    .time-msg {
        position: absolute;
        display: flex;
        align-items: center;
        font-size: 0.6875rem; //11px
        color: ${({theme}) => rgba(theme.black, 0.45)};
        bottom: 4px;
        right: 7px;
        & svg {
            font-size: 20px;
            margin-left: 2px;
        }
    }
    footer {
        background: ${({theme}) => theme.third};
        height: 62px;
        z-index: 1;
    }
    form {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        svg {
            font-size: 24px;
        }
    }
    .input-wrapper {
        position: relative;
        width: 100%;
        height: 40px;
        background: ${({theme}) => theme.bgInput};//#33383b
        padding: 9px 12px 11px 12px;
        border-radius: 21px;

    }
    @media screen and (max-width: 900px) {
        .msg-wrapper {
            max-width: ${widthContainer * 0.95}px;
        }
    }
    @media screen and (min-width: 1025px) and (max-width: 1300px) {
        .msg-wrapper {
            max-width: ${widthContainer * 0.75}px;
        }
    }
`;
