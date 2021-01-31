import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { startClock } from '../redux/actions'
import Exam from '../components/ex/exemples'


const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <Exam />
      <Link href="/redux">
        <a>Click to see current Redux State</a>
      </Link>
    </>
  )
}

export default Index