import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import React from 'react'
const RenderCheck = ({ value }: { value: boolean | undefined }): JSX.Element => (
  <>
    {value ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CheckCircleFilled style={{ color: 'rgba(35, 203, 167, 1)' }} />
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CloseCircleFilled style={{ color: 'rgba(207, 0, 15,1)' }} />
      </div>
    )}
  </>
)

export default RenderCheck
