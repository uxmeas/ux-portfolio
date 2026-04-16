import img01Hero1 from "figma:asset/538772496cba0838f2d3aee10160149ad887fe4a.png";
import img02Context1 from "figma:asset/c53592098263eca879497e54a5ccc69b8e1443d8.png";
import img03HowItWorks1 from "figma:asset/c98b0c9ff5fcb0a1d096c0a1897cf78c64d353bd.png";
import img04UiShowcase1 from "figma:asset/ebf3ae5dc3c58fd2186c47812f405fc1e3b8bde0.png";
import img05VisualDirection1 from "figma:asset/a4d75810a16cd1c71a2c0dcbc5aa4865a7b4bc51.png";
import img06Features1 from "figma:asset/a30dc1fea4a15d32049684d07ba514b6649da8bd.png";
import img07CtaFooter1 from "figma:asset/068a38baca1445f83d9c373c5e90180172fac104.png";

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0">
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="01-hero 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img01Hero1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="02-context 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img02Context1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="03-how-it-works 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img03HowItWorks1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="04-ui-showcase 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img04UiShowcase1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="05-visual-direction 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img05VisualDirection1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="06-features 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img06Features1} />
      </div>
      <div className="h-[768px] relative shrink-0 w-[1376px]" data-name="07-cta-footer 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img07CtaFooter1} />
      </div>
    </div>
  );
}

export default function MypickIo() {
  return (
    <div className="bg-white relative size-full" data-name="mypick.io">
      <Frame />
    </div>
  );
}