"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";

export default function CustomFooter() {
  const date = new Date();
  return (
    <div className="bg-[#030712]">
      <Footer
        container
        className="max-w-[1500px] mx-auto bg-[#030712] dark:bg-[#030712] border-none shadow-none">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Logo className="text-white"></Logo>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="pages" />
                <FooterLinkGroup col>
                  <NavLink className="max-w-12" to="/">
                    Home
                  </NavLink>
                  <NavLink className="max-w-12" to="/apartment">
                    Apartments
                  </NavLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink
                    target="_blank"
                    href="https://github.com/SayedSheikh">
                    Github
                  </FooterLink>
                  <FooterLink
                    target="_blank"
                    href="https://discord.com/users/sayed_9">
                    Discord
                  </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                  <NavLink to="terms-conditions">Terms & Conditions</NavLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="ArcLane™" year={date.getFullYear()} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon
                target="_blank"
                href="https://www.facebook.com/sayed.sheikh.413765"
                icon={BsFacebook}
              />
              <FooterIcon
                target="_blank"
                href="https://www.instagram.com/sayedsheikh9/"
                icon={BsInstagram}
              />
              <FooterIcon
                target="_blank"
                href="https://x.com/sayed_sheikh9"
                icon={BsTwitter}
              />
              <FooterIcon
                target="_blank"
                href="https://github.com/SayedSheikh"
                icon={BsGithub}
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}
