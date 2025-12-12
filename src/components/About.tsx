import { FunctionComponent } from "react";
import NavBar from "./NavBar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-5 text-center">
        <h1 className="mb-3">About BCard</h1>
        <p className="lead">
          BCard is a simple business card manager built for practicing React,
          TypeScript, and API interactions. Browse cards, favorite the ones you
          like, and manage your own if you&apos;re a business user.
        </p>
        <p className="mb-4">
          Created by Guy Even-chen (
          <a
            href="https://github.com/Evenchen21"
            target="_blank"
            rel="noreferrer"
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
