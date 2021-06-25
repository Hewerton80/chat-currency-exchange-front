import styled from 'styled-components';

export const Container = styled.div`
    & > div {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;
