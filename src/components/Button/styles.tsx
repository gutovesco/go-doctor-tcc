import styled from 'styled-components'
import {shade} from 'polished'

const primaryColor = '#2BC4DA'
const secondaryColor = '#18CBC1'

export const Container = styled.button`

            background: #18CBC1;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #131313;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.1, '#18CBC1')}
            }
`;