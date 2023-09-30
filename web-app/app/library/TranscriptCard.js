import { AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";
import trump from "../presidential-candidates/candidate-imgs/trump.png";

function TranscriptCard({ name, speaker, date, url, img}) {
  return (
    <a target="_blank" href={url}>
      <div className="w-full rounded-xl transition duration-500 bg-gray-100 hover:bg-gray-200 hover:scale-[1.03]">
        <div>
          <div className="flex flex-col w-full">
            <div className="w-full px-6 py-6">
              <div className="relative h-54 w-full">
                <Image
                  src={img}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="flex flex-row">
                <div className="w-3/4">
                  <p style={{ whiteSpace: "pre-line" }} className="mt-4 text-gray-900 text-lg font-bold">{name}</p>
                </div>
                <div className="w-1/4 flex justify-end mt-4 text-2xl">
                  <AiFillRightCircle className="text-gray-900" />
                </div>
              </div>
              <div className="w-1/5">
                <div className="border-b border-2 border-indigo-600 mt-1"></div>{" "}
              </div>

              <p className="mt-4 text-gray-900 text-sm font-regular">
                <span className="text-indigo-600 font-semibold">{speaker}</span>{" "}
                &#x2022;{" "}
                <span className="text-gray-900 font-semibold">{date}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default TranscriptCard;
