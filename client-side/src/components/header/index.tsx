import { NextLink } from '@/components/next-link'

export function HeaderComponent() {
  // __STATE <React.Hooks>

  // __RENDER
  return (
    <header className='ui--header'>
      <div className='ui--header-container'>
        <div className='ui--header-context ltr'>
          <NextLink className='btn btn-logo' href='/'>
            <span className='text'>Alicization</span>
          </NextLink>

          <div className='ui--header-menu'>
            <NextLink className='btn btn-menu' href='/browse'>
              <span className='text'>browse</span>
            </NextLink>

            <NextLink className='btn btn-menu' href='/labs'>
              <span className='text'>labs</span>
            </NextLink>
          </div>
        </div>

        <div className='ui--header-context rtl'>
          <button className='btn btn-primary btn-signin'>
            <span className='text'>sign-in</span>
          </button>
        </div>
      </div>
    </header>
  )
}
