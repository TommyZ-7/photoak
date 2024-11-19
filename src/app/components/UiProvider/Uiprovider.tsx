'use client'

import { UIProvider  } from '@yamada-ui/react'
import { FC, ReactNode } from 'react'

type UiProviderProps = {
  children: ReactNode
}

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
    
  return (
    <>
        <UIProvider>
            {children}
        </UIProvider>
    </>
  )
    }