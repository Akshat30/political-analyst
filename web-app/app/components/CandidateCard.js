import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";

function CandidateCard({ name, desc, party, img, last}) {
  return (
    <Link href={"/candidates/" + last}>
      <div className="flex flex-col w-full">
        <div classname="w-full">
          <div className="relative h-36 w-full">
            <Image
              alt={name}
              src={img}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>
          <div className="bg-white rounded-b-xl">
            <p className="pt-2 ml-4 text-gray-900 text-xl font-bold">{name}</p>
            <p className="ml-4 text-gray-900 text-sm font-regular">{desc}</p>
            <div className="mt-4 ml-4">
              {party === "Republican" ? (
                <div className="mb-4 inline-block bg-[#FFC2C2] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Republican</p>
                </div>
              ) : party === "Democrat" ? (
                <div className="mb-4 inline-block bg-[#C2CCFF] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Democrat</p>
                </div>
              ) : (
                <div className="mb-4 inline-block bg-[#A19E9E] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Third Party</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
