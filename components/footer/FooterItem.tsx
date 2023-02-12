import React from "react";

type Props = {
  text: string;
  link: boolean;
  icon?: string;
  bold?: boolean;
  linkUrl?: string;
};

function FooterItem({ text, link, icon, bold, linkUrl }: Props) {
  return (
    <div>
      <div className="flex">
        {bold ? (
          <div className="font-bold ml-2  flex hover:scale-105 duration-100">
            {link ? (
              <div className="ml-2">
                <a href={linkUrl}> {text}</a>
              </div>
            ) : (
              <div className="ml-2">
                <p> {text}</p>
              </div>
            )}
            <div>
              <p>{icon}</p>
            </div>
          </div>
        ) : (
          <div>
            <p>{text}</p>
            <div>
              <p>{icon}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FooterItem;
