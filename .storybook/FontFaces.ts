import { createGlobalStyle } from 'styled-components';

import BarlowCondensed_700Bold from '@expo-google-fonts/barlow-condensed/700Bold/BarlowCondensed_700Bold.ttf';
import BarlowCondensed_800ExtraBold from '@expo-google-fonts/barlow-condensed/800ExtraBold/BarlowCondensed_800ExtraBold.ttf';
import BarlowCondensed_900Black from '@expo-google-fonts/barlow-condensed/900Black/BarlowCondensed_900Black.ttf';
import Barlow_400Regular from '@expo-google-fonts/barlow/400Regular/Barlow_400Regular.ttf';
import Barlow_500Medium from '@expo-google-fonts/barlow/500Medium/Barlow_500Medium.ttf';
import Barlow_600SemiBold from '@expo-google-fonts/barlow/600SemiBold/Barlow_600SemiBold.ttf';

export const FontFaces = createGlobalStyle`
  @font-face {
    font-family: 'BarlowCondensed_900Black';
    src: url(${BarlowCondensed_900Black}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'BarlowCondensed_800ExtraBold';
    src: url(${BarlowCondensed_800ExtraBold}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'BarlowCondensed_700Bold';
    src: url(${BarlowCondensed_700Bold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Barlow_400Regular';
    src: url(${Barlow_400Regular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Barlow_500Medium';
    src: url(${Barlow_500Medium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Barlow_600SemiBold';
    src: url(${Barlow_600SemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
`;
