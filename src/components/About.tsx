import { FunctionComponent } from "react";
import NavBar from "./NavBar";

interface AboutProps {}

//  About Component , talks about the app and its creator
const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-5 text-center">
        <h1 className="mb-3">About BCard</h1>
        <p className="lead p-5 m-1">
          BCard is a simple business card manager built for practicing React,
          TypeScript, and API interactions. Browse your cards, favorite the ones
          you like, and manage your own if you&apos;re a business ,Customer or
          just a user with a idea for a business.
        </p>
        <p className="mb-4">
          Created by Guy Even-chen (
          <a
            href="https://github.com/Evenchen21"
            target="_blank"
            rel="noreferrer noopener"
          >
            DarkPulse
          </a>
          )
        </p>
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQG4XZU08rl3WQ/profile-displayphoto-crop_800_800/B4DZqTSKH4JEAI-/0/1763407604130?e=1767225600&v=beta&t=pNxexifeJUaABysJAlkthBTCtTlQNFW7_6wPhGw9IfY"
          alt="Guy Even Chen"
          style={{
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
    </>
  );
};

export default About;
