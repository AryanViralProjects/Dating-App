'use client';

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function UploadThingProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          console.error("Error: ", error);
        }}
      />
      {children}
    </div>
  );
} 