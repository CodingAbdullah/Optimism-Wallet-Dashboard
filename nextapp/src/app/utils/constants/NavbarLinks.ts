import NavbarLinkObject from "@/app/utils/types/NavbarObject";

// Constants for working with Navbar Links
export const NavbarLinks: NavbarLinkObject[] = [
    {
        name: 'Optimism Gas Info',
        dropdown: [{
            name: 'Gas Information', href: '/optimism-gas-tracker'
        }]
    },
    {
        name: 'Optimism Price',
        dropdown: [
            { name: 'Price Action', href: '/optimism-price' }
        ]
    },
    {
        name: 'Token Holdings',
        dropdown: [
            { name: 'ERC20 Holdings', href: '/erc20-holdings' },
            { name: 'ERC721 Holdings', href: '/erc721-holdings' }
        ]
    },
    {
        name: 'Wallet Analytics',
        dropdown: [
            { name: 'Wallet Information', href: '/wallet-analytics' }
        ]
    }
];