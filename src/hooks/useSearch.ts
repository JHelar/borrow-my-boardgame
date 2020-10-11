import { useContext } from 'react'
import { SearchContext } from '../contexts'

const useSearch = () => useContext(SearchContext)

export default useSearch
