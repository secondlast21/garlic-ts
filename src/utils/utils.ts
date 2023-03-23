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

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
