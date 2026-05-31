import React from "react";

const LeftSideText = () => {
  return (
    <div className="flex flex-col gap-4 flex-2 ">
      {/*<TypographyH2 text="" />*/}

      <div
        className="w-full h-full flex flex-col gap-2 justify-center"
        dir="rtl"
      >
      </div>
    </div>
  );
};

export function TypographyH2({ text }: { text: string }) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
}
export function TypographyP({ text }: { text: string }) {
  return (
    <p className="leading-7 text-right w-full" dir="rtl">
      {text}
    </p>
  );
}

export default LeftSideText;
