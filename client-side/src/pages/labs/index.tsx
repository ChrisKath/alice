import { Labs } from '@/components'

export default function LabsContainer() {
  // __STATE <React.Hooks>

  // __RENDER
  return (
    <div className='ui--labs-container container'>
      <div className='rows'>
        <i>.ui--labs-container</i>
      </div>

      <Labs.UtilComponent />

      <div className='rows'>
        <Labs.StreamComponent />
      </div>
    </div>
  )
}
