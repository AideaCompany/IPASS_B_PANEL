import React from 'react'
//antd
import { Button } from 'antd'
//types
import { ButtonsCrudProps } from '../types/types'

const ButtonsCrud = (props: ButtonsCrudProps) => {
  return (
    <div className="buttonsCrud">
      <Button shape={'round'} onClick={props.functionCreate} className="buttonsCrud">
        {props.titleCreate}
      </Button>
    </div>
  )
}

export default React.memo(ButtonsCrud)
