// declarations.d.ts
declare module '*.svg' {
    import { ComponentType, SvgProps } from 'react-native-svg'
    const content: ComponentType<SvgProps>
    export default content
  }
  