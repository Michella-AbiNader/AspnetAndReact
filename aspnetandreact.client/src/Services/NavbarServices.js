import NavbarData from "../assets/Navbar.json"

function getNavbarData(location, setNavbarItems) {
    try {
        if (location.pathname.startsWith("/system-admin")) {//location is the url after the .com
            return setNavbarItems(NavbarData.system_admin_navbar)
        } else if (location.pathname.startsWith("/admin")) {
            return setNavbarItems(NavbarData.shop_admin_navbar)
        }
    } catch (error) {
        return console.log(error)
    }
}
export { getNavbarData }