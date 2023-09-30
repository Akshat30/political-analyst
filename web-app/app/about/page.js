"use client";
import React, { useState } from "react";
import aboutcover from "./about-cover.png";
import aj from "./aj.jpeg";
import megan from "./megan.png";
import derick from "./derick.jpg";
import marco from "./marco.jpg";
import juliana from "./juliana.jpg";
import Image from "next/image";
import defaultImg from "./default.jpeg";
import Link from "next/link";
import TeamMember from "./TeamMember";

function About() {
  return (
    <>
      <div className="w-full py-3 flex flex-col">
        <div className="flex flex-row ml-32 mr-32">
          <div className="w-1/2">
            <h1 className="mt-20 mr-4 leading-tight text-[#131313] text-[65px] font-bold">
              We Identify Bias so you don't have to.
            </h1>
          </div>
          <div className="w-1/2 flex justify-center">
            <Image className="rounded-[40px]" src={aboutcover} />
          </div>
        </div>
        <div className="mt-12 bg-gray-100">
          <div className="ml-12 px-20 mt-6">
            <h1 className="text-indigo-400 text-lg font-bold">Our Story</h1>
            <h1 className="mt-2 text-[#131313] text-4xl font-bold">
              Designers & Developers
            </h1>
            <div className="mt-4 text-[#131313] text-lg font-regular mb-12">
              <p className="mt-6">
                Verum.AI's journey is a tale of serendipity and shared ambition,
                focused on crafting innovative solutions to promote inclusivity
                in design and large language models. We've united a talented
                group of designers and developers from both UC Davis and UC San
                Diego, forging connections both professionally and personally.
                Our front-end design team is composed of Dereck Villagrana,
                Celeste Lu, and Juliana Viado, while our back-end development
                team comprises AJ, Marcos, and Megan.
              </p>
              <p className="mt-6">
                Our story commenced with our participation in the DevPost All
                Inclusive Hacks hackathon. The team came together through
                Juliana's invaluable connections, acting as a bridge between the
                two groups. Despite initial uncertainties about how our diverse
                backgrounds and experiences would align, it didn't take long for
                us to gel during our first and second meetings. The designers'
                acute focus on inclusivity, accessibility, and usability
                seamlessly complemented the developers' expertise in the logic,
                databases, and infrastructure that drive digital systems.{" "}
              </p>
              <p className="mt-6">
                This harmonious blend of skills and experiences laid the
                foundation for Candidate Match and Verum.AI. Fueled by our
                shared vision, we embarked on a mission to create an AI solution
                that not only harnesses advanced AI technology to detect bias,
                inconsistency, and misinformation within political documentation
                but also places user needs and preferences at the forefront.{" "}
              </p>
              <p className="mt-6">
                In conclusion, Verum.AI embodies the successful synergy between
                designers and developers from UC Davis and UC San Diego, bound
                by a shared commitment to inclusive design and large language
                models. We're appreciative of the support and connections that
                have brought us to this point and remain dedicated to further
                enhancing our AI solutions for the benefit of all.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 bg-gray-100">
          <div className="ml-12 px-20 mt-6">
            <h1 className="text-indigo-400 text-lg font-bold">Our Mission</h1>
            <h1 className="mt-2 text-[#131313] text-4xl font-bold">
              Unbiased Informed decision-making
            </h1>
            <div className="mt-4 text-[#131313] text-lg font-regular mb-12">
              <p className="mt-6">
                Empowering Informed Democracy with AI: Our mission is to provide
                voters with a steadfast tool that cuts through bias,
                inconsistency, and misinformation. By leveraging advanced AI
                technology, we guide users towards making confident and
                well-informed voting decisions for a more transparent and
                engaged democratic process.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 bg-gray-100">
          <div className="ml-12 px-20 mt-6">
            <h1 className="text-indigo-400 text-lg font-bold">
              How Verum works
            </h1>
            <h1 className="mt-2 text-[#131313] text-4xl font-bold">
              From Concept to Reality
            </h1>
            <div className="mt-4 text-[#131313] text-lg font-regular mb-12">
              <p className="mt-6">
                Short paragraph about the journey from the concept of the
                back-end journey, to the final product. here you can explain the
                different programs, languages, ai’s. etc. you used to make it.
                the difficulties/challenges.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 bg-gray-100">
          <div className="ml-12 px-20 mt-6">
            <h1 className="text-indigo-400 text-lg font-bold">Hello there!</h1>
            <h1 className="mt-2 text-[#131313] text-4xl font-bold">
              Meet the Team
            </h1>
            <div className="grid mt-12 grid-cols-3 gap-20 mb-12">
              <TeamMember
                img={derick}
                name={"Derick Villagrana"}
                role={"Product Designer -- UX Researcher"}
                occupation={"UX & Product Designer"}
                schoolInfo={"'23 Design Graduate @ UC Davis"}
                portfolio={"https://dereckvilladesign.webflow.io/"}
                linkedin={"https://www.linkedin.com/in/dereck-villagrana/"}
              />
              <TeamMember
                img={aj}
                name={"Akshat Jain"}
                role={"Backend + Frontend Developer"}
                occupation={"Software Engineer"}
                schoolInfo={"'25 CS Student @ UCSD"}
                portfolio={"https://akshatj.vercel.app"}
                linkedin={"https://www.linkedin.com/in/akshatja1n/"}
              />
              <TeamMember
                img={megan}
                name={"Megan Leong"}
                role={"Backend + Frontend Developer"}
                occupation={"Software Engineer"}
                schoolInfo={"'25 Math-CS Student @ UCSD"}
                portfolio={"https://www.linkedin.com/in/mnleong"}
                linkedin={"https://www.linkedin.com/in/mnleong"}
              />
              <TeamMember
                img={marco}
                name={"Marco Paredes"}
                role={"Backend + Frontend Developer"}
                occupation={"Software Engineer"}
                schoolInfo={"'23 Electrical Engineering Grad @ UCSD"}
                portfolio={"https://marcoparedes.vercel.app/"}
                linkedin={"https://www.linkedin.com/in/ma-parede/"}
              />
              <TeamMember
                img={juliana}
                name={"Juliana Viado"}
                role={"Product Designer -- UX Researcher"}
                occupation={"UX & Product Designer"}
                schoolInfo={"'23 Design Graduate @ UC Davis"}
                portfolio={"https://julianaviado.com/"}
                linkedin={"https://www.linkedin.com/in/juliana-viado"}
              />
              <TeamMember
                img={defaultImg}
                name={"Celeste Lu"}
                role={"Product Designer -- UX Researcher"}
                occupation={"UX & Product Designer"}
                schoolInfo={"'24 Design Student @ UC Davis"}
                portfolio={"/about"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
