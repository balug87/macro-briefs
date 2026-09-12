import { Frame } from "@/components/Frame";

export default function NotFound() {
  return (
    <Frame>
      <p className="kicker">Missing</p>
      <h1 className="headline">No brief at this address</h1>
      <p className="lede">That week is not on file. Use Latest or Archive.</p>
    </Frame>
  );
}
