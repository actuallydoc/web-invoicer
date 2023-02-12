import React from "react";
import FooterItem from "./FooterItem";

type Props = {};

function Footer({}: Props) {
  return (
    <footer>
      <div className="footer p-3 space-y-3 text-white bg-slate-800 text-xs">
        <div className="">
          <div>
            <FooterItem
              text="Github repository"
              linkUrl="https://github.com/actuallydoc/web-invoicer"
              link={true}
              icon="👨‍💻"
              bold={true}
            />
          </div>
          <div>
            <FooterItem text="Facebook" link={false} icon="👨" bold={true} />
          </div>
          <div>
            <FooterItem
              text="Discord server"
              link={true}
              linkUrl="https://discord.gg/actuallydoc"
              icon="👨"
              bold={true}
            />
          </div>
          <div></div>

          <FooterItem text="Contact" link={true} icon="👨" bold={true} />
        </div>
        {/*You can add a spacer here and make another section of the footer */}
        <div className="text-center font-bold">
          <p>© 2023 ActuallyDoc 👮‍♀️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
