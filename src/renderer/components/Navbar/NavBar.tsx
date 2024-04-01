import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@components/Common/navigation-menu'

const items = [
  { title: 'Dashboard', route: '' },
  { title: 'Add a Loan', route: '' },
  // { title: 'Artists', route: '' },
  // { title: 'Albums', route: '' },
  // { title: 'Songs', route: '' },
  // { title: 'Folders', route: '' },
  { title: 'Settings', route: '' }
]

const NavBar = (): JSX.Element => {
  return (
    <NavigationMenu className="border-b max-w-full justify-start">
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.title} className="cursor-pointer">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavBar
