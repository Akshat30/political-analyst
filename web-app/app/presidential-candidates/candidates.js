import pence from "./candidate-imgs/pence.png";
import hutchinson from "./candidate-imgs/hutchinson.png";
import binkley from "./candidate-imgs/binkley.png";
import hurd from "./candidate-imgs/hurd.png";
import kennedyJr from "./candidate-imgs/kennedy-jr.png";
import tScott from "./candidate-imgs/t_scott.png";
import christie from "./candidate-imgs/christie.png";
import burgum from "./candidate-imgs/burgum.png";
import trump from "./candidate-imgs/trump.png";
import ramaswamy from "./candidate-imgs/ramaswamy.png";
import haley from "./candidate-imgs/haley.png";
import west from "./candidate-imgs/west.png";
import elder from "./candidate-imgs/elder.png";
import desantis from "./candidate-imgs/desantis.png";
import biden from "./candidate-imgs/biden.png";
import williamson from "./candidate-imgs/williamson.png";
import johnson from "./candidate-imgs/johnson.png";


export const candidates = {
  democrats: [
    {
      name: "Joseph R. Biden Jr.",
      desc: "Current President",
      img: biden,
      party: "Democrat",
    },
    {
      name: "Marianne Williamson",
      desc: "Self-help author",
      img: williamson,
      party: "Democrat",
    },
    {
      name: "Robert F. Kennedy Jr.",
      desc: "Current President",
      img: kennedyJr,
      party: "Democrat",
    },
  ],
  republicans: [
    {
      name: "Donald Trump",
      desc: "Former President & Businessman",
      img: trump,
      party: "Republican",
    },
    {
      name: "Nikki Haley",
      desc: "Former President & U.N. Ambassador",
      img: haley,
      party: "Republican",
    },
    {
      name: "Vivek Ramaswamy",
      desc: "Entrepreneur & Author",
      img: ramaswamy,
      party: "Republican",
    },
    {
      name: "Perry Johnson",
      desc: "Businessman",
      img: johnson,
      party: "Republican",
    },
    {
      name: "Asa Hutchinson",
      desc: "Former Governor of Arkansas",
      img: hutchinson,
      party: "Republican",
    },
    {
      name: "Larry Elder",
      desc: "Conservative Talk Radio Host",
      img: elder,
      party: "Republican",
    },
    {
      name: "Ryan Binkley",
      desc: "Businessman & Pastor",
      img: binkley,
      party: "Republican",
    },
    {
      name: "Tim Scott",
      desc: "Senator from South Carolina",
      img: tScott,
      party: "Republican",
    },
    {
      name: "Ron DeSantis",
      desc: "Governor of Florida",
      img: desantis,
      party: "Republican",
    },
    {
      name: "Mike Pence",
      desc: "Former Vice President",
      img: pence,
      party: "Republican",
    },
    {
      name: "Chris Christie",
      desc: "Former Governor of New Jersey",
      img: christie,
      party: "Republican",
    },
    {
      name: "Doug Burgum",
      desc: "Governor of North Dakota",
      img: burgum,
      party: "Republican",
    },
    {
      name: "Will Hurd",
      desc: "Former Congressman from Texas",
      img: hurd,
      party: "Republican",
    },
  ],
  thirdparty: [
    {
      name: "Cornel West",
      desc: "Professor and Progressive Activist",
      img: west,
      party: "Third Party",
    },
  ],
};
