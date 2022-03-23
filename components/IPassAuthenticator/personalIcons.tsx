import Icon from '@ant-design/icons'

const QRCodeSVG = () => (
  <svg id="Capa_1" height="1em" viewBox="0 0 512 512" width="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="m331 211h30v30h-30z" />
      <path d="m512 121h-272v270h272zm-211 60h90v90h-90zm60 150h-60v-30h60zm90 0h-60v-30h30v-60h30zm0-120h-30v-30h30z" />
      <path d="m45 512h210c24.814 0 45-20.186 45-45v-46h-90v-188.789l-75 75-51.211-51.211 21.211-21.211 30 30 60-60 15 15v-128.789h90v-46c0-24.814-20.186-45-45-45h-210c-24.814 0-45 20.186-45 45v422c0 24.814 20.186 45 45 45zm75-91h60v30h-60zm0-360h60v30h-60z" />
    </g>
  </svg>
)

export const QRCodeIcon = (props: any) => <Icon component={QRCodeSVG} {...props} />
