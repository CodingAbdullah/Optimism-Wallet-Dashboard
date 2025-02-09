import FooterLinkObject from "../types/FooterLinkObject";
import { Links } from "./Links";

// Footer Links Constant
export const FooterLinks: FooterLinkObject = {
    ecosystem: Links.filter((_, index) => index <= 3),
    social: Links.filter((_, index) => index > 3 && index <= 5)
}