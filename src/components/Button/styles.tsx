import styled from 'styled-components'
import {shade} from 'polished'

export const Container = styled.button`

border-radius: 11px;
background: #3ee8dc;
            height: 56px;
            border: 2px solid #3ee8dc ;
            padding: 0 16px;
            color: #131313;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.1, '#3ee8dc')};
                color: #fff;
            }
`;