'use client'

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react'

const initialGrants: GrantsContextType = {
  grants: []
}

export const GrantsContext = createContext<GrantsContextType>(
  initialGrants
)

export const GrantsDispatchContext = createContext<
  Dispatch<GrantsActions>
>(() => {})

export const useGrantsContext = (): GrantsContextType => {
  if (!GrantsContext) {
    throw new Error(
      'useGrantsContext initialized without default value.'
    )
  }
  return useContext(GrantsContext)
}
export const useGrantsDispatchContext =
  (): Dispatch<GrantsActions> => {
    if (!GrantsDispatchContext) {
      throw new Error(
        'useGrantsDispatchContext initialized without default value.'
      )
    }
    return useContext(GrantsDispatchContext)
  }

function grantsReducer(
  grants: GrantsContextType,
  action: GrantsActions
): GrantsContextType {
  switch (action.type) {
    case 'set_grants': {
      return {
        ...grants,
        grants: action.grants
      }
    }
    default:
      return grants
  }
}

export const GrantsContextWrapper = ({
  children
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(
    grantsReducer,
    initialGrants
  )

  return (
    <GrantsContext.Provider value={state}>
      <GrantsDispatchContext.Provider value={dispatch}>
        {children}
      </GrantsDispatchContext.Provider>
    </GrantsContext.Provider>
  )
}
