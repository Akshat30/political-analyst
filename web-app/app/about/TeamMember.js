import Image from "next/image";
import { AiFillLinkedin } from "react-icons/ai";

function CandidateCard({ img, name, role, occupation, schoolInfo, portfolio, linkedin}) {
  return (
    <a href={portfolio} target="_blank">
      <div className="flex flex-col rounded-[20px] hover:bg-gray-300 transition duration-300 px-4 py-4">
        <div className="relative h-[24rem] w-full">
          <Image src={img} className="object-cover w-full h-full rounded-[10px]" />
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <h1 className="text-gray-900 mt-4 text-lg font-bold">{name}</h1>
          </div>
          <div className="w-1/2 flex justify-end mt-2 text-4xl">
            {linkedin ?
              <a href={linkedin} className="text-[#0077B5] hover:text-[#0056A3]">
                <AiFillLinkedin />
              </a> : <></>}
          </div>
        </div>

        <h1 className="text-indigo-400 mt-2 text-lg font-bold">{role}</h1>
        <p className="text-gray-900 mt-2 text-lg font-regular">{occupation}</p>
        <p className="text-gray-900 text-md font-regular">{schoolInfo}</p>
      </div>
    </a>
  );
}

export default CandidateCard;
