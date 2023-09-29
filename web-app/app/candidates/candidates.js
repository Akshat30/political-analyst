import pence from "../presidential-candidates/candidate-imgs/pence.png";
import hutchinson from "../presidential-candidates/candidate-imgs/hutchinson.png";
import binkley from "../presidential-candidates/candidate-imgs/binkley.png";
import hurd from "../presidential-candidates/candidate-imgs/hurd.png";
import kennedyJr from "../presidential-candidates/candidate-imgs/kennedy-jr.png";
import tScott from "../presidential-candidates/candidate-imgs/t_scott.png";
import christie from "../presidential-candidates/candidate-imgs/christie.png";
import burgum from "../presidential-candidates/candidate-imgs/burgum.png";
import trump from "../presidential-candidates/candidate-imgs/trump.png";
import ramaswamy from "../presidential-candidates/candidate-imgs/ramaswamy.png";
import haley from "../presidential-candidates/candidate-imgs/haley.png";
import west from "../presidential-candidates/candidate-imgs/west.png";
import elder from "../presidential-candidates/candidate-imgs/elder.png";
import desantis from "../presidential-candidates/candidate-imgs/desantis.png";
import biden from "../presidential-candidates/candidate-imgs/biden.png";
import williamson from "../presidential-candidates/candidate-imgs/williamson.png";
import johnson from "../presidential-candidates/candidate-imgs/johnson.png";

export const candidates = {
  biden: {
    name: "Joseph R. Biden Jr.",
    desc: "Current President",
    img: biden,
    party: "Democrat",
  },
  williamson: {
    name: "Marianne Williamson",
    desc: "Self-help author",
    img: williamson,
    party: "Democrat",
  },
  kennedyjr: {
    name: "Robert F. Kennedy Jr.",
    desc: "American Environmental Lawyer",
    img: kennedyJr,
    party: "Democrat",
  },
  trump: {
    name: "Donald Trump",
    desc: "Former President & Businessman",
    img: trump,
    party: "Republican",
    subheading: "45th President of United States",
    website: "website",
    birthday: "June 14, 1946",
    about: [
      "Donald Trump, born in 1946 in Queens, New York, is a businessman, TV personality, and politician. He inherited his family's real estate empire and expanded it globally, known for luxury properties and golf courses.",

      "Trump entered politics as a Republican candidate in 2015. His unconventional and controversial campaign won him the 2016 presidential election. As the 45th President, he focused on economic deregulation, tax cuts, and conservative immigration policies.",

      "Trump's presidency was marked by polarization, facing impeachment twice in 2019 and 2021 but acquitted both times. His term ended on January 20, 2021, with Joe Biden's inauguration.",

      "Post-presidency, Trump remains influential in the Republican Party and American politics, leaving a significant and controversial impact on the nation's political discourse and policies.",

      "Opinions on Donald Trump are deeply divided, making him a central figure in discussions about American politics and the future of the Republican Party.",
    ],
    transcripts: [
      {
        url: "t1url",
        name: "Transcript 1",
        date: "September 28, 2023",
        desc: "hi this is some sample text that i am writing that is supposed to be a short description of the speech that this link is referring to.",
      },
      {
        url: "t2url",
        name: "Transcript 2",
        date: "September 28, 2023",
        desc: "hi this is some sample text that i am writing that is supposed to be a short description of the speech that this link is referring to.",
      },
      {
        url: "t3url",
        name: "Transcript 3",
        date: "September 28, 2023",
        desc: "hi this is some sample text that i am writing that is supposed to be a short description of the speech that this link is referring to.",
      },
      {
        url: "t4url",
        name: "Transcript 4",
        date: "September 28, 2023",
        desc: "hi this is some sample text that i am writing that is supposed to be a short description of the speech that this link is referring to.",
      },
    ],
  },
  haley: {
    name: "Nikki Haley",
    desc: "Former President & U.N. Ambassador",
    img: haley,
    party: "Republican",
  },
  ramaswamy: {
    name: "Vivek Ramaswamy",
    desc: "Entrepreneur & Author",
    img: ramaswamy,
    party: "Republican",
  },
  johnson: {
    name: "Perry Johnson",
    desc: "Businessman",
    img: johnson,
    party: "Republican",
  },
  hutchinson: {
    name: "Asa Hutchinson",
    desc: "Former Governor of Arkansas",
    img: hutchinson,
    party: "Republican",
  },
  elder: {
    name: "Larry Elder",
    desc: "Conservative Talk Radio Host",
    img: elder,
    party: "Republican",
  },
  binkley: {
    name: "Ryan Binkley",
    desc: "Businessman & Pastor",
    img: binkley,
    party: "Republican",
  },
  tscott: {
    name: "Tim Scott",
    desc: "Senator from South Carolina",
    img: tScott,
    party: "Republican",
  },
  desantis: {
    name: "Ron DeSantis",
    desc: "Governor of Florida",
    img: desantis,
    party: "Republican",
  },
  pence: {
    name: "Mike Pence",
    desc: "Former Vice President",
    img: pence,
    party: "Republican",
  },
  christie: {
    name: "Chris Christie",
    desc: "Former Governor of New Jersey",
    img: christie,
    party: "Republican",
  },
  burgum: {
    name: "Doug Burgum",
    desc: "Governor of North Dakota",
    img: burgum,
    party: "Republican",
  },
  hurd: {
    name: "Will Hurd",
    desc: "Former Congressman from Texas",
    img: hurd,
    party: "Republican",
  },
  west: {
    name: "Cornel West",
    desc: "Professor and Progressive Activist",
    img: west,
    party: "Third Party",
  },
};
