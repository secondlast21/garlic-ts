export function setTitle(input: Number) {
  if (input <= 4 && input > 3.5) {
    return "S1";
  } else if (input <= 3.5 && input > 2.5) {
    return "S2";
  } else if (input <= 2.5 && input > 1.5) {
    return "S3";
  } else if (input <= 1.5 && input >= 1) {
    return "N";
  } else return "BL";
}

export function setBg(input: Number) {
  if (input <= 4 && input > 3.5) {
    return "bg-s1 p-1 rounded-md text-white";
  } else if (input <= 3.5 && input > 2.5) {
    return "bg-s2 p-1 rounded-md text-white";
  } else if (input <= 2.5 && input > 1.5) {
    return "bg-s3 p-1 rounded-md text-white";
  } else if (input <= 1.5 && input >= 1) {
    return "bg-n p-1 rounded-md text-white";
  } else return "bg-[#6f6f6f] p-1 rounded-md text-white";
}

export function setResultTitle(input: Number) {
  if (input <= 4 && input > 3.5) {
    return "text-2xl text-center font-black my-7 p-5 bg-s1 text-white rounded-xl";
  } else if (input <= 3.5 && input > 2.5) {
    return "text-2xl text-center font-black my-7 p-5 bg-s2 text-white rounded-xl";
  } else if (input <= 2.5 && input > 1.5) {
    return "text-2xl text-center font-black my-7 p-5 bg-s3 text-white rounded-xl";
  } else if (input <= 1.5 && input >= 1) {
    return "text-2xl text-center font-black my-7 p-5 bg-sn text-white rounded-xl";
  } else
    return "text-2xl text-center font-black my-7 p-5 bg-[#6f6f6f] text-white rounded-xl";
}

export function setResultFactor(input: Number) {
  if (input <= 4 && input > 3.5) {
    return "card w-96 bg-s1 shadow-xl mx-1 text-white";
  } else if (input <= 3.5 && input > 2.5) {
    return "card w-96 bg-s2 shadow-xl mx-1 text-white";
  } else if (input <= 2.5 && input > 1.5) {
    return "card w-96 bg-s3 shadow-xl mx-1 text-white";
  } else if (input <= 1.5 && input >= 1) {
    return "card w-96 bg-n shadow-xl mx-1 text-white";
  } else return "card w-96 bg-[#6f6f6f] shadow-xl mx-1 text-white";
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
