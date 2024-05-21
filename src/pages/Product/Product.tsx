import { useParams } from 'react-router-dom'

export default function Product() {
  const queryParams = useParams<{ id: string }>()
  return <div className='py-32'>{queryParams.id}</div>
}
