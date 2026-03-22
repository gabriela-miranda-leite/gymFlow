/// <reference path="./declarations.d.ts" />

import { createGlobalStyle } from 'styled-components';

import Inter_400Regular from '@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf';
import Inter_500Medium from '@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf';
import Inter_600SemiBold from '@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf';
import Inter_700Bold from '@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf';
import JetBrainsMono_400Regular from '@expo-google-fonts/jetbrains-mono/400Regular/JetBrainsMono_400Regular.ttf';
import JetBrainsMono_500Medium from '@expo-google-fonts/jetbrains-mono/500Medium/JetBrainsMono_500Medium.ttf';
import JetBrainsMono_600SemiBold from '@expo-google-fonts/jetbrains-mono/600SemiBold/JetBrainsMono_600SemiBold.ttf';
import JetBrainsMono_700Bold from '@expo-google-fonts/jetbrains-mono/700Bold/JetBrainsMono_700Bold.ttf';

export const FontFaces = createGlobalStyle`
  @font-face {
    font-family: 'Inter_400Regular';
    src: url(${Inter_400Regular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inter_500Medium';
    src: url(${Inter_500Medium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inter_600SemiBold';
    src: url(${Inter_600SemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Inter_700Bold';
    src: url(${Inter_700Bold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'JetBrainsMono_400Regular';
    src: url(${JetBrainsMono_400Regular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'JetBrainsMono_500Medium';
    src: url(${JetBrainsMono_500Medium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'JetBrainsMono_600SemiBold';
    src: url(${JetBrainsMono_600SemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'JetBrainsMono_700Bold';
    src: url(${JetBrainsMono_700Bold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
`;
