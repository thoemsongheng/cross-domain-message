"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLIFrameElement>(null);
  const onCLickHandler = () => {
    if (ref.current) {
      window.alert("Are you sure want to launch new ui url?");
      ref.current.contentWindow?.postMessage("hello localhost:3003", "*");
      return redirect("http://localhost:3003");
    }
  };

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl">Sender Domain</h1>
      <button
        onClick={onCLickHandler}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto cursor-pointer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Launch now
      </button>

      <MessageIframe ref={ref} />
    </main>
  );
}
const MessageIframe = forwardRef<HTMLIFrameElement>(function TransferIframe(
  {},
  ref
) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useImperativeHandle(ref, () => iframeRef.current as HTMLIFrameElement);

  useEffect(() => {
    const appOrigin = new URL(document.documentURI).origin;
    const childOrigin = "http://localhost:3003";
    const iframeSrc = childOrigin + "?parentOrigin=" + appOrigin;

    if (!iframeRef.current) return;
    iframeRef.current.src = iframeSrc;

    const sendMessage = (event: MessageEvent) => {
      const message = event.data;
      if (event.origin !== appOrigin) return;
    };

    window.addEventListener("message", (event) => {
      sendMessage(event);
    });

    return () =>
      window.removeEventListener("message", (event) => sendMessage(event));
  }, []);

  return (
    <iframe
      ref={iframeRef}
      style={{
        display: "none",
      }}
    />
  );
});
