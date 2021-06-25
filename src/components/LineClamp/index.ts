import { css } from 'styled-components';

export const LineClamp = (numberOfLines: number) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${numberOfLines || 1}; /* number of lines to show */
    -webkit-box-orient: vertical;
`;