import { GetClassGrades } from '@/app/domain/usecases'
import React, { createContext, useContext } from 'react'

type ProviderProps = {
  getClassGrades: GetClassGrades
}

const ClassGradesContext = createContext({})

const ClassGradesProvider: React.FC<ProviderProps> = ({
  getClassGrades,
  children
}) => {
  return (
    <ClassGradesContext.Provider value={getClassGrades.get()}>
      {children}
    </ClassGradesContext.Provider>
  )
}

const useClassGrades = () => useContext(ClassGradesContext)

export { ClassGradesProvider, useClassGrades }
